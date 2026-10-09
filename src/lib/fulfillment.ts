import { prisma } from '@/lib/db';
import { buyLabel, printLabel, type CartItem, type StripeAddress } from '@/lib/shipping';
import { sendShippedEmail } from '@/lib/email';

export type ShipResult = { ok: boolean; message: string };

function shortRef(orderId: string) {
  return orderId.slice(-6).toUpperCase();
}

async function sendShippedEmailOnce(orderId: string) {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order?.email || !order.trackingNumber || order.shippedEmailSentAt) return;
  const sent = await sendShippedEmail({
    to: order.email,
    name: order.shippingName,
    trackingNumber: order.trackingNumber,
    trackingUrl: order.trackingUrl,
    carrier: order.carrier,
  });
  if (sent) {
    await prisma.order.update({ where: { id: orderId }, data: { shippedEmailSentAt: new Date() } });
  }
}

// Buys the label, prints it, and emails the customer. The atomic claim on
// labelStatus means two clicks (or two tabs) can never buy postage twice.
export async function shipOrder(orderId: string): Promise<ShipResult> {
  const claimed = await prisma.order.updateMany({
    where: { id: orderId, status: 'paid', OR: [{ labelStatus: null }, { labelStatus: 'failed' }] },
    data: { labelStatus: 'purchasing', labelError: null },
  });
  if (claimed.count === 0) {
    return { ok: false, message: 'Not ready to ship (already shipped, in progress, or unpaid)' };
  }

  const order = await prisma.order.findUniqueOrThrow({ where: { id: orderId } });

  let label;
  try {
    if (!order.shippingName || !order.shippingJson) {
      throw new Error('Order has no shipping name/address on file');
    }
    label = await buyLabel({
      name: order.shippingName,
      email: order.email,
      address: JSON.parse(order.shippingJson) as StripeAddress,
      items: JSON.parse(order.cartJson) as CartItem[],
      orderRef: `REDTAIL order ${shortRef(order.id)}`,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Label purchase failed';
    await prisma.order.update({
      where: { id: orderId },
      data: { labelStatus: 'failed', labelError: message.slice(0, 500) },
    });
    return { ok: false, message };
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      labelStatus: 'print_failed',
      shippoTransactionId: label.transactionId,
      labelUrl: label.labelUrl,
      trackingNumber: label.trackingNumber,
      trackingUrl: label.trackingUrl,
      carrier: label.carrier,
      shippedAt: new Date(),
    },
  });

  let printError: string | null = null;
  try {
    await printLabel(label.labelUrl, `REDTAIL order ${shortRef(order.id)}`);
  } catch (err) {
    printError = err instanceof Error ? err.message : 'Print failed';
  }

  await prisma.order.update({
    where: { id: orderId },
    data: printError
      ? { labelStatus: 'print_failed', labelError: printError.slice(0, 500) }
      : { labelStatus: 'printed', labelError: null },
  });

  await sendShippedEmailOnce(orderId);

  return printError
    ? { ok: false, message: `Label bought, but printing failed: ${printError}` }
    : { ok: true, message: `Label printed — tracking ${label.trackingNumber}` };
}

// Reprints an already-purchased label. Never buys new postage.
export async function reprintOrder(orderId: string): Promise<ShipResult> {
  const order = await prisma.order.findUnique({ where: { id: orderId } });
  if (!order?.labelUrl) return { ok: false, message: 'No label has been bought for this order yet' };

  try {
    await printLabel(order.labelUrl, `REDTAIL order ${shortRef(order.id)} (reprint)`);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Print failed';
    await prisma.order.update({
      where: { id: orderId },
      data: { labelStatus: 'print_failed', labelError: message.slice(0, 500) },
    });
    return { ok: false, message };
  }

  await prisma.order.update({ where: { id: orderId }, data: { labelStatus: 'printed', labelError: null } });
  await sendShippedEmailOnce(orderId);
  return { ok: true, message: 'Reprinted' };
}

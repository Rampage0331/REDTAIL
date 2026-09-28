import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripeClient } from '@/lib/stripe';
import { prisma } from '@/lib/db';
import { getProductById } from '@/lib/products';
import { sendOrderConfirmationEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: 'Missing signature or webhook secret' }, { status: 400 });
  }

  const payload = await request.text();
  const stripe = getStripeClient();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch (err) {
    console.error('Stripe webhook signature verification failed', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed':
    case 'checkout.session.async_payment_succeeded': {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status !== 'unpaid') {
        await upsertOrder(session, 'paid');
      }
      break;
    }
    case 'checkout.session.async_payment_failed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await upsertOrder(session, 'failed');
      break;
    }
    default:
      break;
  }

  return NextResponse.json({ received: true });
}

async function upsertOrder(session: Stripe.Checkout.Session, status: 'paid' | 'failed') {
  const cartJson = typeof session.metadata?.cart === 'string' ? session.metadata.cart : '[]';
  const shippingJson = session.customer_details?.address
    ? JSON.stringify(session.customer_details.address)
    : null;

  const existing = await prisma.order.findUnique({ where: { stripeSessionId: session.id } });
  const wasAlreadyPaid = existing?.status === 'paid';

  await prisma.order.upsert({
    where: { stripeSessionId: session.id },
    create: {
      stripeSessionId: session.id,
      stripeCustomerId: typeof session.customer === 'string' ? session.customer : null,
      status,
      email: session.customer_details?.email ?? null,
      amountTotal: session.amount_total ?? 0,
      currency: session.currency ?? 'usd',
      cartJson,
      shippingJson,
      fulfilledAt: status === 'paid' ? new Date() : null,
    },
    update: {
      status,
      fulfilledAt: status === 'paid' ? new Date() : null,
    },
  });

  // Only send once, on the first transition into "paid" — webhook retries
  // or the async-payment-succeeded event firing after completed shouldn't
  // re-send the confirmation.
  if (status === 'paid' && !wasAlreadyPaid && session.customer_details?.email) {
    const cartItems: { id: string; color: string; size: string; quantity: number }[] =
      JSON.parse(cartJson);
    const items = cartItems.map((item) => ({
      name: getProductById(item.id)?.name ?? item.id,
      color: item.color,
      size: item.size,
      quantity: item.quantity,
    }));

    await sendOrderConfirmationEmail({
      to: session.customer_details.email,
      items,
      amountTotal: session.amount_total ?? 0,
      currency: session.currency ?? 'usd',
    });
  }
}

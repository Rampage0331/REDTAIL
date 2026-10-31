import { prisma } from '@/lib/db';
import { getStripeClient } from '@/lib/stripe';

export type CheckStatus = 'ok' | 'warn' | 'fail';
export type HealthCheck = { name: string; status: CheckStatus; detail: string };

const WEBHOOK_PATH = '/api/webhooks/stripe';
const REQUIRED_WEBHOOK_EVENTS = [
  'checkout.session.completed',
  'checkout.session.async_payment_succeeded',
  'checkout.session.async_payment_failed',
];

function errorText(err: unknown) {
  return err instanceof Error ? err.message.slice(0, 200) : String(err);
}

function missing(names: string[]) {
  return names.filter((n) => !process.env[n]);
}

async function checkStripe(): Promise<HealthCheck[]> {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return [{ name: 'Stripe', status: 'fail', detail: 'STRIPE_SECRET_KEY is not set' }];

  const live = key.startsWith('sk_live_') || key.startsWith('rk_live_');
  const results: HealthCheck[] = [
    {
      name: 'Stripe key',
      status: live ? 'ok' : 'warn',
      detail: live ? 'Live key — real payments' : 'Test key — no real money moves',
    },
  ];

  const stripe = getStripeClient();
  try {
    const endpoints = await stripe.webhookEndpoints.list({ limit: 100 });
    const ours = endpoints.data.find((e) => e.url.endsWith(WEBHOOK_PATH));
    if (!ours) {
      results.push({ name: 'Stripe webhook', status: 'fail', detail: `No webhook points at ${WEBHOOK_PATH}` });
    } else {
      const events = ours.enabled_events;
      const missingEvents = events.includes('*') ? [] : REQUIRED_WEBHOOK_EVENTS.filter((e) => !events.includes(e));
      if (ours.status !== 'enabled') {
        results.push({ name: 'Stripe webhook', status: 'fail', detail: `${ours.url} is ${ours.status}` });
      } else if (missingEvents.length) {
        results.push({ name: 'Stripe webhook', status: 'fail', detail: `Missing events: ${missingEvents.join(', ')}` });
      } else {
        results.push({ name: 'Stripe webhook', status: 'ok', detail: `${ours.url} — enabled` });
      }
    }
  } catch (err) {
    results.push({
      name: 'Stripe webhook',
      status: 'warn',
      detail: `Couldn't read webhooks (the key may not have permission): ${errorText(err)}`,
    });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    results.push({ name: 'Stripe webhook secret', status: 'fail', detail: 'STRIPE_WEBHOOK_SECRET is not set' });
  }

  return results;
}

async function checkDatabase(): Promise<HealthCheck> {
  try {
    const orders = await prisma.order.count();
    return { name: 'Database (Neon)', status: 'ok', detail: `Connected — ${orders} order${orders === 1 ? '' : 's'} saved` };
  } catch (err) {
    return { name: 'Database (Neon)', status: 'fail', detail: errorText(err) };
  }
}

async function checkResend(): Promise<HealthCheck> {
  if (!process.env.RESEND_API_KEY) {
    return { name: 'Email (Resend)', status: 'fail', detail: 'RESEND_API_KEY is not set — no order emails go out' };
  }
  const from = process.env.RESEND_FROM_EMAIL ?? 'orders@wearredtail.com';
  try {
    const res = await fetch('https://api.resend.com/domains', {
      headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
    });
    if (res.status === 401 || res.status === 403) {
      // Sending-only keys can't list domains; that's the safer key type.
      return { name: 'Email (Resend)', status: 'ok', detail: `Key set (send-only), sending from ${from}` };
    }
    const data = (await res.json()) as { data?: { name: string; status: string }[] };
    const domain = data.data?.find((d) => from.endsWith(`@${d.name}`));
    if (!domain) return { name: 'Email (Resend)', status: 'fail', detail: `No Resend domain matches ${from}` };
    return {
      name: 'Email (Resend)',
      status: domain.status === 'verified' ? 'ok' : 'fail',
      detail: `${domain.name} is ${domain.status}, sending from ${from}`,
    };
  } catch (err) {
    return { name: 'Email (Resend)', status: 'fail', detail: errorText(err) };
  }
}

async function checkShippo(): Promise<HealthCheck> {
  const token = process.env.SHIPPO_API_TOKEN;
  if (!token) return { name: 'Shipping labels (Shippo)', status: 'fail', detail: 'SHIPPO_API_TOKEN is not set' };

  const missingFrom = missing([
    'SHIP_FROM_NAME',
    'SHIP_FROM_STREET1',
    'SHIP_FROM_CITY',
    'SHIP_FROM_STATE',
    'SHIP_FROM_ZIP',
    'SHIP_FROM_PHONE',
  ]);
  if (missingFrom.length) {
    return { name: 'Shipping labels (Shippo)', status: 'fail', detail: `Missing: ${missingFrom.join(', ')}` };
  }

  try {
    const res = await fetch('https://api.goshippo.com/addresses/?results=1', {
      headers: { Authorization: `ShippoToken ${token}` },
    });
    if (!res.ok) return { name: 'Shipping labels (Shippo)', status: 'fail', detail: `Shippo rejected the token (${res.status})` };
    const test = token.startsWith('shippo_test_');
    return {
      name: 'Shipping labels (Shippo)',
      status: test ? 'warn' : 'ok',
      detail: test ? 'Connected with the TEST token — labels are samples, swap to live before shipping' : 'Connected — live labels',
    };
  } catch (err) {
    return { name: 'Shipping labels (Shippo)', status: 'fail', detail: errorText(err) };
  }
}

async function checkPrintNode(): Promise<HealthCheck> {
  const key = process.env.PRINTNODE_API_KEY;
  const printerId = process.env.PRINTNODE_PRINTER_ID;
  if (!key || !printerId) {
    return { name: 'Label printer (PrintNode)', status: 'fail', detail: 'PRINTNODE_API_KEY or PRINTNODE_PRINTER_ID is not set' };
  }
  try {
    const auth = Buffer.from(`${key}:`).toString('base64');
    const res = await fetch(`https://api.printnode.com/printers/${printerId}`, {
      headers: { Authorization: `Basic ${auth}` },
    });
    if (!res.ok) return { name: 'Label printer (PrintNode)', status: 'fail', detail: `PrintNode rejected the key (${res.status})` };
    const [printer] = (await res.json()) as { name: string; state: string; computer?: { name: string; state: string } }[];
    if (!printer) return { name: 'Label printer (PrintNode)', status: 'fail', detail: `Printer ${printerId} not found` };
    const computerUp = printer.computer?.state === 'connected';
    return {
      name: 'Label printer (PrintNode)',
      status: computerUp && printer.state === 'online' ? 'ok' : 'warn',
      detail: `${printer.name} is ${printer.state}; computer "${printer.computer?.name ?? '?'}" is ${printer.computer?.state ?? 'unknown'}${computerUp ? '' : ' — turn the PC on before printing'}`,
    };
  } catch (err) {
    return { name: 'Label printer (PrintNode)', status: 'fail', detail: errorText(err) };
  }
}

function checkSiteSettings(): HealthCheck[] {
  const locked = process.env.SITE_LOCKED === 'true';
  const pixels = ['META_PIXEL_ID', 'TIKTOK_PIXEL_ID', 'GA_MEASUREMENT_ID'].filter((n) => process.env[n]);
  return [
    {
      name: 'Site lock',
      status: locked ? 'warn' : 'ok',
      detail: locked ? 'Locked — only people with the password can see the store' : 'Public — anyone can shop',
    },
    {
      name: 'Site URL',
      status: process.env.NEXT_PUBLIC_SITE_URL ? 'ok' : 'fail',
      detail: process.env.NEXT_PUBLIC_SITE_URL ?? 'NEXT_PUBLIC_SITE_URL is not set',
    },
    {
      name: 'Ad pixels',
      status: pixels.length ? 'ok' : 'warn',
      detail: pixels.length ? `Active: ${pixels.join(', ')}` : 'None set yet — ads can\'t track sales',
    },
  ];
}

export async function runHealthChecks(): Promise<HealthCheck[]> {
  const [stripe, db, resend, shippo, printnode] = await Promise.all([
    checkStripe(),
    checkDatabase(),
    checkResend(),
    checkShippo(),
    checkPrintNode(),
  ]);
  return [...stripe, db, resend, shippo, printnode, ...checkSiteSettings()];
}

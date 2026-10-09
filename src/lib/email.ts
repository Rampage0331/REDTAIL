import { Resend } from 'resend';

let client: Resend | null = null;

function getResendClient(): Resend | null {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  if (!client) client = new Resend(apiKey);
  return client;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

type OrderConfirmationEmailInput = {
  to: string;
  items: { name: string; color: string; size: string; quantity: number }[];
  amountTotal: number;
  currency: string;
};

// No-ops until RESEND_API_KEY is set — safe to call before the account exists.
export async function sendOrderConfirmationEmail(input: OrderConfirmationEmailInput) {
  const resend = getResendClient();
  if (!resend) return;

  const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'orders@wearredtail.com';
  const total = (input.amountTotal / 100).toFixed(2);
  const itemsHtml = input.items
    .map((item) => `<li>${item.quantity}x ${item.name} — ${item.color} / ${item.size}</li>`)
    .join('');

  try {
    await resend.emails.send({
      from: `REDTAIL <${fromAddress}>`,
      to: input.to,
      subject: 'Welcome to the Warband — your order is confirmed',
      html: `
        <div style="background:#0a0a0a;color:#e7e5e4;font-family:sans-serif;padding:40px;">
          <p style="letter-spacing:0.3em;font-size:11px;color:#8b1212;text-transform:uppercase;">Order Confirmed</p>
          <h1 style="font-size:28px;letter-spacing:0.05em;margin:8px 0 24px;">WELCOME TO THE WARBAND</h1>
          <ul style="list-style:none;padding:0;color:#a8a29e;">${itemsHtml}</ul>
          <p style="margin-top:24px;color:#a8a29e;">Total: $${total} ${input.currency.toUpperCase()}</p>
          <p style="margin-top:24px;color:#78716c;font-size:13px;">We&apos;ll follow up when it ships. Discern. Commit. Pursue.</p>
        </div>
      `,
    });
  } catch (err) {
    // Never let an email failure block order fulfillment.
    console.error('Failed to send order confirmation email', err);
  }
}

type ShippedEmailInput = {
  to: string;
  name?: string | null;
  trackingNumber: string;
  trackingUrl?: string | null;
  carrier?: string | null;
};

// Returns whether the email actually went out, so the caller only records it
// as sent on success (and can retry on a later reprint/ship action).
export async function sendShippedEmail(input: ShippedEmailInput): Promise<boolean> {
  const resend = getResendClient();
  if (!resend) return false;

  const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'orders@wearredtail.com';
  const firstName = input.name ? escapeHtml(input.name.split(' ')[0]) : '';
  const tracking = escapeHtml(input.trackingNumber);
  const trackingLine = input.trackingUrl
    ? `<a href="${escapeHtml(input.trackingUrl)}" style="color:#e7e5e4;">${tracking}</a>`
    : tracking;

  try {
    const result = await resend.emails.send({
      from: `REDTAIL <${fromAddress}>`,
      to: input.to,
      replyTo: 'shop@wearredtail.com',
      subject: 'Your REDTAIL order is on its way',
      html: `
        <div style="background:#0a0a0a;color:#e7e5e4;font-family:sans-serif;padding:40px;">
          <p style="letter-spacing:0.3em;font-size:11px;color:#8b1212;text-transform:uppercase;">Shipped</p>
          <h1 style="font-size:28px;letter-spacing:0.05em;margin:8px 0 24px;">THE HUNT IS ON ITS WAY</h1>
          <p style="color:#a8a29e;">${firstName ? `${firstName}, your` : 'Your'} order has shipped${input.carrier ? ` via ${escapeHtml(input.carrier)}` : ''}.</p>
          <p style="margin-top:16px;color:#a8a29e;">Tracking number: ${trackingLine}</p>
          <p style="margin-top:24px;color:#78716c;font-size:13px;">Questions? Reply to this email or write to shop@wearredtail.com. Discern. Commit. Pursue.</p>
        </div>
      `,
    });
    if (result.error) {
      console.error('Failed to send shipped email', result.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error('Failed to send shipped email', err);
    return false;
  }
}

type ContactInquiryEmailInput = {
  name: string;
  email: string;
  message: string;
};

// Unlike order confirmations, a failure here should surface to the sender
// (the form is their only stated way to reach out) — so this throws instead
// of swallowing errors.
export async function sendContactInquiryEmail(input: ContactInquiryEmailInput) {
  const resend = getResendClient();
  if (!resend) {
    throw new Error('Email is not configured');
  }

  const fromAddress = process.env.RESEND_FROM_EMAIL ?? 'orders@wearredtail.com';

  await resend.emails.send({
    from: `REDTAIL Website <${fromAddress}>`,
    to: 'shop@wearredtail.com',
    replyTo: input.email,
    subject: `New contact inquiry from ${input.name}`,
    html: `
      <div style="font-family:sans-serif;">
        <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(input.message).replace(/\n/g, '<br/>')}</p>
      </div>
    `,
  });
}

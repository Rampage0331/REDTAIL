import { NextRequest, NextResponse } from 'next/server';
import { sendContactInquiryEmail } from '@/lib/email';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const email = typeof body?.email === 'string' ? body.email.trim() : '';
  const message = typeof body?.message === 'string' ? body.message.trim() : '';

  if (!name || !EMAIL_REGEX.test(email) || !message) {
    return NextResponse.json({ error: 'Please fill in all fields with a valid email.' }, { status: 400 });
  }
  if (name.length > 200 || email.length > 254 || message.length > 5000) {
    return NextResponse.json({ error: 'That input is too long.' }, { status: 400 });
  }

  try {
    await sendContactInquiryEmail({ name, email, message });
  } catch (err) {
    console.error('Failed to send contact inquiry email', err);
    return NextResponse.json(
      { error: 'Something went wrong. Email us directly at shop@wearredtail.com.' },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}

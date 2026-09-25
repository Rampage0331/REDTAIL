import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';

  if (!EMAIL_REGEX.test(email) || email.length > 254) {
    return NextResponse.json({ error: 'Enter a valid email address' }, { status: 400 });
  }

  await prisma.emailSignup.upsert({
    where: { email },
    create: { email },
    update: {},
  });

  return NextResponse.json({ success: true });
}

import { NextRequest, NextResponse } from 'next/server';
import { shipOrder } from '@/lib/fulfillment';

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const orderId = typeof body?.orderId === 'string' ? body.orderId : '';
  if (!orderId) {
    return NextResponse.json({ ok: false, message: 'Missing orderId' }, { status: 400 });
  }
  const result = await shipOrder(orderId);
  return NextResponse.json(result, { status: result.ok ? 200 : 422 });
}

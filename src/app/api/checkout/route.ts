import { NextRequest, NextResponse } from 'next/server';
import type Stripe from 'stripe';
import { getStripeClient } from '@/lib/stripe';
import { getProductById } from '@/lib/products';

type CheckoutItem = {
  id: string;
  color: string;
  size: string;
  quantity: number;
};

const LETTERS = 'abcdefghijklmnopqrstuvwxyz';

function randomLabelSuffix(length = 8) {
  let out = '';
  for (let i = 0; i < length; i++) {
    out += LETTERS[Math.floor(Math.random() * LETTERS.length)];
  }
  return out;
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const items = body?.items as CheckoutItem[] | undefined;

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? request.nextUrl.origin;
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [];

  for (const item of items) {
    const product = getProductById(item.id);
    if (!product) {
      return NextResponse.json({ error: `Unknown product: ${item.id}` }, { status: 400 });
    }
    if (!product.sizes.includes(item.size) || !product.colors.includes(item.color)) {
      return NextResponse.json({ error: `Invalid variant for ${product.name}` }, { status: 400 });
    }
    const quantity = Math.floor(Number(item.quantity));
    if (!Number.isFinite(quantity) || quantity < 1 || quantity > 20) {
      return NextResponse.json({ error: `Invalid quantity for ${product.name}` }, { status: 400 });
    }

    lineItems.push({
      quantity,
      price_data: {
        currency: 'usd',
        unit_amount: Math.round(product.price * 100),
        product_data: {
          name: `${product.name} — ${item.color} / ${item.size}`,
          images: product.image ? [new URL(product.image, siteUrl).toString()] : undefined,
          metadata: { productId: product.id, color: item.color, size: item.size },
        },
      },
    });
  }

  const stripe = getStripeClient();

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items: lineItems,
    shipping_address_collection: { allowed_countries: ['US', 'CA'] },
    success_url: `${siteUrl}/order/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${siteUrl}/cart`,
    integration_identifier: `redtail_checkout_${randomLabelSuffix()}`,
    metadata: {
      cart: JSON.stringify(items).slice(0, 490),
    },
  });

  if (!session.url) {
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 });
  }

  return NextResponse.json({ url: session.url });
}

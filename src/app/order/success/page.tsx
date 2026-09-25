'use client';
import { useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { ThemeSetter } from '@/components/ThemeSetter';

type PixelWindow = Window & {
  fbq?: (...args: unknown[]) => void;
  gtag?: (...args: unknown[]) => void;
  ttq?: { track: (...args: unknown[]) => void };
};

export default function OrderSuccessPage() {
  const { totalPrice, clearCart } = useCart();

  useEffect(() => {
    const w = window as PixelWindow;

    if (totalPrice > 0) {
      w.fbq?.('track', 'Purchase', { value: totalPrice, currency: 'USD' });
      w.gtag?.('event', 'purchase', { value: totalPrice, currency: 'USD' });
      w.ttq?.track('CompletePayment', { value: totalPrice, currency: 'USD' });
    }

    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt-32 pb-24 min-h-dvh">
      <ThemeSetter theme="default" />
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-xs tracking-[0.3em] mb-3" style={{ color: 'var(--color-accent)' }}>ORDER CONFIRMED</p>
        <h1 className="font-display text-5xl xl:text-6xl tracking-wide text-stone-100 mb-8">WELCOME TO THE WARBAND</h1>
        <p className="text-stone-500 tracking-wide mb-12">
          Your order is in. A confirmation has been sent to your email — we&apos;ll follow up when it ships.
        </p>
        <Link href="/shop" className="btn-accent px-10 py-4 text-stone-100 text-xs tracking-[0.25em]">
          CONTINUE SHOPPING
        </Link>
      </div>
    </div>
  );
}

'use client';
import { useState } from 'react';
import type { CartItem } from '@/context/CartContext';

// Sends the cart to /api/checkout and redirects to Stripe. Shared by the cart page and drawer.
export function useCheckout() {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const checkout = async (items: CartItem[]) => {
    setIsCheckingOut(true);
    setCheckoutError(null);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: items.map(({ id, color, size, quantity }) => ({ id, color, size, quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? 'Checkout failed');
      }
      window.location.href = data.url;
    } catch (err) {
      setCheckoutError(err instanceof Error ? err.message : 'Checkout failed');
      setIsCheckingOut(false);
    }
  };

  return { checkout, isCheckingOut, checkoutError };
}

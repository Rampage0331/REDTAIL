'use client';
import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useCheckout } from '@/lib/useCheckout';
import { releasePhrase } from '@/lib/release';
import { getProductById } from '@/lib/products';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, drawerOpen, closeDrawer } = useCart();
  const { checkout, isCheckingOut, checkoutError } = useCheckout();
  const closeRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close when navigating to another page.
  useEffect(() => { closeDrawer(); }, [pathname]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeDrawer(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [drawerOpen, closeDrawer]);

  return (
    <div className={`fixed inset-0 z-[60] ${drawerOpen ? '' : 'pointer-events-none'}`} aria-hidden={!drawerOpen}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/60 backdrop-blur-[2px] transition-opacity duration-300 ${drawerOpen ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeDrawer}
      />

      {/* Panel */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Your cart"
        className={`absolute top-0 right-0 h-full w-full max-w-md flex flex-col border-l border-stone-800/70 transition-transform duration-300 ease-out ${drawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-stone-800/70" style={{ paddingTop: 'max(1.25rem, env(safe-area-inset-top))' }}>
          <p className="font-display text-3xl tracking-wide text-stone-100">
            CART <span className="text-stone-600 text-xl">({totalItems})</span>
          </p>
          <button
            ref={closeRef}
            onClick={closeDrawer}
            className="text-xs tracking-[0.2em] text-stone-500 hover:text-stone-200 transition-colors"
            tabIndex={drawerOpen ? 0 : -1}
          >
            CLOSE
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center gap-8 px-6 text-center">
            <p className="text-stone-500 tracking-[0.2em] text-sm">YOUR CART IS EMPTY</p>
            <Link href="/shop" className="btn-accent px-10 py-4 text-stone-100 text-xs tracking-[0.25em]" tabIndex={drawerOpen ? 0 : -1}>
              SHOP GENESIS // 001
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto px-6 divide-y divide-stone-800/60">
              {items.map((item) => (
                <li key={`${item.id}-${item.color}-${item.size}`} className="flex gap-4 py-6">
                  <div className="relative w-24 h-24 flex-shrink-0" style={{ backgroundColor: 'var(--color-surface)' }}>
                    {item.image && <Image src={item.image} alt={item.name} fill sizes="96px" className="object-contain" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3">
                      <h3 className="font-display text-xl tracking-wide text-stone-100 leading-tight">{item.name.toUpperCase()}</h3>
                      <span className="text-stone-300">${item.price * item.quantity}</span>
                    </div>
                    <p className="text-[11px] tracking-widest text-stone-500 mt-1">{item.color.toUpperCase()} / {item.size}</p>
                    {getProductById(item.id) && (
                      <p className="text-[10px] tracking-[0.15em] text-stone-600 mt-1">{releasePhrase(getProductById(item.id)!)}</p>
                    )}
                    <div className="mb-4" />
                    <div className="flex items-center gap-5">
                      <div className="flex items-center border border-stone-700">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                          className="px-3 py-1.5 text-stone-400 hover:text-stone-100 transition-colors text-sm"
                          aria-label="Decrease quantity"
                          tabIndex={drawerOpen ? 0 : -1}
                        >−</button>
                        <span className="px-3 py-1.5 text-stone-300 text-sm border-x border-stone-700 tabular-nums">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                          className="px-3 py-1.5 text-stone-400 hover:text-stone-100 transition-colors text-sm"
                          aria-label="Increase quantity"
                          tabIndex={drawerOpen ? 0 : -1}
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.color, item.size)}
                        className="text-[11px] tracking-widest text-stone-600 hover:text-stone-400 transition-colors"
                        tabIndex={drawerOpen ? 0 : -1}
                      >REMOVE</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="px-6 pt-5 border-t border-stone-800/70 space-y-4" style={{ paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}>
              <div className="flex justify-between">
                <span className="text-xs tracking-[0.2em] text-stone-500">SUBTOTAL</span>
                <span className="text-stone-200 text-lg tabular-nums">${totalPrice}</span>
              </div>
              <p className="text-stone-600 text-[11px] tracking-[0.15em] leading-relaxed">
                MADE TO ORDER. FREE U.S. SHIPPING. TAX CALCULATED AT CHECKOUT.
              </p>
              <button
                onClick={() => checkout(items)}
                disabled={isCheckingOut}
                className="btn-accent w-full py-4 text-stone-100 text-xs tracking-[0.3em] disabled:opacity-50 disabled:cursor-not-allowed"
                tabIndex={drawerOpen ? 0 : -1}
              >
                {isCheckingOut ? 'REDIRECTING…' : 'CHECKOUT'}
              </button>
              {checkoutError && <p className="text-red-500 text-xs tracking-widest">{checkoutError}</p>}
              <Link
                href="/cart"
                className="block text-center text-stone-600 text-[11px] tracking-[0.2em] underline hover:text-stone-400 transition-colors"
                tabIndex={drawerOpen ? 0 : -1}
              >
                VIEW FULL CART
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

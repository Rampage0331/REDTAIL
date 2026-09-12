'use client';
import { useCart } from '@/context/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeSetter } from '@/components/ThemeSetter';

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCart();

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <ThemeSetter theme="default" />
      <div className="max-w-4xl xl:max-w-5xl mx-auto px-6">
        <p className="text-xs tracking-[0.3em] mb-3" style={{ color: 'var(--color-accent)' }}>YOUR</p>
        <h1 className="font-display text-6xl xl:text-7xl tracking-wide text-stone-100 mb-16">CART</h1>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <p className="text-stone-500 tracking-[0.2em] text-sm mb-10">YOUR CART IS EMPTY</p>
            <Link href="/shop" className="btn-accent px-10 py-4 text-stone-100 text-xs tracking-[0.25em]">
              SHOP NOW
            </Link>
          </div>
        ) : (
          <>
            <div className="space-y-8 mb-16">
              {items.map((item) => (
                <div key={`${item.id}-${item.color}-${item.size}`} className="flex gap-6 border-b border-stone-800/50 pb-8">
                  <div className="relative w-24 h-24 flex-shrink-0" style={{ backgroundColor: 'var(--color-surface)' }}>
                    {item.image && (
                      <Image src={item.image} alt={item.name} fill className="object-contain" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-2xl tracking-wide text-stone-100 mb-1">{item.name.toUpperCase()}</h3>
                    <p className="text-xs tracking-widest text-stone-500 mb-5">{item.color.toUpperCase()} / {item.size}</p>
                    <div className="flex items-center gap-6">
                      <div className="flex items-center border border-stone-700">
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity - 1)}
                          className="px-3 py-2 text-stone-400 hover:text-stone-100 transition-colors text-sm"
                        >−</button>
                        <span className="px-4 py-2 text-stone-300 text-sm border-x border-stone-700">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.color, item.size, item.quantity + 1)}
                          className="px-3 py-2 text-stone-400 hover:text-stone-100 transition-colors text-sm"
                        >+</button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id, item.color, item.size)}
                        className="text-xs tracking-widest text-stone-600 hover:text-stone-400 transition-colors"
                      >REMOVE</button>
                    </div>
                  </div>
                  <div className="text-stone-300 font-medium text-xl">${item.price * item.quantity}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-end gap-6">
              <div className="flex justify-between w-full max-w-sm">
                <span className="text-xs tracking-[0.2em] text-stone-500">
                  SUBTOTAL ({totalItems} {totalItems === 1 ? 'ITEM' : 'ITEMS'})
                </span>
                <span className="text-stone-300 font-medium text-xl">${totalPrice}</span>
              </div>
              <div className="border-t border-stone-800/50 w-full max-w-sm" />
              <button
                disabled
                className="btn-accent w-full max-w-sm py-4 text-stone-100 text-xs tracking-[0.3em] opacity-50 cursor-not-allowed"
              >
                CHECKOUT — COMING SOON
              </button>
              <p className="text-stone-700 text-xs tracking-widest">Store launches soon. Your cart is saved.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

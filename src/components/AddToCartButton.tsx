'use client';
import { useCart } from '@/context/CartContext';
import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { isClosed, releasePhrase } from '@/lib/release';
import type { Product } from '@/lib/products';
import SizeChart from '@/components/SizeChart';

type Props = { product: Product };

export default function AddToCartButton({ product }: Props) {
  const { addItem, drawerOpen } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [mainButtonVisible, setMainButtonVisible] = useState(true);
  const [nudgeSize, setNudgeSize] = useState(false);
  const mainButtonRef = useRef<HTMLButtonElement>(null);
  const sizeSectionRef = useRef<HTMLDivElement>(null);
  const closeSizeGuide = useCallback(() => setSizeGuideOpen(false), []);

  // The phone bar shows only while the main Add to Cart button is off screen.
  useEffect(() => {
    const el = mainButtonRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => setMainButtonVisible(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleStickyAdd = () => {
    if (selectedSize) { handleAdd(); return; }
    sizeSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    setNudgeSize(true);
    setTimeout(() => setNudgeSize(false), 1600);
  };

  if (isClosed(product)) {
    return (
      <div className="space-y-4 border border-stone-800 px-6 py-8 text-center">
        <p className="text-stone-300 tracking-[0.2em] text-sm">{product.name.toUpperCase()}{product.collection ? ` ${product.collection.toUpperCase()}` : ''} HAS CLOSED</p>
        <p className="text-stone-600 text-sm">
          This release is no longer accepting orders. Follow along for what&apos;s next.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Color */}
      <div>
        <p className="text-xs tracking-[0.2em] text-stone-600 mb-4">COLOR</p>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedColor(c)}
              className="px-5 py-2 border text-xs tracking-widest transition-colors duration-200"
              style={{
                borderColor: selectedColor === c ? 'var(--color-accent)' : 'rgb(68 64 60)',
                color: selectedColor === c ? '#f5f5f4' : 'rgb(168 162 158)',
              }}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div ref={sizeSectionRef}>
        <div className="flex items-center justify-between mb-4">
          <p className={`text-xs tracking-[0.2em] transition-colors ${nudgeSize ? 'text-stone-100' : 'text-stone-600'}`}>
            {nudgeSize ? 'PICK YOUR SIZE' : 'SIZE'}
          </p>
          <button
            type="button"
            onClick={() => setSizeGuideOpen(true)}
            className="text-xs tracking-[0.2em] text-stone-600 underline hover:text-stone-400 transition-colors"
          >
            SIZE GUIDE
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className="w-14 h-14 border text-xs tracking-widest transition-colors duration-200"
              style={{
                borderColor: selectedSize === s || nudgeSize ? 'var(--color-accent)' : 'rgb(68 64 60)',
                color: selectedSize === s ? '#f5f5f4' : 'rgb(168 162 158)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        <p className="text-stone-600 text-xs mt-3 tracking-[0.15em]">
          OVERSIZED FIT — ORDER YOUR USUAL SIZE.
        </p>
      </div>

      <button
        ref={mainButtonRef}
        onClick={handleAdd}
        disabled={!selectedSize}
        className="btn-accent w-full py-4 text-stone-100 text-xs tracking-[0.3em] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
      >
        {added ? '✓ ADDED TO CART' : selectedSize ? 'ADD TO CART' : 'SELECT A SIZE'}
      </button>

      {/* What buyers want to know before they commit */}
      <ul className="border-t border-stone-800/60 pt-5 space-y-2.5">
        {[
          releasePhrase(product),
          'MADE TO ORDER',
          'FREE U.S. SHIPPING',
          product.release.type === 'drop' ? 'CANCEL ANYTIME WHILE THE RELEASE IS OPEN' : 'CANCEL ANYTIME BEFORE IT GOES TO PRINT',
          '14-DAY RETURNS & EXCHANGES',
        ].map((line) => (
          <li key={line} className="flex items-start gap-3 text-[11px] tracking-[0.18em] text-stone-400">
            <span style={{ color: 'var(--color-accent)' }}>—</span>
            {line}
          </li>
        ))}
      </ul>
      <Link
        href={`/shipping?from=${product.id}`}
        className="inline-block text-stone-600 text-[11px] tracking-[0.2em] underline hover:text-stone-400 transition-colors"
      >
        SHIPPING &amp; RETURNS DETAILS
      </Link>

      {/* Phone-only sticky bar */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-40 border-t border-stone-800/80 transition-transform duration-300 ${
          !mainButtonVisible && !drawerOpen && !sizeGuideOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
        style={{
          backgroundColor: 'color-mix(in srgb, var(--color-bg) 94%, transparent)',
          backdropFilter: 'blur(8px)',
          paddingLeft: 'max(16px, env(safe-area-inset-left))',
          paddingRight: 'max(16px, env(safe-area-inset-right))',
          paddingTop: '12px',
          paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
        }}
        aria-hidden={mainButtonVisible}
      >
        <div className="flex items-center gap-4">
          <div className="min-w-0">
            <p className="font-display text-lg tracking-wide text-stone-100 leading-none truncate">{product.name.toUpperCase()}</p>
            <p className="text-stone-400 text-sm mt-1 tabular-nums">${product.price}{selectedSize ? ` · ${selectedSize}` : ''}</p>
          </div>
          <button
            onClick={handleStickyAdd}
            tabIndex={mainButtonVisible ? -1 : 0}
            className="btn-accent ml-auto px-6 py-3.5 text-stone-100 text-[11px] tracking-[0.25em] whitespace-nowrap"
          >
            {added ? '✓ ADDED' : selectedSize ? 'ADD TO CART' : 'SELECT SIZE'}
          </button>
        </div>
      </div>

      {sizeGuideOpen && <SizeGuideModal productId={product.id} onClose={closeSizeGuide} />}
    </div>
  );
}

function SizeGuideModal({ productId, onClose }: { productId: string; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[70] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Size guide"
        className="relative w-full sm:max-w-xl max-h-[90dvh] overflow-y-auto border border-stone-800/80 p-6 sm:p-8 space-y-6"
        style={{ backgroundColor: 'var(--color-bg)', paddingBottom: 'max(1.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-start justify-between gap-6">
          <div>
            <p className="text-xs tracking-[0.3em] text-stone-600 mb-2">FIND YOUR FIT</p>
            <p className="font-display text-4xl tracking-wide text-stone-100 leading-none">SIZE GUIDE</p>
          </div>
          <button ref={closeRef} onClick={onClose} className="text-xs tracking-[0.2em] text-stone-500 hover:text-stone-200 transition-colors">
            CLOSE
          </button>
        </div>
        <p className="text-stone-400 text-sm leading-relaxed">
          Cut oversized, with a boxy body and dropped shoulders. Order your usual size for the intended fit,
          or size down for something closer to the body. Measured laid flat, in inches.
        </p>
        <SizeChart compact />
        <p className="text-stone-500 text-sm leading-relaxed">
          <span className="text-stone-300">Chest</span> is measured pit to pit. Lay a shirt you love flat and
          compare it to the chart.
        </p>
        <Link href={`/size-guide?from=${productId}`} className="inline-block text-stone-600 text-[11px] tracking-[0.2em] underline hover:text-stone-400 transition-colors">
          OPEN FULL SIZE GUIDE
        </Link>
      </div>
    </div>
  );
}

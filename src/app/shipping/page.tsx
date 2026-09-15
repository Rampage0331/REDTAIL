import type { Metadata } from "next";
import { ThemeSetter } from "@/components/ThemeSetter";

export const metadata: Metadata = {
  title: "Shipping & Returns | REDTAIL",
  description: "How REDTAIL drops work, and our returns policy.",
};

export default function ShippingPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <ThemeSetter theme="default" />
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">HOW IT WORKS</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-wide text-stone-100 mb-10">
          SHIPPING &amp; RETURNS
        </h1>

        <p className="text-stone-400 leading-relaxed max-w-2xl mb-16">
          Each drop is made to order. We don&apos;t overproduce, and we don&apos;t sit on inventory —
          every shirt in this batch is printed after the drop closes, for the people who ordered it.
        </p>

        <div className="mb-16">
          <p className="text-xs tracking-[0.2em] text-stone-600 mb-6">THE DROP</p>
          <ul className="space-y-4">
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              Genesis//001 is open for a limited window. Once it closes, we go straight to
              production for everyone who ordered.
            </li>
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              <span><span className="text-stone-200">You can cancel your order at any time while the drop is still open</span> — no
              questions asked. Once the window closes and production starts, orders are final.</span>
            </li>
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              Shipping is free, built into the price of every shirt. U.S. only for now.
            </li>
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              Once the drop closes, we go straight to production. We&apos;ll email you the moment
              your order ships — no guessing, no chasing us for updates.
            </li>
          </ul>
        </div>

        <div className="mb-16">
          <p className="text-xs tracking-[0.2em] text-stone-600 mb-6">RETURNS &amp; EXCHANGES</p>
          <ul className="space-y-4">
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              14 days from delivery to request a return or exchange.
            </li>
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              Items must be unworn, unwashed, and in original condition.
            </li>
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              Exchanges are subject to size availability — because each drop is made to order in
              the quantities requested, we may not have extra stock in your size to exchange into.
            </li>
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              Refunds go back to your original payment method.
            </li>
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              You cover return shipping, unless we made a mistake (wrong item, defective) — that&apos;s on us.
            </li>
          </ul>
        </div>

        <p className="text-stone-500 text-sm">
          To start a return or ask about your order, email us at{" "}
          <a href="mailto:shop@wearredtail.com" className="text-stone-300 hover:text-stone-100 transition-colors underline">
            shop@wearredtail.com
          </a>.
        </p>
      </div>
    </div>
  );
}

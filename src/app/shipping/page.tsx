import type { Metadata } from "next";
import { ThemeSetter } from "@/components/ThemeSetter";
import { BackToProductLink, BackToProductButton } from "@/components/BackToProduct";
import { products } from "@/lib/products";
import { closeDateLabel, CORE_SHIP_TIME } from "@/lib/release";

export const metadata: Metadata = {
  title: "Shipping & Returns | REDTAIL",
  description: "How REDTAIL limited releases and the core collection ship, and our returns policy.",
};

export default async function ShippingPage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams;
  const openDrops = products.filter((p) => p.release.type === "drop");

  return (
    <div className="pt-32 pb-24 min-h-dvh">
      <ThemeSetter theme="default" />
      <div className="max-w-4xl mx-auto px-6">
        <BackToProductLink from={from} />
        <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">HOW IT WORKS</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-wide text-stone-100 mb-10">
          SHIPPING &amp; RETURNS
        </h1>

        <p className="text-stone-400 leading-relaxed max-w-2xl mb-16">
          Everything REDTAIL makes is made to order. We don&apos;t overproduce, and we don&apos;t sit on
          inventory. Every shirt is printed for the person who ordered it. There are two ways we release
          pieces: limited releases that open for a short window and then close for good, and a core
          collection that stays available year-round.
        </p>

        <div className="mb-16">
          <p className="text-xs tracking-[0.2em] text-stone-600 mb-6">LIMITED RELEASES</p>
          <ul className="space-y-4">
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              <span>Limited releases are open for a short window, then close for good. They don&apos;t come back
              in the same form.{openDrops.map((p) => closeDateLabel(p) ? ` ${p.name} ${p.collection ?? ""} closes ${closeDateLabel(p)}.` : "").join("")}</span>
            </li>
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              <span><span className="text-stone-200">You can cancel at any time while a release is still open</span> — no
              questions asked. Once the window closes and production starts, orders are final.</span>
            </li>
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              <span>When the window closes, we go straight to production for everyone who ordered.</span>
            </li>
          </ul>
        </div>

        <div className="mb-16">
          <p className="text-xs tracking-[0.2em] text-stone-600 mb-6">CORE COLLECTION</p>
          <ul className="space-y-4">
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              <span>Core pieces are available year-round. Each one is printed after you order it and ships in {CORE_SHIP_TIME}.</span>
            </li>
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              <span>To cancel a core order, email us before it goes to print.</span>
            </li>
          </ul>
        </div>

        <div className="mb-16">
          <p className="text-xs tracking-[0.2em] text-stone-600 mb-6">SHIPPING</p>
          <ul className="space-y-4">
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              <span>Shipping is free, built into the price of every shirt. U.S. only for now.</span>
            </li>
            <li className="text-stone-400 text-sm leading-relaxed flex items-start gap-3">
              <span style={{ color: 'var(--color-accent)' }} className="mt-1">—</span>
              <span>We&apos;ll email you the moment your order ships, with tracking. No guessing, no chasing us for updates.</span>
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
              Exchanges are subject to size availability — because everything is made to order in
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

        <p className="text-stone-500 text-sm mb-16">
          To start a return or ask about your order, email us at{" "}
          <a href="mailto:shop@wearredtail.com" className="text-stone-300 hover:text-stone-100 transition-colors underline">
            shop@wearredtail.com
          </a>.
        </p>

        <BackToProductButton from={from} />
      </div>
    </div>
  );
}

import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts, DROP_NAME } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ThemeSetter } from "@/components/ThemeSetter";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <ThemeSetter theme="default" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to bottom, var(--hero-from), var(--hero-mid), var(--color-bg))' }} />
        {/* Bottom glow — bleeds into page below */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 50% 45% at 50% 100%, rgba(139,18,18,0.20) 0%, rgba(139,18,18,0.07) 50%, rgba(139,18,18,0) 100%)' }} />

        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <Image src="/images/logo.png" alt="" width={600} height={600} className="w-[420px] h-auto opacity-[0.21]" priority />
        </div>



        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <p className="text-[10px] tracking-[0.4em] mb-6" style={{ color: 'var(--color-accent)', transition: 'color 0.8s ease' }}>{DROP_NAME.toUpperCase()}</p>
            <p className="text-[10px] tracking-[0.35em] text-stone-500 mb-6">DISCERN. COMMIT. PURSUE.</p>

            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="btn-accent px-10 py-4 text-stone-100 text-xs tracking-[0.25em]">
                SHOP NOW
              </Link>
              <Link href="/story" className="px-10 py-4 border border-stone-700 text-stone-400 text-xs tracking-[0.25em] hover:border-stone-400 hover:text-stone-100 transition-colors duration-300">
                OUR STORY
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-30">
          <div className="w-px h-12 bg-stone-400 animate-pulse" />
        </div>
      </section>

      {/* SEAM GLOW — bridges hero bottom to featured, bypasses overflow-hidden */}
      <div className="relative h-0 w-full pointer-events-none" style={{ overflow: 'visible' }}>
        <div className="absolute inset-x-0 top-0 -translate-y-1/2 h-72"
          style={{ background: 'radial-gradient(ellipse 55% 100% at 50% 50%, rgba(139,18,18,0.20) 0%, rgba(139,18,18,0.07) 45%, rgba(139,18,18,0) 80%)' }} />
      </div>

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-12">
          <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">{DROP_NAME.toUpperCase()}</p>
          <h2 className="font-display text-4xl tracking-wide text-stone-100">FEATURED</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* BRAND STRIP */}
      <section className="border-y border-stone-800/50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { label: "01 — MATERIAL",     value: "PREMIUM COTTON",     sub: "Soft, structured, and made for everyday wear." },
            { label: "02 — CONSTRUCTION", value: "SIGNATURE DETAILS",  sub: "Distinct graphics, contrast hems, and considered finishes." },
            { label: "03 — FIT",          value: "WEAR IT YOUR WAY",   sub: "clean fit / oversized look" },
          ].map(({ label, value, sub }) => (
            <div key={label}>
              <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">{label}</p>
              <p className="font-display text-2xl tracking-wider text-stone-100 mb-2">{value}</p>
              <p className="text-stone-500 text-sm">{sub}</p>
            </div>
          ))}
        </div>
      </section>

    </>
  );
}

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
        {/* Centered radial glow — matches king/hunter drama */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at 50% 35%, color-mix(in srgb, var(--color-accent) 7%, transparent) 0%, transparent 65%)' }} />

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

      {/* FEATURED */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">{DROP_NAME.toUpperCase()}</p>
            <h2 className="font-display text-4xl tracking-wide text-stone-100">FEATURED</h2>
          </div>
          <Link href="/shop" className="text-xs tracking-[0.2em] text-stone-500 hover:text-stone-100 transition-colors hidden md:block">
            VIEW ALL →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* BRAND STRIP */}
      <section className="border-y border-stone-800/50 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {[
            { label: "MATERIAL", value: "Heavyweight Cotton", sub: "Pre-washed. Built to outlast." },
            { label: "ORIGIN", value: "American-Made", sub: "Crafted with intention." },
            { label: "ETHOS", value: "Primitive Instinct", sub: "Wear your nature." },
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

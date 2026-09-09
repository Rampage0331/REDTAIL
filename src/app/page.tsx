import Link from "next/link";
import Image from "next/image";
import { getFeaturedProducts, DROP_NAME } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function HomePage() {
  const featured = getFeaturedProducts();

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-end pb-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1c1410] via-[#0f0b08] to-[#0a0a0a]" />

        {/* Background watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
          <Image src="/images/logo.png" alt="" width={600} height={600} className="w-[420px] h-auto opacity-[0.06]" priority />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-xl">
            <p className="text-[10px] tracking-[0.4em] text-[#8b1212] mb-5">{DROP_NAME.toUpperCase()}</p>
            <h1 className="font-display text-[clamp(3.5rem,7vw,6rem)] leading-[0.92] tracking-wide text-stone-100 mb-5">
              FORGED<br />IN<br />INSTINCT
            </h1>
            <p className="text-[10px] tracking-[0.35em] text-stone-500 mb-6">DISCERN. COMMIT. PURSUE.</p>
            <p className="text-stone-500 text-sm max-w-sm leading-relaxed mb-10">
              Built for those who move on instinct, not instruction. Redtail wears its nature plainly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/shop" className="px-10 py-4 bg-[#8b1212] text-stone-100 text-xs tracking-[0.25em] hover:bg-[#6e0e0e] transition-colors duration-300">
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

      {/* STORY CALLOUT */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="bg-[#1c1410] border border-stone-800/30 p-12 md:p-20 relative overflow-hidden">
          <div className="relative z-10 max-w-xl">
            <p className="text-xs tracking-[0.3em] text-[#8b1212] mb-6">THE IDEOLOGY</p>
            <h2 className="font-display text-4xl md:text-5xl tracking-wide text-stone-100 mb-6 leading-[0.95]">
              THE HAWK<br />DOESN&apos;T ASK<br />PERMISSION
            </h2>
            <p className="text-stone-400 leading-relaxed mb-4 max-w-sm">
              Redtail is built on the principle that instinct, not instruction, defines those who endure.
            </p>
            <p className="text-xs tracking-[0.35em] text-[#8b1212] mb-3">DISCERN. COMMIT. PURSUE.</p>
            <p className="text-xs tracking-[0.3em] text-stone-600 mb-10 italic">&ldquo;Nature is not quiet.&rdquo;</p>
            <Link href="/story" className="text-xs tracking-[0.25em] text-stone-400 hover:text-stone-100 transition-colors border-b border-stone-700 hover:border-stone-400 pb-1">
              READ THE FULL STORY →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

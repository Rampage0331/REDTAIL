import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/products";
import { ThemeSetter } from "@/components/ThemeSetter";
import type { Theme } from "@/context/ThemeContext";

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }));
}

const PRODUCT_THEMES: Record<string, Theme> = {
  "the-king": "king",
  "the-hunter": "hunter",
};

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = getProductById(id);
  if (!product) notFound();

  const theme = PRODUCT_THEMES[id] ?? "default";

  return (
    <div className="pt-32 pb-24">
      {/* Sets the site-wide color theme when this product page is visited */}
      <ThemeSetter theme={theme} />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">

          {/* Product image */}
          <div className="aspect-[3/4] relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface)', transition: 'background-color 0.8s ease' }}>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="text-stone-700 text-xs tracking-widest">PHOTO COMING SOON</p>
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            {product.collection && (
              <p className="text-xs tracking-[0.3em] mb-4" style={{ color: 'var(--color-accent)', transition: 'color 0.8s ease' }}>
                {product.collection.toUpperCase()}
              </p>
            )}
            <h1 className="font-display text-4xl md:text-5xl tracking-wide text-stone-100 mb-4 leading-[0.95]">
              {product.name.toUpperCase()}
            </h1>
            <p className="text-xl text-stone-300 mb-6">${product.price}</p>
            <p className="text-stone-400 leading-relaxed mb-10">{product.description}</p>

            {/* Colors */}
            <div className="mb-8">
              <p className="text-xs tracking-[0.2em] text-stone-600 mb-4">COLOR</p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((c) => (
                  <button key={c} className="px-5 py-2 border border-stone-700 text-xs tracking-widest text-stone-400 hover:border-stone-400 hover:text-stone-100 transition-colors">
                    {c.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="mb-10">
              <p className="text-xs tracking-[0.2em] text-stone-600 mb-4">SIZE</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    className="w-14 h-14 border border-stone-700 text-xs tracking-widest text-stone-400 transition-colors"
                    style={{ ['--hover-accent' as string]: 'var(--color-accent)' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = 'var(--color-accent)'; (e.currentTarget as HTMLButtonElement).style.color = '#f5f5f4'; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = ''; (e.currentTarget as HTMLButtonElement).style.color = ''; }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Buy — disabled until Stripe is configured */}
            <div className="w-full py-5 bg-stone-800 text-stone-500 text-xs tracking-[0.3em] text-center cursor-not-allowed">
              SHOP COMING SOON
            </div>

            {/* Details */}
            {product.details && (
              <>
                <div className="border-t border-stone-800/50 my-10" />
                <p className="text-xs tracking-[0.2em] text-stone-600 mb-5">DETAILS</p>
                <ul className="space-y-2">
                  {product.details.map((d) => (
                    <li key={d} className="text-stone-400 text-sm flex items-start gap-3">
                      <span style={{ color: 'var(--color-accent)', transition: 'color 0.8s ease' }} className="mt-1">—</span>{d}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

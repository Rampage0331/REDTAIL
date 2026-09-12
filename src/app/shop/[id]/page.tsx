import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductById, products } from "@/lib/products";
import { ThemeSetter } from "@/components/ThemeSetter";
import AddToCartButton from "@/components/AddToCartButton";
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
          <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface)', transition: 'background-color 0.8s ease' }}>
            {product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain"
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
            <h1 className="font-display text-4xl md:text-5xl xl:text-6xl 2xl:text-7xl tracking-wide text-stone-100 mb-4 leading-[0.95]">
              {product.name.toUpperCase()}
            </h1>
            <p className="text-xl text-stone-300 mb-6">${product.price}</p>
            <p className="text-stone-400 leading-relaxed mb-10">{product.description}</p>

            <AddToCartButton product={{
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image,
              colors: product.colors,
              sizes: product.sizes,
            }} />

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

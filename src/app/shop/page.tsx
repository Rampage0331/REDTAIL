import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ShopPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">FOUNDING COLLECTION — 2026</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-stone-100">THE LINE</h1>
        </div>
        <div className="border-t border-stone-800/50 mb-12" />
        <div className="flex items-center justify-between mb-12">
          <p className="text-stone-500 text-sm">{products.length} pieces</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}

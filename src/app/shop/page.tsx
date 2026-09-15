import type { Metadata } from "next";
import Link from "next/link";
import { products, DROP_NAME } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { ThemeSetter } from "@/components/ThemeSetter";

export const metadata: Metadata = {
  title: `Shop — ${DROP_NAME} | REDTAIL`,
  description: "Shop the REDTAIL Genesis//001 drop. Discern. Commit. Pursue.",
};

export default function ShopPage() {
  return (
    <div className="pt-32 pb-24">
      <ThemeSetter theme="default" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">DROP 001</p>
          <h1 className="font-display text-5xl md:text-6xl xl:text-7xl 2xl:text-8xl tracking-wide text-stone-100">{DROP_NAME.toUpperCase()}</h1>
        </div>
        <div className="border-t border-stone-800/50 mb-12" />
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-12">
          <p className="text-stone-500 text-sm">{products.length} pieces</p>
          <p className="text-stone-600 text-xs tracking-[0.2em]">
            MADE TO ORDER — SHIPS AFTER THE DROP CLOSES.{" "}
            <Link href="/shipping" className="underline hover:text-stone-400 transition-colors">
              SHIPPING &amp; RETURNS
            </Link>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-12">
          {products.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}

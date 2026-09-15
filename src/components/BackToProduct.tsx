import Link from "next/link";
import { getProductById } from "@/lib/products";

export function BackToProductLink({ from }: { from?: string }) {
  const product = from ? getProductById(from) : undefined;
  return (
    <Link
      href={product ? `/shop/${product.id}` : "/shop"}
      className="inline-block text-xs tracking-[0.2em] text-stone-600 hover:text-stone-400 transition-colors mb-8"
    >
      ← BACK TO {product ? product.name.toUpperCase() : "SHOP"}
    </Link>
  );
}

export function BackToProductButton({ from }: { from?: string }) {
  const product = from ? getProductById(from) : undefined;
  return (
    <Link
      href={product ? `/shop/${product.id}` : "/shop"}
      className="btn-accent inline-block px-10 py-4 text-stone-100 text-xs tracking-[0.25em]"
    >
      {product ? `BACK TO ${product.name.toUpperCase()}` : "CONTINUE SHOPPING"}
    </Link>
  );
}

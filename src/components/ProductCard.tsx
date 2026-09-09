import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/products";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.id}`} className="group block">
      <div className="relative aspect-[3/4] bg-[#1c1410] overflow-hidden mb-5 flex items-center justify-center">
        {product.image ? (
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <p className="text-stone-700 text-xs tracking-widest">PHOTO COMING SOON</p>
        )}
        <div className="absolute inset-0 bg-[#8b1212]/0 group-hover:bg-[#8b1212]/5 transition-colors duration-500" />
        {product.collection && (
          <div className="absolute top-4 left-4">
            <span className="text-[10px] tracking-[0.2em] text-stone-400 bg-[#0a0a0a]/80 px-3 py-1.5">
              {product.collection.toUpperCase()}
            </span>
          </div>
        )}
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs tracking-[0.15em] text-stone-500 mb-1">{product.colors.join(" / ")}</p>
          <h3 className="text-stone-100 font-medium tracking-wide group-hover:text-[#8b1212] transition-colors duration-300">{product.name}</h3>
        </div>
        <p className="text-stone-300 font-medium">${product.price}</p>
      </div>
    </Link>
  );
}

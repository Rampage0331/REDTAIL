'use client';
import { useCart } from '@/context/CartContext';
import { useState } from 'react';

type Props = {
  product: {
    id: string;
    name: string;
    price: number;
    image?: string;
    colors: string[];
    sizes: string[];
  };
};

export default function AddToCartButton({ product }: Props) {
  const { addItem } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0] || '');
  const [selectedSize, setSelectedSize] = useState('');
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      color: selectedColor,
      size: selectedSize,
      image: product.image,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Color */}
      <div>
        <p className="text-xs tracking-[0.2em] text-stone-600 mb-4">COLOR</p>
        <div className="flex flex-wrap gap-3">
          {product.colors.map((c) => (
            <button
              key={c}
              onClick={() => setSelectedColor(c)}
              className="px-5 py-2 border text-xs tracking-widest transition-colors duration-200"
              style={{
                borderColor: selectedColor === c ? 'var(--color-accent)' : 'rgb(68 64 60)',
                color: selectedColor === c ? '#f5f5f4' : 'rgb(168 162 158)',
              }}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Size */}
      <div>
        <p className="text-xs tracking-[0.2em] text-stone-600 mb-4">SIZE</p>
        <div className="flex flex-wrap gap-2">
          {product.sizes.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedSize(s)}
              className="w-14 h-14 border text-xs tracking-widest transition-colors duration-200"
              style={{
                borderColor: selectedSize === s ? 'var(--color-accent)' : 'rgb(68 64 60)',
                color: selectedSize === s ? '#f5f5f4' : 'rgb(168 162 158)',
              }}
            >
              {s}
            </button>
          ))}
        </div>
        {!selectedSize && (
          <p className="text-stone-700 text-xs mt-3 tracking-widest">SELECT A SIZE TO CONTINUE</p>
        )}
      </div>

      <button
        onClick={handleAdd}
        disabled={!selectedSize}
        className="btn-accent w-full py-4 text-stone-100 text-xs tracking-[0.3em] disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-300"
      >
        {added ? '✓ ADDED TO CART' : 'ADD TO CART'}
      </button>
    </div>
  );
}

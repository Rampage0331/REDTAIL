'use client';
import { createContext, useCallback, useContext, useState, useEffect, ReactNode } from 'react';
import { getProductById } from '@/lib/products';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  color: string;
  size: string;
  image?: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string, color: string, size: string) => void;
  updateQuantity: (id: string, color: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

// Drops saved items whose product, color or size no longer exists (e.g. after a
// colorway rename), and refreshes name/price/image so checkout never rejects them.
function stillValid(items: CartItem[]): CartItem[] {
  return items.flatMap((i) => {
    const p = getProductById(i.id);
    if (!p || !p.colors.includes(i.color) || !p.sizes.includes(i.size)) return [];
    return [{ ...i, name: p.name, price: p.price, image: p.image }];
  });
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('redtail-cart');
      if (stored) setItems(stillValid(JSON.parse(stored)));
    } catch {
      // unreadable cart: start empty
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('redtail-cart', JSON.stringify(items));
    } catch {
      // storage unavailable (private mode): cart still works for this visit
    }
  }, [items]);

  const addItem = (newItem: Omit<CartItem, 'quantity'>) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === newItem.id && i.color === newItem.color && i.size === newItem.size);
      if (existing) {
        return prev.map(i =>
          i.id === newItem.id && i.color === newItem.color && i.size === newItem.size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { ...newItem, quantity: 1 }];
    });
    setDrawerOpen(true);
  };

  const removeItem = (id: string, color: string, size: string) => {
    setItems(prev => prev.filter(i => !(i.id === id && i.color === color && i.size === size)));
  };

  const updateQuantity = (id: string, color: string, size: string, quantity: number) => {
    if (quantity <= 0) { removeItem(id, color, size); return; }
    setItems(prev => prev.map(i =>
      i.id === id && i.color === color && i.size === size ? { ...i, quantity } : i
    ));
  };

  const clearCart = () => setItems([]);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice,
        drawerOpen, openDrawer, closeDrawer,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

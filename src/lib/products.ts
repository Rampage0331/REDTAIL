export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  featured?: boolean;
  collection?: string;
  details?: string[];
};

export const products: Product[] = [
  {
    id: "redtail-hawk-tee",
    name: "Redtail Hawk Tee",
    description: "The original. Clean lines, heavy cotton, built to outlast trends. The hawk watches.",
    price: 55,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Bone", "Slate", "Obsidian"],
    featured: true,
    collection: "Founding Collection",
    details: ["100% heavyweight cotton", "Relaxed fit", "Pre-washed for softness", "Screenprinted graphic"],
  },
  {
    id: "territory-tee",
    name: "Territory Tee",
    description: "Minimal. Earned. For those who know where they came from and where they're going.",
    price: 48,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Bone", "Obsidian"],
    featured: true,
    collection: "Founding Collection",
    details: ["100% heavyweight cotton", "Regular fit", "Pre-washed for softness", "Embroidered chest logo"],
  },
  {
    id: "pursuit-tee",
    name: "Pursuit Tee",
    description: "For those who move without asking permission. Raw energy, refined form.",
    price: 52,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Slate", "Desert"],
    featured: true,
    collection: "Founding Collection",
    details: ["100% heavyweight cotton", "Oversized fit", "Pre-washed for softness", "Screenprinted back graphic"],
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
  featured?: boolean;
  collection?: string;
  drop?: string;
  details?: string[];
  image?: string;
};

export const DROP_NAME = "Genesis//001 The Hunt Begins";

export const products: Product[] = [
  {
    id: "the-hunter",
    name: "The Hunter",
    description: "Red. Patient. Relentless. The Hunter moves when the moment demands — not a second before.",
    price: 65,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Red"],
    featured: true,
    collection: "Genesis//001",
    drop: "Genesis//001 The Hunt Begins",
    details: ["100% heavyweight cotton", "Relaxed fit", "Pre-washed for softness", "Screenprinted graphic"],
    image: "/images/the-hunter.png",
  },
  {
    id: "the-king",
    name: "The King",
    description: "Built on patience, Defined by precision. When the moment comes, commit completely. That's how Kings are made.",
    price: 65,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    colors: ["Gold"],
    featured: true,
    collection: "Genesis//001",
    drop: "Genesis//001 The Hunt Begins",
    details: ["100% heavyweight cotton", "Relaxed fit", "Pre-washed for softness", "Screenprinted graphic"],
    image: "/images/the-king.png",
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

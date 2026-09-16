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
    description: "Unyielding. Relentless. The Hunter moves when the moment demands — not a second before.",
    price: 65,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Vintage Black // Red"],
    featured: true,
    collection: "Genesis//001",
    drop: "Genesis//001 The Hunt Begins",
    details: [
      "6.5 oz mid-weight 100% premium cotton — structured enough to hold shape, light enough to move",
      "Vintage washed for a faded, sun-worn finish — no two pieces fade quite the same",
      "Classic fit through the shoulder and body",
      "Size up for an oversized, relaxed fit",
      "Screenprinted graphic, front and back",
    ],
    image: "/images/the-hunter.png",
  },
  {
    id: "the-king",
    name: "The King",
    description: "Built on patience. Defined by precision. When the moment comes, commit completely. That's how Kings are made.",
    price: 65,
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Limo Black // Holographic Gold"],
    featured: true,
    collection: "Genesis//001",
    drop: "Genesis//001 The Hunt Begins",
    details: [
      "6.5 oz mid-weight 100% premium cotton — structured enough to hold shape, light enough to move",
      "Enzyme washed for a soft hand-feel — arrives pre-broken-in with clean, even color",
      "Classic fit through the shoulder and body",
      "Size up for an oversized, relaxed fit",
      "Holographic gold screenprint, front and back — shifts and catches light as you move",
    ],
    image: "/images/the-king.png",
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

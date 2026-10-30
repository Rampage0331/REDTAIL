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
    id: "genesis-001",
    name: "GENESIS//001",
    description: "Unyielding. Relentless. Moves when the moment demands — not a second before.",
    price: 65,
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: ["Vintage Black // Red"],
    featured: true,
    collection: "The Hunt Begins",
    drop: "Genesis//001 The Hunt Begins",
    details: [
      "6.5 oz mid-weight 100% premium cotton — structured enough to hold shape, light enough to move",
      "Vintage washed for a faded, sun-worn finish — no two pieces fade quite the same",
      "Classic fit through the shoulder and body",
      "Size up for an oversized, relaxed fit",
      "Left-chest logo, full back graphic",
    ],
    image: "/images/genesis-001.png",
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

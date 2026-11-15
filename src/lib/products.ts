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

export const DROP_NAME = "Genesis // 001 The Hunt Begins";

export const products: Product[] = [
  {
    id: "genesis-001",
    name: "GENESIS // 001",
    description: "Unyielding. Relentless. Moves when the moment demands — not a second before.",
    price: 65,
    sizes: ["S", "M", "L", "XL", "XXL", "3XL"],
    colors: ["Washed Coal // White"],
    featured: true,
    collection: "The Hunt Begins",
    drop: "Genesis // 001 The Hunt Begins",
    details: [
      "7.5 oz heavyweight 100% cotton — thick, opaque, and built to hold its shape wash after wash",
      "16-single yarn knit for a dry, substantial hand feel",
      "Heavily washed for a faded, years-worn finish — every piece breaks differently, so no two are the same",
      "Oversized, boxy cut with dropped shoulders that hangs square",
      "Order your usual size for the intended fit — size down for a closer fit",
      "Chest wordmark, full back graphic",
      "Woven hem tag",
    ],
    image: "/images/genesis-001-white-v2.png",
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

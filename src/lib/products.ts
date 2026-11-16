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
  // "drop": limited window, closes at closesAt (null until a launch date is set).
  // "core": always available, made to order continuously.
  release: { type: "drop"; closesAt: string | null } | { type: "core" };
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
    collection: "First Edition",
    drop: "Genesis // 001 The Hunt Begins",
    details: [
      "7.5 oz heavyweight 100% cotton — thick, opaque, and built to hold its shape wash after wash",
      "16-single yarn knit for a dry, substantial hand feel",
      "Vintage washed — the color breaks unevenly for a faded, broken-in look, so every piece varies slightly",
      "Oversized, boxy cut with dropped shoulders that hangs square",
      "Order your usual size for the intended fit — size down for a closer fit",
      "Chest wordmark, full back graphic",
      "First Edition: white woven hem tag with red tail feathers — made only during the launch window, never again",
    ],
    image: "/images/genesis-001-white-v2.png",
    // Set to the close time on launch day: launch + 4 weeks, e.g. "2026-12-31T23:59:59-08:00".
    release: { type: "drop", closesAt: null },
  },
];

export function getProductById(id: string) {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts() {
  return products.filter((p) => p.featured);
}

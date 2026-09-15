import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart | REDTAIL",
  description: "Your REDTAIL cart.",
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return children;
}

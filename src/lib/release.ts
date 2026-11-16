import type { Product } from "@/lib/products";

// How long a core (always-available) piece takes to print and ship.
export const CORE_SHIP_TIME = "about 2 weeks";

function closesAt(p: Product): Date | null {
  return p.release.type === "drop" && p.release.closesAt ? new Date(p.release.closesAt) : null;
}

// A limited drop is closed once its closing time has passed. Core pieces never close.
export function isClosed(p: Product): boolean {
  const d = closesAt(p);
  return d !== null && Date.now() > d.getTime();
}

export function closeDateLabel(p: Product): string | null {
  const d = closesAt(p);
  return d
    ? d.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric", timeZone: "America/Los_Angeles" })
    : null;
}

// The short "made to order" clause shown next to a product, in caps.
export function releasePhrase(p: Product): string {
  if (p.release.type === "core") return `CORE COLLECTION — SHIPS IN ${CORE_SHIP_TIME.toUpperCase()}`;
  const label = closeDateLabel(p);
  return label ? `LIMITED RELEASE — ORDERING CLOSES ${label.toUpperCase()}` : "LIMITED RELEASE — SHIPS AFTER THE WINDOW CLOSES";
}

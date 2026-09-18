import type { MetadataRoute } from "next";
import { products } from "@/lib/products";

const BASE_URL = "https://www.wearredtail.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/shop",
    "/ideology",
    "/contact",
    "/size-guide",
    "/shipping",
    "/privacy",
    "/terms",
  ].map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: new Date(),
  }));

  const productRoutes = products.map((p) => ({
    url: `${BASE_URL}/shop/${p.id}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}

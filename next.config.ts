import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    // Old product pages from before the drop was a single shirt
    return [
      { source: "/shop/the-hunter", destination: "/shop/genesis-001", permanent: true },
      { source: "/shop/the-king", destination: "/shop/genesis-001", permanent: true },
    ];
  },
};

export default nextConfig;

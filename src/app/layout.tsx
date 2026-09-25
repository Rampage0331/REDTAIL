import type { Metadata } from "next";
import { Inter, Bebas_Neue } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AdPixels from "@/components/AdPixels";
import { ThemeProvider } from "@/context/ThemeContext";
import { CartProvider } from "@/context/CartContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

const description =
  "Discern. Commit. Pursue. Premium made-to-order apparel — Genesis//001 The Hunt Begins.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "REDTAIL",
    template: "%s | REDTAIL",
  },
  description,
  openGraph: {
    title: "REDTAIL",
    description,
    url: "/",
    siteName: "REDTAIL",
    images: [{ url: "/images/story-campaign.jpg", alt: "REDTAIL" }],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "REDTAIL",
    description,
    images: ["/images/story-campaign.jpg"],
  },
};

const themeInitScript = `
(function () {
  try {
    var theme = localStorage.getItem('redtail-theme');
    if (theme && theme !== 'default') {
      document.documentElement.setAttribute('data-theme', theme);
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${bebasNeue.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="font-sans antialiased">
        <CartProvider>
          <ThemeProvider>
            <Nav />
            <main>{children}</main>
            <Footer />
          </ThemeProvider>
        </CartProvider>
        <Analytics />
        <AdPixels />
      </body>
    </html>
  );
}

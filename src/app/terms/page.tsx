import type { Metadata } from "next";
import Link from "next/link";
import { ThemeSetter } from "@/components/ThemeSetter";

export const metadata: Metadata = {
  title: "Terms of Service | REDTAIL",
  description: "The terms that govern use of wearredtail.com and REDTAIL orders.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-2xl tracking-wide text-stone-100 mb-4">{title}</h2>
      <div className="text-stone-400 text-sm leading-relaxed space-y-4">{children}</div>
    </div>
  );
}

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 min-h-dvh">
      <ThemeSetter theme="default" />
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">LEGAL</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-wide text-stone-100 mb-4">
          TERMS OF SERVICE
        </h1>
        <p className="text-stone-600 text-xs tracking-widest mb-16">EFFECTIVE SEPTEMBER 17, 2026</p>

        <Section title="Agreement to Terms">
          <p>
            By using wearredtail.com or placing an order, you agree to these terms. If you don&apos;t
            agree, please don&apos;t use the site.
          </p>
        </Section>

        <Section title="The Drop Model">
          <p>
            REDTAIL sells in limited, made-to-order drops. Each drop is open for a limited window,
            after which we go straight to production for everyone who ordered. You can cancel your
            order at any time while a drop is still open. Once the window closes and production
            starts, orders are final. Full details are on our{" "}
            <Link href="/shipping" className="text-stone-300 underline hover:text-stone-100 transition-colors">
              Shipping &amp; Returns
            </Link>{" "}
            page, which is part of these terms.
          </p>
        </Section>

        <Section title="Orders and Payment">
          <p>
            All prices are listed in U.S. dollars. Payment is processed securely through Stripe at
            checkout. We currently ship within the United States only.
          </p>
        </Section>

        <Section title="Shipping, Returns, and Exchanges">
          <p>
            Shipping is included in the price of every item. Our full returns and exchange policy —
            including the 14-day window and what condition items need to be in — is on the{" "}
            <Link href="/shipping" className="text-stone-300 underline hover:text-stone-100 transition-colors">
              Shipping &amp; Returns
            </Link>{" "}
            page.
          </p>
        </Section>

        <Section title="Product Availability">
          <p>
            Because each drop is made to order in limited quantities, sizes and colorways may sell
            out during the ordering window, and exchanges after a drop closes are subject to
            whatever stock remains.
          </p>
        </Section>

        <Section title="Intellectual Property">
          <p>
            The REDTAIL name, logo, hawk mark, and all designs and graphics on our products and site
            are the property of REDTAIL Brand Company LLC. You may not reproduce, distribute, or use
            them without our written permission.
          </p>
        </Section>

        <Section title="Prohibited Uses">
          <p>
            You agree not to use the site for any unlawful purpose, to attempt to disrupt or gain
            unauthorized access to it, or to resell products purchased from us without our
            permission.
          </p>
        </Section>

        <Section title="Limitation of Liability">
          <p>
            REDTAIL provides this site and its products &quot;as is.&quot; To the fullest extent
            permitted by law, we aren&apos;t liable for indirect, incidental, or consequential
            damages arising from your use of the site or our products.
          </p>
        </Section>

        <Section title="Governing Law">
          <p>
            These terms are governed by the laws of [STATE] , without regard to conflict-of-law
            principles.
          </p>
        </Section>

        <Section title="Changes to These Terms">
          <p>
            We may update these terms from time to time. Continued use of the site after changes are
            posted means you accept the updated terms.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            Questions about these terms? Email{" "}
            <a href="mailto:shop@wearredtail.com" className="text-stone-300 underline hover:text-stone-100 transition-colors">
              shop@wearredtail.com
            </a>
            .
          </p>
        </Section>
      </div>
    </div>
  );
}

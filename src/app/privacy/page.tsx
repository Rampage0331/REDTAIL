import type { Metadata } from "next";
import { ThemeSetter } from "@/components/ThemeSetter";

export const metadata: Metadata = {
  title: "Privacy Policy | REDTAIL",
  description: "How REDTAIL collects, uses, and protects your information.",
};

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="font-display text-2xl tracking-wide text-stone-100 mb-4">{title}</h2>
      <div className="text-stone-400 text-sm leading-relaxed space-y-4">{children}</div>
    </div>
  );
}

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 min-h-dvh">
      <ThemeSetter theme="default" />
      <div className="max-w-3xl mx-auto px-6">
        <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">LEGAL</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-wide text-stone-100 mb-4">
          PRIVACY POLICY
        </h1>
        <p className="text-stone-600 text-xs tracking-widest mb-16">EFFECTIVE SEPTEMBER 17, 2026</p>

        <Section title="Introduction">
          <p>
            REDTAIL Brand Company LLC (&quot;REDTAIL,&quot; &quot;we,&quot; &quot;us&quot;) respects your
            privacy. This policy explains what information we collect when you visit wearredtail.com
            or place an order, how we use it, and the choices you have.
          </p>
        </Section>

        <Section title="Information We Collect">
          <p>
            <span className="text-stone-200">Information you provide.</span> When you place an
            order or contact us, we collect your name, email address, shipping and billing address,
            and order details.
          </p>
          <p>
            <span className="text-stone-200">Payment information.</span> Payments are processed by
            Stripe. We do not receive or store your full card number — Stripe handles that directly
            under its own privacy and security practices.
          </p>
          <p>
            <span className="text-stone-200">Information collected automatically.</span> We use
            Vercel Analytics to understand general site traffic (pages viewed, device type,
            approximate location) in an aggregated, non-invasive way. Your cart contents and theme
            preference are stored in your browser&apos;s local storage, not on our servers, and stay
            on your device.
          </p>
        </Section>

        <Section title="How We Use Your Information">
          <p>We use the information we collect to:</p>
          <ul className="list-disc list-inside space-y-2">
            <li>Process and fulfill your order, including production and shipping</li>
            <li>Communicate with you about your order, including cancellation and shipping updates</li>
            <li>Respond to customer service requests and returns</li>
            <li>Understand how people use the site so we can improve it</li>
          </ul>
        </Section>

        <Section title="How We Share Your Information">
          <p>
            We do not sell your personal information. We share it only with the service providers
            needed to run the business — Stripe for payment processing, and shipping carriers to
            deliver your order — and only to the extent necessary for them to do that job.
          </p>
        </Section>

        <Section title="Cookies and Local Storage">
          <p>
            The site uses your browser&apos;s local storage to remember your cart and theme
            preference between visits. This data lives in your browser, not on our servers, and you
            can clear it at any time through your browser settings.
          </p>
        </Section>

        <Section title="Data Retention">
          <p>
            We retain order information as long as necessary to fulfill your order, handle returns
            or disputes, and comply with our legal and tax obligations.
          </p>
        </Section>

        <Section title="Your Rights">
          <p>
            You can ask us to access, correct, or delete the personal information we hold about you
            by emailing{" "}
            <a href="mailto:shop@wearredtail.com" className="text-stone-300 underline hover:text-stone-100 transition-colors">
              shop@wearredtail.com
            </a>
            . We&apos;ll respond as quickly as we can.
          </p>
        </Section>

        <Section title="Children's Privacy">
          <p>
            REDTAIL is not directed at children, and we do not knowingly collect information from
            anyone under 13.
          </p>
        </Section>

        <Section title="Security">
          <p>
            We take reasonable measures to protect your information, but no method of transmission
            or storage is completely secure. We can&apos;t guarantee absolute security.
          </p>
        </Section>

        <Section title="Changes to This Policy">
          <p>
            We may update this policy from time to time. Changes take effect as soon as they&apos;re
            posted on this page.
          </p>
        </Section>

        <Section title="Contact Us">
          <p>
            Questions about this policy? Email{" "}
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

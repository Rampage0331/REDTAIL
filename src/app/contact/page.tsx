import type { Metadata } from "next";
import { ThemeSetter } from "@/components/ThemeSetter";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact | REDTAIL",
  description: "Get in touch with REDTAIL.",
};

export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-dvh">
      <ThemeSetter theme="default" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">GET IN TOUCH</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-stone-100">CONTACT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <ContactForm />

          <div className="flex flex-col justify-center space-y-12">
            <div>
              <p className="text-xs tracking-[0.2em] text-stone-600 mb-4">EMAIL</p>
              <a href="mailto:shop@wearredtail.com" className="text-stone-300 hover:text-stone-100 transition-colors">shop@wearredtail.com</a>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-stone-600 mb-4">FOLLOW</p>
              <div className="flex gap-6">
                <a href="https://instagram.com/wearredtail" target="_blank" rel="noopener noreferrer" className="text-xs tracking-[0.2em] text-stone-500 hover:text-stone-100 transition-colors">INSTAGRAM</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import { ThemeSetter } from "@/components/ThemeSetter";

export const metadata: Metadata = {
  title: "Ideology | REDTAIL",
  description: "The ideology behind REDTAIL.",
};

export default function IdeologyPage() {
  return (
    <div className="pt-32 pb-24">
      <ThemeSetter theme="default" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">REDTAIL</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wide text-stone-100 leading-[0.9]">IDEOLOGY</h1>
        </div>

        <div className="relative w-full max-w-3xl mx-auto aspect-square mb-24 overflow-hidden">
          <Image
            src="/images/story-campaign.jpg"
            alt="Scouting the treeline, bow in hand"
            fill
            sizes="(min-width: 768px) 768px, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-24">
          <div>
            <h2 className="font-display text-3xl md:text-5xl tracking-wide text-stone-100 mb-6 leading-[0.95]">
              REDTAIL
            </h2>
            <p className="text-xs tracking-[0.4em] text-[#8b1212]">DISCERN. COMMIT. PURSUE.</p>
          </div>
          <div className="flex flex-col justify-center text-stone-400 leading-relaxed">
            <p>
              Discern. Commit. Pursue. Not a slogan. REDTAIL is built on it. So is everyone who
              wears it.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

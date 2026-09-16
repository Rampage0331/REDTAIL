import type { Metadata } from "next";
import Image from "next/image";
import { ThemeSetter } from "@/components/ThemeSetter";

export const metadata: Metadata = {
  title: "Our Story | REDTAIL",
  description: "The ideology behind REDTAIL.",
};

export default function StoryPage() {
  return (
    <div className="pt-32 pb-24">
      <ThemeSetter theme="default" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">THE IDEOLOGY</p>
          <h1 className="font-display text-5xl md:text-7xl tracking-wide text-stone-100 leading-[0.9]">OUR<br />STORY</h1>
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
          <div className="flex flex-col justify-center space-y-6 text-stone-400 leading-relaxed">
            <p>
              A red-tailed hawk doesn&apos;t hesitate. It reads the moment, commits to the strike,
              and follows through completely — no second-guessing, no wasted movement. Discern.
              Commit. Pursue. We didn&apos;t choose those words because they sounded good. We chose
              them because that&apos;s exactly what the hawk does, every time, without exception.
            </p>
            <p>
              Every piece we make follows the same principle: discern what&apos;s worth making,
              commit to making it right, and pursue it without compromise. No filler drops, no
              chasing what&apos;s trending. If something here resonates with you, it&apos;s not
              because we designed it to — it&apos;s because it&apos;s true, and that&apos;s rarer
              than it should be.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

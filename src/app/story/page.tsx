import type { Metadata } from "next";
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

        <div className="w-full aspect-[21/9] bg-[#1c1410] mb-24 flex items-center justify-center">
          <p className="text-stone-700 text-xs tracking-widest">CAMPAIGN IMAGE</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 mb-24">
          <div>
            <h2 className="font-display text-3xl md:text-5xl tracking-wide text-stone-100 mb-6 leading-[0.95]">
              REDTAIL
            </h2>
            <p className="text-xs tracking-[0.4em] text-[#8b1212]">DISCERN. COMMIT. PURSUE.</p>
          </div>
          <div className="flex flex-col justify-center space-y-6 text-stone-400 leading-relaxed">
            <p>[Rozy&apos;s story — the ideology, the mission, what Redtail means and who it&apos;s built for.]</p>
            <p>[The name, the hawk as a symbol, where the idea came from.]</p>
            <p>[Primitive naturalist meets streetwear — what that means in practice.]</p>
          </div>
        </div>
      </div>
    </div>
  );
}

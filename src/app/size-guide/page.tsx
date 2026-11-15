import type { Metadata } from "next";
import { ThemeSetter } from "@/components/ThemeSetter";
import { BackToProductLink, BackToProductButton } from "@/components/BackToProduct";
import SizeChart from "@/components/SizeChart";

export const metadata: Metadata = {
  title: "Size Guide | REDTAIL",
  description: "Find your fit for GENESIS // 001.",
};

export default async function SizeGuidePage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams;

  return (
    <div className="pt-32 pb-24 min-h-dvh">
      <ThemeSetter theme="default" />
      <div className="max-w-4xl mx-auto px-6">
        <BackToProductLink from={from} />
        <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">FIND YOUR FIT</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-wide text-stone-100 mb-10">SIZE GUIDE</h1>

        <p className="text-stone-400 leading-relaxed max-w-2xl mb-12">
          GENESIS // 001 is cut oversized — a boxy body with dropped shoulders. Order your usual size
          for the intended fit, or size down for something closer to the body. All measurements below
          are taken with the garment laid flat, in inches.
        </p>

        <SizeChart />

        <div className="mt-10 space-y-4 max-w-2xl">
          <p className="text-stone-500 text-sm leading-relaxed">
            <span className="text-stone-300">Chest</span> is measured pit-to-pit with the shirt laid
            flat — double this number for the full chest circumference.
          </p>
          <p className="text-stone-500 text-sm leading-relaxed">
            <span className="text-stone-300">How to measure</span> — lay a shirt you already own and
            love the fit of flat on a table, then compare its measurements to the chart above.
          </p>
        </div>

        <div className="mt-16">
          <BackToProductButton from={from} />
        </div>
      </div>
    </div>
  );
}

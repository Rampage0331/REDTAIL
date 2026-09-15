import type { Metadata } from "next";
import { ThemeSetter } from "@/components/ThemeSetter";
import { BackToProductLink, BackToProductButton } from "@/components/BackToProduct";

export const metadata: Metadata = {
  title: "Size Guide | REDTAIL",
  description: "Find your fit for The Hunter and The King.",
};

const SIZES = [
  { size: "S", chest: "19", length: "27½", sleeve: "8" },
  { size: "M", chest: "21", length: "29", sleeve: "8½" },
  { size: "L", chest: "22½", length: "30½", sleeve: "9" },
  { size: "XL", chest: "24½", length: "31¼", sleeve: "9½" },
  { size: "XXL", chest: "26", length: "33", sleeve: "9¾" },
];

export default async function SizeGuidePage({ searchParams }: { searchParams: Promise<{ from?: string }> }) {
  const { from } = await searchParams;

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <ThemeSetter theme="default" />
      <div className="max-w-4xl mx-auto px-6">
        <BackToProductLink from={from} />
        <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">FIND YOUR FIT</p>
        <h1 className="font-display text-5xl md:text-6xl tracking-wide text-stone-100 mb-10">SIZE GUIDE</h1>

        <p className="text-stone-400 leading-relaxed max-w-2xl mb-12">
          The Hunter and The King are cut from the same classic silhouette — true to size through
          the chest and body. All measurements below are taken with the garment laid flat, in inches.
          For the relaxed, oversized drape shown in our photos, size up one from your usual.
        </p>

        <div className="overflow-x-auto border border-stone-800/50">
          <table className="w-full text-left border-collapse min-w-[480px]">
            <thead>
              <tr className="border-b border-stone-800/50">
                <th className="px-6 py-4 text-xs tracking-[0.2em] text-stone-600 font-medium">SIZE</th>
                <th className="px-6 py-4 text-xs tracking-[0.2em] text-stone-600 font-medium">CHEST</th>
                <th className="px-6 py-4 text-xs tracking-[0.2em] text-stone-600 font-medium">BODY LENGTH</th>
                <th className="px-6 py-4 text-xs tracking-[0.2em] text-stone-600 font-medium">SLEEVE LENGTH</th>
              </tr>
            </thead>
            <tbody>
              {SIZES.map((row, i) => (
                <tr key={row.size} className={i !== SIZES.length - 1 ? "border-b border-stone-800/50" : ""}>
                  <td className="px-6 py-4 text-stone-100 tracking-wide">{row.size}</td>
                  <td className="px-6 py-4 text-stone-400">{row.chest}&quot;</td>
                  <td className="px-6 py-4 text-stone-400">{row.length}&quot;</td>
                  <td className="px-6 py-4 text-stone-400">{row.sleeve}&quot;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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

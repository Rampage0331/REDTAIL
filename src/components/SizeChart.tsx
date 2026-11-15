// Cotton Collective 7.5 oz Oversized Box tee, laid flat, in inches.
// Shared by the size guide page and the product page's size guide pop-up.
export const SIZES = [
  { size: "S", chest: "20½", length: "27¼", shoulder: "19½", sleeve: "8¼" },
  { size: "M", chest: "22", length: "28¼", shoulder: "21", sleeve: "8½" },
  { size: "L", chest: "23½", length: "29¼", shoulder: "22½", sleeve: "8¾" },
  { size: "XL", chest: "25", length: "30¼", shoulder: "24", sleeve: "9" },
  { size: "XXL", chest: "26½", length: "31¼", shoulder: "25½", sleeve: "9¼" },
  { size: "3XL", chest: "28", length: "32¼", shoulder: "27", sleeve: "9½" },
];

export default function SizeChart({ compact = false }: { compact?: boolean }) {
  const cell = compact ? "px-3 py-3" : "px-6 py-4";
  return (
    <div className="overflow-x-auto border border-stone-800/50">
      <table className={`w-full text-left border-collapse ${compact ? "min-w-[360px] text-sm" : "min-w-[480px]"}`}>
        <thead>
          <tr className="border-b border-stone-800/50">
            {["SIZE", "CHEST", compact ? "LENGTH" : "BODY LENGTH", "SHOULDER", compact ? "SLEEVE" : "SLEEVE LENGTH"].map((h) => (
              <th key={h} className={`${cell} text-xs tracking-[0.2em] text-stone-600 font-medium`}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {SIZES.map((row, i) => (
            <tr key={row.size} className={i !== SIZES.length - 1 ? "border-b border-stone-800/50" : ""}>
              <td className={`${cell} text-stone-100 tracking-wide`}>{row.size}</td>
              <td className={`${cell} text-stone-400 tabular-nums`}>{row.chest}&quot;</td>
              <td className={`${cell} text-stone-400 tabular-nums`}>{row.length}&quot;</td>
              <td className={`${cell} text-stone-400 tabular-nums`}>{row.shoulder}&quot;</td>
              <td className={`${cell} text-stone-400 tabular-nums`}>{row.sleeve}&quot;</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

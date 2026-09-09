export default function StoryPage() {
  return (
    <div className="pt-32 pb-24">
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
              THE HAWK<br />DOESN&apos;T ASK<br />PERMISSION
            </h2>
            <p className="text-xs tracking-[0.4em] text-[#8b1212]">DISCERN. COMMIT. PURSUE.</p>
          </div>
          <div className="flex flex-col justify-center space-y-6 text-stone-400 leading-relaxed">
            <p>[Rozy&apos;s story — the ideology, the mission, what Redtail means and who it&apos;s built for.]</p>
            <p>[The name, the hawk as a symbol, where the idea came from.]</p>
            <p>[Primitive naturalist meets streetwear — what that means in practice.]</p>
          </div>
        </div>

        <div className="border-t border-stone-800/50 pt-16">
          <p className="text-xs tracking-[0.3em] text-stone-600 mb-12">WHAT WE STAND FOR</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { num: "01", title: "INSTINCT", body: "Move first. Ask later. The red-tailed hawk doesn't deliberate — it acts on what it knows." },
              { num: "02", title: "ENDURANCE", body: "Built to last. Every piece is constructed with the same permanence as the nature it draws from." },
              { num: "03", title: "AUTHENTICITY", body: "No trends. No noise. Redtail is for those who know exactly who they are." },
            ].map(({ num, title, body }) => (
              <div key={num}>
                <p className="text-xs tracking-[0.3em] text-stone-700 mb-4">{num}</p>
                <h3 className="font-display text-2xl tracking-widest text-stone-100 mb-4">{title}</h3>
                <p className="text-stone-500 text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

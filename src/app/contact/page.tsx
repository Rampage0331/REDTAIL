export default function ContactPage() {
  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16">
          <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">GET IN TOUCH</p>
          <h1 className="font-display text-5xl md:text-6xl tracking-wide text-stone-100">CONTACT</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <form className="space-y-8">
            {[
              { label: "NAME", type: "text", placeholder: "Your name" },
              { label: "EMAIL", type: "email", placeholder: "your@email.com" },
            ].map(({ label, type, placeholder }) => (
              <div key={label}>
                <label className="block text-xs tracking-[0.2em] text-stone-600 mb-3">{label}</label>
                <input type={type} placeholder={placeholder}
                  className="w-full bg-transparent border border-stone-800 px-4 py-4 text-stone-100 text-sm focus:outline-none focus:border-stone-500 transition-colors placeholder:text-stone-700" />
              </div>
            ))}
            <div>
              <label className="block text-xs tracking-[0.2em] text-stone-600 mb-3">MESSAGE</label>
              <textarea rows={6} placeholder="What's on your mind?"
                className="w-full bg-transparent border border-stone-800 px-4 py-4 text-stone-100 text-sm focus:outline-none focus:border-stone-500 transition-colors placeholder:text-stone-700 resize-none" />
            </div>
            <button type="submit" className="px-10 py-4 bg-[#8b1212] text-stone-100 text-xs tracking-[0.3em] hover:bg-[#6e0e0e] transition-colors duration-300">
              SEND IT
            </button>
          </form>

          <div className="flex flex-col justify-center space-y-12">
            <div>
              <p className="text-xs tracking-[0.2em] text-stone-600 mb-4">EMAIL</p>
              <p className="text-stone-300">hello@redtail.com</p>
            </div>
            <div>
              <p className="text-xs tracking-[0.2em] text-stone-600 mb-4">FOLLOW</p>
              <div className="flex gap-6">
                {["INSTAGRAM", "TIKTOK"].map((p) => (
                  <a key={p} href="#" className="text-xs tracking-[0.2em] text-stone-500 hover:text-stone-100 transition-colors">{p}</a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

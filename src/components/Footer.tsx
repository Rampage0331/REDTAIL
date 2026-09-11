import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-32" style={{ backgroundColor: 'var(--color-bg)', transition: 'background-color 0.7s ease' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
          <div>
            <Image src="/images/logo.png" alt="Redtail" width={140} height={70} className="h-14 w-auto mb-4" />
            <p className="text-xs tracking-[0.3em] text-stone-500 mb-1">DISCERN. COMMIT. PURSUE.</p>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-stone-600 mb-5">NAVIGATE</p>
            <nav className="flex flex-col gap-3">
              {[["Shop", "/shop"], ["Our Story", "/story"], ["Contact", "/contact"]].map(([label, href]) => (
                <Link key={href} href={href} className="text-stone-400 hover:text-stone-100 text-sm transition-colors duration-300">{label}</Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="text-xs tracking-[0.2em] text-stone-600 mb-5">SUPPORT</p>
            <nav className="flex flex-col gap-3">
              {[["Shipping & Returns", "/shipping"], ["Size Guide", "/size-guide"], ["FAQ", "/faq"]].map(([label, href]) => (
                <Link key={href} href={href} className="text-stone-400 hover:text-stone-100 text-sm transition-colors duration-300">{label}</Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-stone-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-stone-600 text-xs tracking-widest">© {new Date().getFullYear()} REDTAIL. ALL RIGHTS RESERVED.</p>
          <p className="text-stone-700 text-xs tracking-[0.3em]">REDTAIL</p>
        </div>
      </div>
    </footer>
  );
}

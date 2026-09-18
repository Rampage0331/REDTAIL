import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-32" style={{ backgroundColor: 'var(--color-bg)', transition: 'background-color 0.7s ease' }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <div className="flex flex-col items-center text-center">
            <Image src="/images/logo.png" alt="Redtail" width={140} height={70} className="h-14 w-auto mb-4" />
            <p className="text-xs tracking-[0.3em] text-stone-500 mb-1">DISCERN. COMMIT. PURSUE.</p>
          </div>

          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <p className="text-xs tracking-[0.2em] text-stone-600 mb-5">NAVIGATE</p>
            <nav className="flex flex-col gap-3">
              {[["Shop", "/shop"], ["Ideology", "/ideology"], ["Size Guide", "/size-guide"], ["Shipping & Returns", "/shipping"], ["Contact", "/contact"]].map(([label, href]) => (
                <Link key={href} href={href} className="text-stone-400 hover:text-stone-100 text-sm transition-colors duration-300">{label}</Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="border-t border-stone-800/50 pt-8 flex flex-col items-center gap-4">
          <div className="flex gap-6">
            <Link href="/privacy" className="text-stone-600 hover:text-stone-400 text-xs tracking-widest transition-colors duration-300">PRIVACY POLICY</Link>
            <Link href="/terms" className="text-stone-600 hover:text-stone-400 text-xs tracking-widest transition-colors duration-300">TERMS OF SERVICE</Link>
          </div>
          <p className="text-stone-600 text-xs tracking-widest">© {new Date().getFullYear()} REDTAIL BRAND COMPANY LLC. ALL RIGHTS RESERVED.</p>
        </div>
      </div>
    </footer>
  );
}

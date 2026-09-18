import Link from "next/link";
import { ThemeSetter } from "@/components/ThemeSetter";

export default function NotFound() {
  return (
    <div className="pt-32 pb-24 min-h-dvh flex items-center">
      <ThemeSetter theme="default" />
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-xs tracking-[0.3em] text-stone-600 mb-3">404</p>
        <h1 className="font-display text-6xl md:text-8xl tracking-wide text-stone-100 mb-8">
          NOTHING HERE
        </h1>
        <p className="text-stone-400 mb-10">
          Wrong turn. The page you&apos;re after doesn&apos;t exist.
        </p>
        <Link href="/" className="btn-accent inline-block px-10 py-4 text-stone-100 text-xs tracking-[0.25em]">
          BACK HOME
        </Link>
      </div>
    </div>
  );
}

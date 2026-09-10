"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "HOME", href: "/" },
    { label: "SHOP", href: "/shop" },
    { label: "OUR STORY", href: "/story" },
    { label: "CONTACT", href: "/contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "nav-scrolled" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-end">
        <nav className="hidden md:flex items-center gap-10">
          {links.map(({ label, href }) => (
            <Link key={href} href={href} className="text-xs tracking-[0.2em] text-stone-400 hover:text-stone-100 transition-colors duration-300">
              {label}
            </Link>
          ))}
        </nav>

        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <div className="flex flex-col gap-1.5">
            <span className={`block h-px w-6 bg-stone-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px w-4 bg-stone-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-stone-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-stone-800/50 px-6 py-8 flex flex-col gap-6">
          {links.map(({ label, href }) => (
            <Link key={href} href={href} className="font-display text-3xl tracking-widest text-stone-400 hover:text-stone-100 transition-colors" onClick={() => setMenuOpen(false)}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

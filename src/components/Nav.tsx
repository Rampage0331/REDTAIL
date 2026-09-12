"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { totalItems } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      setShowLogo(window.scrollY > 320);
    };
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
      <div className="max-w-7xl mx-auto px-6 xl:px-12 py-4 xl:py-6 flex items-center justify-between">

        {/* Logo — slides in when scrolled past hero watermark */}
        <div
          className="transition-all duration-500 ease-out"
          style={{
            opacity: showLogo ? 1 : 0,
            transform: showLogo ? 'translateY(0)' : 'translateY(-6px)',
            pointerEvents: showLogo ? 'auto' : 'none',
          }}
        >
          <Link href="/">
            <Image
              src="/images/logo.png"
              alt="Redtail"
              width={110}
              height={55}
              className="h-9 w-auto"
              priority
            />
          </Link>
        </div>

        {/* Right side: nav links + cart */}
        <div className="hidden md:flex items-center gap-10">
          <nav className="flex items-center gap-10">
            {links.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className="text-xs xl:text-sm tracking-[0.2em] text-stone-400 hover:text-stone-100 transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Cart icon */}
          <Link href="/cart" className="relative text-stone-400 hover:text-stone-100 transition-colors duration-300">
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 01-8 0"/>
            </svg>
            {totalItems > 0 && (
              <span
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full text-[9px] flex items-center justify-center font-bold text-stone-900"
                style={{ backgroundColor: 'var(--color-accent)' }}
              >
                {totalItems}
              </span>
            )}
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          <div className="flex flex-col gap-1.5">
            <span className={`block h-px w-6 bg-stone-400 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
            <span className={`block h-px w-4 bg-stone-400 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-stone-400 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-t border-stone-800/50 px-6 py-8 flex flex-col gap-6">
          {links.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className="font-display text-3xl tracking-widest text-stone-400 hover:text-stone-100 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href="/cart"
            className="font-display text-3xl tracking-widest text-stone-400 hover:text-stone-100 transition-colors flex items-center gap-4"
            onClick={() => setMenuOpen(false)}
          >
            CART
            {totalItems > 0 && (
              <span className="text-base font-sans" style={{ color: 'var(--color-accent)' }}>({totalItems})</span>
            )}
          </Link>
        </div>
      )}
    </header>
  );
}

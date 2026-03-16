"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Portfolio" },
  { href: "#guestbook", label: "Guestbook" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Current time display
  const now = new Date();
  const timeStr = now.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "2-digit",
  });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/70 backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-5 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="#"
          className="text-2xl font-black tracking-tighter text-text"
        >
          b<span className="text-primary">.</span>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <div key={link.href} className="flex items-center">
              {i > 0 && (
                <span className="w-[1px] h-4 bg-text/15 mx-4" />
              )}
              <Link
                href={link.href}
                className="text-sm text-text-muted hover:text-text transition-colors duration-300"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>

        {/* Right — Location & Time */}
        <div className="hidden sm:flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-surface/80 border border-text/5">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
            <span className="text-xs text-text-muted">
              Bandung, {timeStr}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About & Skills" },
  { href: "#projects", label: "Works" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-bg/80 backdrop-blur-2xl border-b border-text/5" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-4 sm:py-5 flex items-center justify-between">
        {/* Logo — personal name */}
        <Link
          href="#hero"
          className="font-heading text-lg sm:text-2xl font-bold italic text-text tracking-tight"
        >
          Roy Aziz Barera<span className="text-primary">.</span>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs sm:text-sm font-medium text-text-muted hover:text-text transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <a
            href="/cv-roy-aziz-barera.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full border border-text/15 text-text text-xs font-semibold hover:border-text hover:bg-surface transition-all duration-300"
          >
            <svg
              className="w-3.5 h-3.5 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
            Preview CV
          </a>

          <a
            href="mailto:royazizbarera@gmail.com"
            className="hidden sm:inline-flex px-4 py-2 rounded-full bg-text text-bg text-xs font-semibold hover:bg-primary transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

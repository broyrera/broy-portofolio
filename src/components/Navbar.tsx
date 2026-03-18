"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

const navLinks = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Works" },
  { href: "#guestbook", label: "Guestbook" },
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
        scrolled ? "bg-bg/70 backdrop-blur-2xl" : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 py-5 flex items-center justify-between">
        {/* Logo — personal name */}
        <Link
          href="#"
          className="font-heading text-xl sm:text-2xl font-bold italic text-text"
        >
          Roy Barera<span className="text-primary">.</span>
        </Link>

        {/* Center Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-text-muted hover:text-text transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* Contact CTA */}
          <a
            href="mailto:royazizbarera@gmail.com"
            className="hidden sm:inline-flex px-5 py-2.5 rounded-full bg-text text-bg text-sm font-semibold hover:bg-primary transition-colors duration-300"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
}

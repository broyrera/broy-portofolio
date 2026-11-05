"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import Magnetic from "./Magnetic";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Mouse-tracking glow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(148,35,69,0.07), transparent 65%)`;
    };
    const el = heroRef.current;
    if (el) el.addEventListener("mousemove", handleMouseMove);
    return () => {
      if (el) el.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative grain min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-6 sm:px-10 overflow-hidden"
    >
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6ee] via-[#fbf1e4] to-bg z-0" />

      {/* Subtle animated blobs */}
      <div className="absolute top-[-15%] right-[-10%] w-[480px] h-[480px] rounded-full bg-gradient-to-br from-primary/10 to-accent-bright/10 blur-3xl blob-spin z-0 pointer-events-none" />
      <div className="absolute bottom-[-15%] left-[-10%] w-[420px] h-[420px] rounded-full bg-gradient-to-tr from-accent/10 to-primary-light/10 blur-3xl blob-spin-reverse z-0 pointer-events-none" />

      {/* Mouse glow */}
      <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Main Centered Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto flex flex-col items-center text-center">
        {/* Availability Badge */}
        <div className="opacity-0 animate-entrance stagger-1 mb-6">
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-md border border-text/8 shadow-xs hover:border-primary/20 transition-all duration-300">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
            <span className="text-xs font-medium tracking-wide text-text-muted">
              Available for Full-Stack &amp; Backend Roles
            </span>
          </div>
        </div>

        {/* Profile Photo */}
        <div className="opacity-0 animate-entrance stagger-2 mb-6">
          <Magnetic strength={0.15}>
            <div className="relative inline-block">
              <div className="absolute inset-[-6px] rounded-full border border-text/10" />
              <div className="absolute inset-[-12px] rounded-full border border-dashed border-text/8 animate-spin-slow" />
              <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden glow-pulse border-2 border-white/60 shadow-lg relative bg-surface">
                <Image
                  src="/images/roy-photo.png"
                  alt="Roy Aziz Barera"
                  fill
                  className="object-cover object-top"
                  sizes="144px"
                  priority
                />
              </div>
            </div>
          </Magnetic>
        </div>

        {/* Name Heading */}
        <div className="opacity-0 animate-entrance stagger-3 space-y-1.5 mb-7">
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-text leading-[1.05]">
            Roy Aziz Barera<span className="text-primary">.</span>
          </h1>
          <p className="font-heading text-lg sm:text-2xl font-bold italic text-primary-dark">
            Full-Stack Developer
          </p>
          <p className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] text-text-muted">
            Strong Backend Foundation
          </p>
        </div>

        {/* Action CTAs */}
        <div className="opacity-0 animate-entrance stagger-4 flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-7">
          <Link
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text text-bg text-sm font-semibold hover:bg-primary hover:shadow-md hover:shadow-primary/20 transition-all duration-300"
          >
            Lihat Proyek
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </Link>

          <a
            href="/cv-roy-aziz-barera.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/80 border border-text/15 text-text text-sm font-semibold hover:bg-surface hover:border-text transition-all duration-300 shadow-xs"
          >
            <svg
              className="w-4 h-4 text-primary"
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
        </div>

        {/* Social Links */}
        <div className="opacity-0 animate-entrance stagger-5 flex items-center justify-center gap-2.5">
          {[
            {
              name: "GitHub",
              label: "GH",
              href: "https://github.com/broyrera",
            },
            {
              name: "LinkedIn",
              label: "IN",
              href: "https://linkedin.com/in/royazizbarera",
            },
            {
              name: "WhatsApp",
              label: "WA",
              href: "https://wa.me/6285871761909",
            },
            {
              name: "Email",
              label: "Mail",
              href: "mailto:royazizbarera@gmail.com",
            },
          ].map((s) => (
            <Magnetic key={s.name} strength={0.3}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="px-3.5 py-1.5 rounded-full border border-text/12 text-xs font-semibold text-text-muted hover:bg-text hover:text-bg hover:border-text transition-all duration-300"
              >
                {s.label}
              </a>
            </Magnetic>
          ))}
        </div>
      </div>
    </section>
  );
}

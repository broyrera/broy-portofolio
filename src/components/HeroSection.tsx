"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Magnetic from "./Magnetic";

export default function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  // Mouse-tracking glow
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!glowRef.current || !heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      glowRef.current.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(148,35,69,0.08), transparent 60%)`;
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
      className="relative grain min-h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Warm gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fdf6ee] via-[#fce8d0] to-bg z-0" />

      {/* Animated color blobs */}
      <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/10 to-accent-bright/15 blur-3xl blob-spin z-0" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-gradient-to-tr from-accent/10 to-primary-light/10 blur-3xl blob-spin-reverse z-0" />

      {/* Mouse-tracking glow */}
      <div ref={glowRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 w-full flex flex-col items-center pt-28 pb-0">
        {/* Script greeting */}
        <h2
          className="font-accent italic text-5xl sm:text-7xl md:text-8xl text-text/70 tracking-wide mb-[-40px] sm:mb-[-60px] md:mb-[-70px] z-0 select-none opacity-0 animate-entrance stagger-1"
        >
          Hey, there
        </h2>

        {/* Personal Photo with glow */}
        <Magnetic strength={0.15}>
          <div className="relative z-10 w-52 h-52 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full overflow-hidden glow-pulse border-4 border-white/60 opacity-0 animate-entrance stagger-2">
            <Image
              src="/images/roy-photo.png"
              alt="Roy Aziz Barera"
              fill
              className="object-cover object-top"
              sizes="320px"
              priority
            />
          </div>
        </Magnetic>

        {/* Availability Badge */}
        <div className="mt-8 opacity-0 animate-entrance stagger-3">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/70 backdrop-blur-md border border-text/5 shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300 cursor-default">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-xs font-medium text-text">
              Available for new opportunities
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="mt-6 text-sm text-text-muted max-w-xs text-center leading-relaxed opacity-0 animate-entrance stagger-4">
          Specialized in Backend Development, Mobile Apps, and Clean Architecture.
        </p>

        {/* Social row */}
        <div className="mt-6 flex items-center gap-3 opacity-0 animate-entrance stagger-5">
          {[
            { label: "gh", href: "https://github.com/broyrera" },
            { label: "li", href: "https://linkedin.com/in/royazizbarera" },
            { label: "wa", href: "https://wa.me/6285871761909" },
          ].map((s) => (
            <Magnetic key={s.label} strength={0.4}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-text/15 flex items-center justify-center text-xs font-semibold text-text-muted hover:bg-text hover:text-bg hover:border-text hover:scale-110 transition-all duration-300"
              >
                {s.label}
              </a>
            </Magnetic>
          ))}
        </div>
      </div>

      {/* Bottom: massive name + role */}
      <div className="relative z-10 w-full mt-auto pb-8 sm:pb-12 opacity-0 animate-entrance stagger-6">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
            <h1 className="text-[2.5rem] sm:text-[4.5rem] md:text-[6.5rem] lg:text-[8rem] font-black leading-[0.85] tracking-[-0.04em] uppercase text-text">
              I AM
              <br />
              <span className="text-shimmer">ROY</span> BARERA
            </h1>

            <div className="sm:text-right pb-2">
              <p className="text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight text-text leading-tight">
                Backend &<br />
                Mobile<br />
                Developer
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
        <div className="w-6 h-9 rounded-full border-2 border-text/20 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2.5 rounded-full bg-text/40 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

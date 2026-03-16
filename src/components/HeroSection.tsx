export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-accent/8 rounded-full blur-3xl animate-float animate-delay-300" />
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: `radial-gradient(circle, #942345 1px, transparent 1px)`,
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        {/* Broy Accent Badge */}
        <div className="animate-fade-in-up opacity-0 mb-8">
          <span className="inline-block px-5 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent font-accent text-sm tracking-[0.2em] uppercase">
            Portfolio 2026
          </span>
        </div>

        {/* Name */}
        <h1 className="animate-fade-in-up opacity-0 animate-delay-100 font-heading text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-6">
          <span className="text-foreground">Roy Aziz</span>
          <br />
          <span className="gradient-text">Barera</span>
        </h1>

        {/* Role */}
        <p className="animate-fade-in-up opacity-0 animate-delay-200 font-accent text-xl sm:text-2xl md:text-3xl font-light text-foreground-muted tracking-wide mb-8">
          Informatics Engineer
        </p>

        {/* Description */}
        <p className="animate-fade-in-up opacity-0 animate-delay-300 max-w-2xl mx-auto text-base sm:text-lg text-foreground-muted/80 leading-relaxed mb-12">
          Backend & Mobile Developer yang berfokus pada{" "}
          <span className="text-primary font-medium">TypeScript</span>,{" "}
          <span className="text-primary font-medium">Go</span>,{" "}
          <span className="text-primary font-medium">Flutter</span>, dan{" "}
          <span className="text-primary font-medium">Kotlin</span>. Menulis
          clean, modular code dengan pendekatan product-oriented.
        </p>

        {/* CTA Buttons */}
        <div className="animate-fade-in-up opacity-0 animate-delay-400 flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-primary text-white rounded-full font-medium tracking-wide text-sm overflow-hidden transition-all duration-400 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20"
          >
            <span className="relative z-10">Lihat Project</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 transition-transform group-hover:translate-x-1"
            >
              <path d="M7 17l9.2-9.2M17 17V7H7" />
            </svg>
          </a>

          <a
            href="#about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-foreground-light/20 text-foreground-muted text-sm font-medium tracking-wide transition-all duration-300 hover:border-accent hover:text-accent"
          >
            Tentang Saya
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-fade-in-up opacity-0 animate-delay-500 mt-20">
          <div className="flex flex-col items-center gap-2 text-foreground-light/40">
            <span className="text-xs tracking-[0.3em] uppercase font-accent">
              Scroll
            </span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-accent/40 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}

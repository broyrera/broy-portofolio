import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-24 pb-8 overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 sm:px-10 w-full">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* Left — Text */}
          <div className="space-y-8">
            {/* Big Heading — lowercase, heavy, like Videaste */}
            <div className="animate-fade-in-up opacity-0">
              <h1 className="text-[3.5rem] sm:text-[5rem] md:text-[6rem] lg:text-[7rem] font-black leading-[0.9] tracking-tighter lowercase">
                <span className="text-text">code</span>
                <br />
                <span className="text-primary">craft</span>
              </h1>
            </div>

            {/* Description */}
            <div className="animate-fade-in-up opacity-0 anim-delay-2 max-w-md">
              <p className="text-base sm:text-lg text-text-muted leading-relaxed">
                Backend & Mobile Developer membangun solusi digital yang clean,
                modular, dan product-oriented.
              </p>
            </div>

            {/* Social Icons — small circles */}
            <div className="animate-fade-in-up opacity-0 anim-delay-3 flex items-center gap-3">
              {[
                { label: "gh", href: "https://github.com/broyrera" },
                { label: "li", href: "https://linkedin.com/in/royazizbarera" },
                { label: "ig", href: "#" },
                { label: "wa", href: "https://wa.me/6285871761909" },
              ].map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-text/15 flex items-center justify-center text-xs font-semibold text-text-muted hover:bg-text hover:text-bg transition-all duration-300"
                >
                  {s.label}
                </a>
              ))}
            </div>

            {/* Stats */}
            <div className="animate-fade-in-up opacity-0 anim-delay-4 flex gap-10 pt-4">
              <div>
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-text">
                  <span className="text-primary">+</span>3
                </p>
                <p className="text-xs text-text-muted mt-1 max-w-[140px] leading-snug">
                  Projects shipped from concept to launch
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-black tracking-tight text-text">
                  <span className="text-primary">+</span>3
                </p>
                <p className="text-xs text-text-muted mt-1 max-w-[140px] leading-snug">
                  National-level awards & achievements
                </p>
              </div>
            </div>
          </div>

          {/* Right — Feature Image Container */}
          <div className="animate-fade-in-up opacity-0 anim-delay-2 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-md lg:max-w-lg">
              {/* Main Image Container — Yellow rounded */}
              <div className="relative rounded-5xl overflow-hidden bg-accent-bright aspect-[3/4] shadow-2xl">
                <Image
                  src="/images/project-lawan-pmo.png"
                  alt="Roy Aziz Barera"
                  fill
                  className="object-cover mix-blend-multiply"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                {/* Handwritten overlay */}
                <div className="absolute top-6 right-6 font-heading italic text-white/60 text-2xl rotate-[-8deg]">
                  Roy Barera
                </div>
              </div>

              {/* Floating CTA Button */}
              <a
                href="#projects"
                className="absolute -bottom-4 -right-4 sm:bottom-6 sm:right-[-20px] w-16 h-16 rounded-full bg-text text-bg flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300"
              >
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </a>

              {/* Small floating image — top right */}
              <div className="hidden lg:block absolute -top-8 -right-12 w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-4 border-bg rotate-6">
                <Image
                  src="/images/project-klinik-kecantikan.png"
                  alt="Project preview"
                  fill
                  className="object-cover"
                  sizes="80px"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-text-light">
        <div className="w-6 h-9 rounded-full border-2 border-text/15 flex items-start justify-center pt-1.5">
          <div className="w-1 h-2 rounded-full bg-text/30 animate-bounce" />
        </div>
      </div>
    </section>
  );
}

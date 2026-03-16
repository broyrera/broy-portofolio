const skills = [
  { name: "TypeScript", icon: "⚡" },
  { name: "Go", icon: "🔷" },
  { name: "Flutter", icon: "📱" },
  { name: "Kotlin", icon: "🟣" },
  { name: "NestJS", icon: "🔺" },
  { name: "Express", icon: "⬡" },
  { name: "Docker", icon: "🐳" },
  { name: "Firebase", icon: "🔥" },
  { name: "Git", icon: "📂" },
  { name: "Supabase", icon: "⚡" },
];

const experiences = [
  {
    num: "01",
    role: "Mobile Developer",
    company: "PT Neural Technologies Indonesia",
    period: "Jun 2025 – Oct 2025",
  },
  {
    num: "02",
    role: "Ketua Unit Kewirausahaan",
    company: "HIMAKOM Polban",
    period: "Feb 2024 – Jan 2025",
  },
  {
    num: "03",
    role: "Project Manager & Full-Stack Dev",
    company: "Lawan PMO (Independent)",
    period: "2024",
  },
];

export default function AboutSection() {
  return (
    <>
      {/* === Scrolling Text Divider === */}
      <div className="py-6 overflow-hidden border-y border-text/8">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter lowercase text-text/[0.04] mx-4"
            >
              about&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <section id="about" className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
            {/* Left — Bio */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-text-muted mb-6">
                  — About
                </p>
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[0.95] lowercase">
                  building
                  <br />
                  <span className="text-primary">digital</span>
                  <br />
                  solutions
                </h2>
              </div>

              <p className="text-base sm:text-lg text-text-muted leading-relaxed max-w-lg">
                Saya{" "}
                <span className="font-semibold text-text">
                  Roy Aziz Barera
                </span>
                , Informatics Engineer dari Politeknik Negeri Bandung. Berfokus
                pada backend dan mobile development. Terbiasa memimpin tim,
                menulis clean code, dan bekerja secara product-oriented.
              </p>

              <p className="text-sm text-text-muted/70 leading-relaxed max-w-lg">
                Berpengalaman memimpin pengembangan aplikasi Lawan PMO sebagai
                Project Manager sekaligus Full-Stack Developer hingga rilis.
                Peraih penghargaan PIMNAS 2025 — Silver (Poster) & Bronze
                (Presentasi) PKM-KI 1.
              </p>

              {/* CTA */}
              <a
                href="mailto:royazizbarera@gmail.com"
                className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-text text-bg text-sm font-semibold hover:bg-primary transition-colors duration-300"
              >
                Get in touch
                <svg
                  className="w-4 h-4"
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
            </div>

            {/* Right — Skills + Experience */}
            <div className="space-y-12">
              {/* Skills */}
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-text-muted mb-6">
                  — Tech Stack
                </p>
                <div className="flex flex-wrap gap-3">
                  {skills.map((s) => (
                    <span
                      key={s.name}
                      className="px-4 py-2.5 rounded-full bg-surface border border-text/5 text-sm font-medium text-text flex items-center gap-2 hover:bg-accent-bright/20 hover:border-accent/30 transition-all duration-300 cursor-default"
                    >
                      <span className="text-base">{s.icon}</span>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>

              {/* Experience List — numbered like exhibitions */}
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-text-muted mb-6">
                  — Experience
                </p>
                <div className="space-y-0 divide-y divide-text/8">
                  {experiences.map((exp) => (
                    <div
                      key={exp.num}
                      className="group py-5 flex items-start gap-4 sm:gap-6 cursor-default hover:bg-surface/50 transition-colors -mx-4 px-4 rounded-2xl"
                    >
                      <span className="text-xs font-semibold text-text-light mt-1.5">
                        {exp.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-heading text-lg sm:text-xl font-bold italic text-text group-hover:text-primary transition-colors">
                          {exp.role}
                        </p>
                        <p className="text-sm text-text-muted mt-0.5">
                          {exp.company}
                        </p>
                      </div>
                      <span className="text-xs text-text-light whitespace-nowrap mt-1.5 hidden sm:block">
                        {exp.period}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

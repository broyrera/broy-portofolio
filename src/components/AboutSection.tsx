const skills = [
  {
    category: "Mobile",
    items: ["Flutter", "Kotlin", "React Native"],
    icon: "📱",
  },
  {
    category: "Backend",
    items: ["TypeScript", "NestJS", "Express", "Go"],
    icon: "⚙️",
  },
  {
    category: "Tools & Infra",
    items: ["Git", "Docker", "Firebase", "Supabase"],
    icon: "🛠️",
  },
  {
    category: "Soft Skills",
    items: ["Leadership", "Project Management", "Team Collaboration"],
    icon: "🎯",
  },
];

const experiences = [
  {
    role: "Mobile Developer",
    company: "PT Neural Technologies Indonesia",
    period: "Jun 2025 – Oct 2025",
    desc: "Mengembangkan aplikasi internal perusahaan.",
  },
];

const achievements = [
  "🥈 Peraih Penghargaan Setara Perak — Poster PKM-KI 1 PIMNAS 2025",
  "🥉 Peraih Penghargaan Setara Perunggu — Presentasi PKM-KI 1 PIMNAS 2025",
  "🏆 Finalis Musabaqah Desain Aplikasi Komputer Al-Qur'an 2023",
];

export default function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden">
      {/* Decorative BG */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        {/* Section Title */}
        <div className="text-center mb-20">
          <span className="font-accent text-accent text-sm tracking-[0.3em] uppercase block mb-4">
            Tentang
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Mengenal Saya
          </h2>
          <div className="elegant-divider mx-auto max-w-xs" />
        </div>

        {/* Bio + Experience Grid */}
        <div className="grid lg:grid-cols-5 gap-12 mb-20">
          {/* Bio */}
          <div className="lg:col-span-3 space-y-6">
            <p className="text-lg leading-relaxed text-foreground-muted">
              Saya{" "}
              <span className="font-heading font-semibold text-foreground">
                Roy Aziz Barera
              </span>
              , Informatics Engineer dari{" "}
              <span className="text-primary font-medium">
                Politeknik Negeri Bandung
              </span>
              . Berfokus pada backend dan mobile development menggunakan
              TypeScript, Go, Flutter, dan Kotlin.
            </p>
            <p className="text-base leading-relaxed text-foreground-muted/80">
              Berpengalaman memimpin pengembangan aplikasi{" "}
              <span className="font-medium text-foreground">Lawan PMO</span>{" "}
              sebagai Project Manager sekaligus Full-Stack Developer hingga
              rilis. Terbiasa menulis clean, modular code dan bekerja secara
              sistematis dalam tim product-oriented.
            </p>
            <p className="text-base leading-relaxed text-foreground-muted/80">
              Saat ini mengembangkan skill Backend dan Mobile Engineering serta
              menerapkan pendekatan{" "}
              <span className="italic text-accent font-medium">
                semi vibe coding
              </span>{" "}
              untuk mempercepat workflow tanpa mengorbankan kualitas arsitektur.
            </p>

            {/* Experience */}
            <div className="mt-8 pt-8 border-t border-accent/10">
              <h3 className="font-heading text-lg font-semibold text-foreground mb-4">
                Pengalaman
              </h3>
              {experiences.map((exp, i) => (
                <div
                  key={i}
                  className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4"
                >
                  <span className="text-sm text-accent font-medium whitespace-nowrap">
                    {exp.period}
                  </span>
                  <div>
                    <p className="font-medium text-foreground">{exp.role}</p>
                    <p className="text-sm text-foreground-muted">
                      {exp.company} — {exp.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements Card */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl bg-surface border border-accent/10 p-8 space-y-6">
              <h3 className="font-heading text-lg font-semibold text-foreground flex items-center gap-2">
                <span className="text-accent">✦</span> Penghargaan
              </h3>
              <ul className="space-y-4">
                {achievements.map((ach, i) => (
                  <li
                    key={i}
                    className="text-sm text-foreground-muted leading-relaxed pl-1"
                  >
                    {ach}
                  </li>
                ))}
              </ul>

              {/* Education */}
              <div className="pt-6 border-t border-accent/10">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-accent">✦</span> Pendidikan
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      Politeknik Negeri Bandung
                    </p>
                    <p className="text-xs text-foreground-muted">
                      Informatics Engineering • 2022 – 2026
                    </p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      SMAN 1 Cicalengka
                    </p>
                    <p className="text-xs text-foreground-muted">
                      Science Education • 2019 – 2022
                    </p>
                  </div>
                </div>
              </div>

              {/* Organisasi */}
              <div className="pt-6 border-t border-accent/10">
                <h3 className="font-heading text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <span className="text-accent">✦</span> Organisasi
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium text-foreground text-sm">
                      Ketua Unit Kewirausahaan
                    </p>
                    <p className="text-xs text-foreground-muted">
                      HIMAKOM Polban • 2024 – 2025
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {skills.map((skill) => (
            <div
              key={skill.category}
              className="group card-glow rounded-2xl bg-surface/60 border border-accent/8 p-6 text-center"
            >
              <div className="text-3xl mb-4">{skill.icon}</div>
              <h3 className="font-heading text-base font-semibold text-foreground mb-4">
                {skill.category}
              </h3>
              <div className="flex flex-wrap justify-center gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-background border border-accent/15 text-foreground-muted transition-colors group-hover:border-primary/20 group-hover:text-primary"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

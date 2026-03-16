import Image from "next/image";

/* ============================================================
   PROJECT DATA — Mudah ditambahkan!
   ============================================================
   Tambahkan object baru ke array `projects`:
   {
     title: "Nama Project",
     description: "Deskripsi singkat.",
     image: "/images/project-screenshot.png",
     tech: ["Next.js", "TypeScript"],
     link: "https://github.com/...",
     demo: "https://demo.url.com",
   }
   Taruh screenshot di public/images/
   ============================================================ */

interface Project {
  title: string;
  description: string;
  image: string;
  tech: string[];
  link?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    title: "Lawan PMO",
    description:
      "Mobile app untuk melawan prokrastinasi. Dikembangkan sebagai PM & Full-Stack Dev hingga rilis.",
    image: "/images/project-lawan-pmo.png",
    tech: ["Flutter", "Firebase", "Dart"],
    link: "#",
  },
  {
    title: "Klinik Kecantikan Broy",
    description:
      "Sistem manajemen klinik kecantikan — dashboard admin, pelanggan, transaksi, dan jadwal.",
    image: "/images/project-klinik-kecantikan.png",
    tech: ["Next.js", "TypeScript", "Prisma"],
    link: "#",
  },
  {
    title: "Shorts Broy",
    description:
      "Tools otomasi pembuatan konten short-form video dengan pipeline CLI yang efisien.",
    image: "/images/project-shorts-broy.png",
    tech: ["Python", "FFmpeg", "CLI"],
    link: "#",
  },
];

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group card-lift rounded-4xl overflow-hidden bg-dark-surface/80 border border-white/5">
      {/* Image */}
      <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="flex gap-2">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white text-dark text-xs font-semibold hover:bg-accent-bright transition-colors"
              >
                GitHub ↗
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 sm:p-8">
        <h3 className="font-heading text-xl sm:text-2xl font-bold italic text-text-on-dark mb-2">
          {project.title}
        </h3>
        <p className="text-sm text-dark-muted leading-relaxed mb-5">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-dark-muted"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <>
      {/* === Scrolling Text Divider === */}
      <div className="py-6 overflow-hidden bg-dark border-y border-white/5">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter lowercase text-white/[0.04] mx-4"
            >
              portfolio&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Dark Portfolio Section */}
      <section id="projects" className="bg-dark py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <div>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-dark-muted mb-4">
                — Portfolio
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight lowercase text-text-on-dark leading-[0.95]">
                selected
                <br />
                <span className="text-primary-light">works</span>
              </h2>
            </div>
            <p className="text-sm text-dark-muted max-w-sm leading-relaxed">
              Beberapa project digital yang telah saya kerjakan — dari mobile
              app hingga web platform dan automation tools.
            </p>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}

            {/* "More Coming" placeholder card */}
            <div className="rounded-4xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center min-h-[300px] p-8 text-center">
              <span className="text-4xl mb-4">🚀</span>
              <p className="text-lg font-semibold text-dark-muted">
                More coming soon
              </p>
              <p className="text-sm text-dark-muted/60 mt-1">
                Exciting projects in the pipeline
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

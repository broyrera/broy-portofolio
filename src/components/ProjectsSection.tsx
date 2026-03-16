import Image from "next/image";

/* ============================================================
   PROJECT DATA
   ============================================================
   Untuk menambahkan project baru, cukup tambahkan object baru
   ke array `projects` di bawah ini. Taruh screenshot project
   di folder public/images/ dan referensikan path-nya.

   Contoh:
   {
     title: "Nama Project",
     description: "Deskripsi singkat project.",
     image: "/images/project-nama-project.png",
     tech: ["Next.js", "TypeScript", "Tailwind"],
     link: "https://github.com/username/repo",   // opsional
     demo: "https://demo.project.com",           // opsional
   }
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
      "Aplikasi mobile untuk melawan prokrastinasi dan membangun kebiasaan produktif. Dikembangkan sebagai Project Manager sekaligus Full-Stack Developer hingga rilis.",
    image: "/images/project-lawan-pmo.png",
    tech: ["Flutter", "Firebase", "Dart", "Project Management"],
    link: "#",
  },
  {
    title: "Klinik Kecantikan Broy",
    description:
      "Sistem manajemen klinik kecantikan lengkap dengan dashboard admin, manajemen pelanggan, transaksi, dan jadwal appointment.",
    image: "/images/project-klinik-kecantikan.png",
    tech: ["Next.js", "TypeScript", "Prisma", "Tailwind CSS"],
    link: "#",
  },
  {
    title: "Shorts Broy",
    description:
      "Tools otomasi untuk pembuatan konten short-form video. Pipeline processing video dengan CLI interface yang efisien.",
    image: "/images/project-shorts-broy.png",
    tech: ["Python", "FFmpeg", "Automation", "CLI"],
    link: "#",
  },
];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <div
      className={`group card-glow rounded-3xl overflow-hidden bg-surface border border-accent/8 ${
        index === 0 ? "md:col-span-2 md:row-span-2" : ""
      }`}
    >
      {/* Image */}
      <div
        className={`relative overflow-hidden ${
          index === 0 ? "h-64 sm:h-80 md:h-96" : "h-48 sm:h-56"
        }`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes={
            index === 0
              ? "(max-width: 768px) 100vw, 66vw"
              : "(max-width: 768px) 100vw, 33vw"
          }
        />
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Hover Info */}
        <div className="absolute inset-0 flex items-end p-6 md:p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
          <div className="flex gap-3">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-white/90 backdrop-blur text-foreground text-xs font-medium tracking-wide hover:bg-white transition-colors"
              >
                GitHub ↗
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-primary text-white text-xs font-medium tracking-wide hover:bg-primary-dark transition-colors"
              >
                Live Demo ↗
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={`p-6 md:p-8 ${index === 0 ? "md:p-10" : ""}`}>
        <h3
          className={`font-heading font-bold text-foreground mb-3 ${
            index === 0 ? "text-2xl md:text-3xl" : "text-xl"
          }`}
        >
          {project.title}
        </h3>
        <p
          className={`text-foreground-muted leading-relaxed mb-5 ${
            index === 0 ? "text-base" : "text-sm"
          }`}
        >
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="px-3 py-1 rounded-full text-xs font-medium bg-background border border-accent/15 text-accent-dark tracking-wide"
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
    <section id="projects" className="relative py-32">
      {/* Top Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-6xl px-6">
        {/* Section Title */}
        <div className="text-center mb-20">
          <span className="font-accent text-accent text-sm tracking-[0.3em] uppercase block mb-4">
            Karya
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-6">
            Project Pilihan
          </h2>
          <p className="max-w-lg mx-auto text-foreground-muted">
            Beberapa project yang telah saya kerjakan, dari mobile app hingga
            web platform dan automation tools.
          </p>
          <div className="elegant-divider mx-auto max-w-xs" />
        </div>

        {/* Project Grid — Featured (first) is large, rest are smaller */}
        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

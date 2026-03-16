import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import ScrollReveal from "./ScrollReveal";

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <ScrollReveal delay={index * 150} direction={index % 2 === 0 ? "left" : "right"}>
      <Link
        href={`/projects/${project.slug}`}
        className="group card-alive block rounded-4xl overflow-hidden bg-dark-surface/80 border border-white/5"
      >
        {/* Image */}
        <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

          {/* View arrow */}
          <div className="absolute bottom-4 right-4 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 border border-white/10">
            <svg
              className="w-5 h-5 text-white group-hover:rotate-45 transition-transform duration-500"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <h3 className="font-heading text-xl sm:text-2xl font-bold italic text-text-on-dark mb-2 group-hover:text-primary-light transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-dark-muted leading-relaxed mb-5 group-hover:text-dark-muted/80 transition-colors">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="px-3 py-1 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-dark-muted group-hover:border-primary-light/30 group-hover:text-primary-light/70 transition-all duration-300"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export default function ProjectsSection() {
  return (
    <>
      {/* Scrolling Text Divider */}
      <div className="py-6 overflow-hidden bg-dark border-y border-white/5 group cursor-default">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter lowercase text-white/[0.04] mx-4 group-hover:text-primary-light/[0.1] transition-colors duration-700"
            >
              portfolio&nbsp;·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Dark Portfolio Section */}
      <section id="projects" className="relative bg-dark py-24 sm:py-32 overflow-hidden">
        {/* Floating blob */}
        <div className="absolute top-20 right-[-200px] w-[500px] h-[500px] rounded-full bg-gradient-to-br from-primary/5 to-transparent blur-3xl animate-float-delayed pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 sm:px-10 relative z-10">
          {/* Section Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-dark-muted mb-4">
                — Portfolio
              </p>
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight lowercase text-text-on-dark leading-[0.95]">
                selected
                <br />
                <span className="text-primary-light">works</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="text-sm text-dark-muted max-w-sm leading-relaxed">
                Beberapa project yang telah saya kerjakan, dari mobile app hingga
                web platform dan automation tools.
              </p>
            </ScrollReveal>
          </div>

          {/* Project Grid */}
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {projects.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import projectsData from "@/data/projects.json";
import ScrollReveal from "./ScrollReveal";
import { getTechNames } from "@/lib/projectTech";
import type { Project, ProjectCategory } from "@/types/portfolio";

const rawProjects = (projectsData as unknown as Project[]).filter(
  (p) => p.published
);

const sortedProjects = [...rawProjects].sort(
  (a, b) => (a.display_order ?? 999) - (b.display_order ?? 999)
);

const categories: { id: ProjectCategory; label: string }[] = [
  { id: "all", label: "Semua Proyek" },
  { id: "team", label: "Team Products" },
  { id: "work", label: "Work & Enterprise" },
  { id: "client", label: "Client & Freelance" },
  { id: "personal", label: "Personal & Eksperimen" },
  { id: "academic", label: "Akademik & Kampus" },
];

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const techNames = getTechNames(project.tech);

  return (
    <ScrollReveal
      delay={index * 100}
      direction={index % 2 === 0 ? "left" : "right"}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group card-alive flex flex-col h-full rounded-3xl overflow-hidden bg-dark-surface/90 border border-white/8 hover:border-primary-light/40 transition-all duration-300 shadow-lg"
      >
        {/* Card Thumbnail / Header */}
        <div className="relative aspect-[16/10] overflow-hidden bg-dark">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#19151c] via-[#241923] to-[#121014] border-b border-white/5">
              <div className="absolute w-36 h-36 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
              <div className="relative z-10 w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-3 text-primary-light group-hover:scale-110 group-hover:border-primary-light/40 transition-all duration-300">
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <path d="m7 8 3 3-3 3" />
                  <path d="M13 14h4" />
                </svg>
              </div>
              <span className="relative z-10 text-[11px] font-mono tracking-widest uppercase text-dark-muted mb-1">
                Enterprise &amp; Systems
              </span>
              <p className="relative z-10 font-heading text-lg font-bold italic text-white/90 group-hover:text-primary-light transition-colors">
                {project.title}
              </p>
            </div>
          )}

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark-surface via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

          {/* Top Badges */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between gap-2">
            <span className="px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-black/60 backdrop-blur-md text-white/90 border border-white/10">
              {project.category_label}
            </span>

            {project.highlight_metric && (
              <span className="px-3 py-1 rounded-full text-[11px] font-medium bg-primary/80 backdrop-blur-md text-white border border-primary-light/30">
                {project.highlight_metric}
              </span>
            )}
          </div>

          {/* View Arrow Floating Action */}
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 border border-white/15">
            <svg
              className="w-4 h-4 text-white group-hover:rotate-45 transition-transform duration-300"
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

        {/* Card Content */}
        <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-dark-muted mb-2">
              <span className="font-medium text-primary-light/90">
                {project.role}
              </span>
              <span className="font-mono">{project.year}</span>
            </div>

            <h3 className="font-heading text-xl sm:text-2xl font-bold italic text-text-on-dark mb-3 group-hover:text-primary-light transition-colors duration-300">
              {project.title}
            </h3>

            <p className="text-xs sm:text-sm text-dark-muted leading-relaxed line-clamp-3 mb-6">
              {project.description}
            </p>
          </div>

          {/* Tech Badges */}
          <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
            {techNames.slice(0, 5).map((t: string) => (
              <span
                key={t}
                className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/5 border border-white/8 text-dark-muted group-hover:border-primary-light/20 group-hover:text-white/80 transition-colors"
              >
                {t}
              </span>
            ))}
            {techNames.length > 5 && (
              <span className="px-2 py-1 rounded-md text-[11px] font-medium bg-white/5 text-dark-muted/60">
                +{techNames.length - 5}
              </span>
            )}
          </div>
        </div>
      </Link>
    </ScrollReveal>
  );
}

export default function ProjectsSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<ProjectCategory>("all");

  const filteredProjects =
    selectedCategory === "all"
      ? sortedProjects
      : sortedProjects.filter((p) => p.category === selectedCategory);

  return (
    <>
      {/* Marquee Divider */}
      <div className="py-5 overflow-hidden bg-dark border-y border-white/5 group cursor-default">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 10 }).map((_, i) => (
            <span
              key={i}
              className="text-4xl sm:text-6xl font-black tracking-tighter lowercase text-white/[0.04] mx-5 group-hover:text-primary-light/[0.1] transition-colors duration-700"
            >
              works · showcase · backend · architecture · systems ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      {/* Dark Portfolio Section */}
      <section
        id="projects"
        className="relative bg-dark py-20 sm:py-28 overflow-hidden scroll-mt-16"
      >
        {/* Subtle Ambient Blob */}
        <div className="absolute top-20 right-[-180px] w-[460px] h-[460px] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl animate-float-delayed pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 sm:px-10 relative z-10 space-y-12">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-dark-muted mb-3">
                Selected Works
              </p>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight lowercase text-text-on-dark leading-[1.05]">
                portfolio &amp;
                <br />
                <span className="text-primary-light">proven delivery</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p className="text-xs sm:text-sm text-dark-muted max-w-md leading-relaxed">
                Koleksi proyek nyata yang mencakup kontribusi enterprise backend,
                produk tim dengan traksi pasar, aplikasi klien, riset
                akademik, hingga eksplorasi tools otomasi personal.
              </p>
            </ScrollReveal>
          </div>

          {/* Category Tabs */}
          <ScrollReveal delay={150}>
            <div className="flex flex-wrap gap-2 pt-2 border-b border-white/5 pb-4">
              {categories.map((c) => {
                const count =
                  c.id === "all"
                    ? sortedProjects.length
                    : sortedProjects.filter((p) => p.category === c.id).length;

                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                      selectedCategory === c.id
                        ? "bg-white text-dark shadow-md"
                        : "bg-white/5 border border-white/8 text-dark-muted hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span>{c.label}</span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                        selectedCategory === c.id
                          ? "bg-dark/15 text-dark"
                          : "bg-white/10 text-dark-muted"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-20 rounded-3xl border border-dashed border-white/10">
              <p className="text-sm text-dark-muted">
                Belum ada proyek dalam kategori ini.
              </p>
            </div>
          )}

          {/* Project Grid */}
          {filteredProjects.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
              {filteredProjects.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

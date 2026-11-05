import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import projectsData from "@/data/projects.json";
import { parseTechEntries } from "@/lib/projectTech";
import ImageGallery from "@/components/ImageGallery";
import type { Project } from "@/types/portfolio";

export function generateStaticParams() {
  return (projectsData as unknown as Project[])
    .filter((p) => p.published)
    .map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const publishedProjects = (projectsData as unknown as Project[])
    .filter((p) => p.published)
    .sort((a, b) => (a.display_order ?? 999) - (b.display_order ?? 999));

  const currentIndex = publishedProjects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) notFound();

  const project = publishedProjects[currentIndex];
  const prevProject =
    publishedProjects[
      (currentIndex - 1 + publishedProjects.length) % publishedProjects.length
    ];
  const nextProject =
    publishedProjects[(currentIndex + 1) % publishedProjects.length];

  const techEntries = parseTechEntries(project.tech);
  const galleryImages = [
    ...(project.image ? [project.image] : []),
    ...(project.screenshots ?? []),
  ];

  return (
    <main className="min-h-screen bg-bg text-text">
      {/* 1. Sticky Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/85 backdrop-blur-xl border-b border-text/5">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-4 flex items-center justify-between">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-text-muted hover:text-text transition-colors"
          >
            <svg
              className="w-4 h-4 text-primary"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali ke Showcase
          </Link>

          <Link
            href="/"
            className="font-heading text-lg sm:text-xl font-bold italic text-text"
          >
            Roy Aziz Barera<span className="text-primary">.</span>
          </Link>
        </div>
      </nav>

      {/* 2. Project Header / Hero Info */}
      <section className="pt-28 sm:pt-36 pb-12 sm:pb-16 border-b border-text/8">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          {/* Breadcrumb & Meta badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-primary text-white border border-primary-light/40">
              {project.category_label}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface text-text/80 border border-text/8">
              {project.year}
            </span>
            {project.highlight_metric && (
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary-dark border border-primary/20">
                {project.highlight_metric}
              </span>
            )}
          </div>

          {/* Title & Elevator Pitch */}
          <div className="max-w-4xl space-y-4">
            <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold italic text-text tracking-tight leading-[1.05]">
              {project.title}
            </h1>
            <p className="text-base sm:text-xl text-text-muted leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Action CTAs */}
          <div className="mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text text-bg text-sm font-semibold hover:bg-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
              >
                Kunjungi Aplikasi / Demo
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
            )}

            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-text/15 text-text text-sm font-semibold hover:bg-surface hover:border-text transition-all duration-300"
              >
                <svg
                  className="w-4 h-4 text-text-muted"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 18l6-6-6-6" />
                  <path d="M8 6l-6 6 6 6" />
                </svg>
                Source Code
              </a>
            )}
          </div>

          {/* Quick Specs Grid */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-text/8">
            <div className="p-4 rounded-2xl bg-surface/50 border border-text/6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                Peran Utama
              </span>
              <p className="font-semibold text-sm sm:text-base text-text">
                {project.role}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface/50 border border-text/6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                Kategori
              </span>
              <p className="font-semibold text-sm sm:text-base text-text">
                {project.category_label}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface/50 border border-text/6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                Periode
              </span>
              <p className="font-semibold text-sm sm:text-base text-text">
                {project.year}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-surface/50 border border-text/6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block mb-1">
                Status Rilis
              </span>
              <p className="font-semibold text-sm sm:text-base text-primary-dark">
                {project.demo ? "Live / Published" : "Production Tested"}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Cover Showcase (hanya tampil jika proyek memiliki cover gambar asli) */}
      {project.image && (
        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <div className="relative rounded-3xl sm:rounded-4xl overflow-hidden bg-dark aspect-[16/9] shadow-2xl border border-text/10">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 100vw, 1200px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </section>
      )}

      {/* 4. Deep Dive Narrative & Key Engineering Highlights */}
      <section className="py-12 sm:py-20 border-t border-text/8">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left: Overview Story */}
            <div className="lg:col-span-5 space-y-4">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-text-muted">
                System Context
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold italic text-text leading-tight">
                Latar Belakang &amp; Solusi Rekayasa
              </h2>
              <div className="text-sm sm:text-base text-text-muted leading-relaxed space-y-4 pt-2">
                <p className="whitespace-pre-line leading-relaxed">
                  {project.long_description}
                </p>
              </div>
            </div>

            {/* Right: Structured Engineering Highlights */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-semibold tracking-[0.25em] uppercase text-text-muted block">
                Engineering Highlights
              </span>

              {project.highlights && project.highlights.length > 0 ? (
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.highlights.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-5 sm:p-6 rounded-3xl bg-white border border-text/8 shadow-xs hover:border-primary/30 transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="w-7 h-7 rounded-full bg-primary/10 text-primary-dark font-mono font-bold text-xs flex items-center justify-center">
                            0{idx + 1}
                          </span>
                        </div>
                        <h3 className="font-heading text-lg font-bold italic text-text mb-2">
                          {item.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-text-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-6 rounded-3xl bg-surface/50 border border-text/8 text-sm text-text-muted">
                  Detail implementasi dikembangkan sesuai standar enterprise dan
                  telah diuji di lingkungan produksi.
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Technology Matrix Grid */}
      <section className="py-12 sm:py-20 bg-surface/40 border-y border-text/8">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 space-y-8">
          <div>
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-text-muted">
              Tech Specs
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold italic text-text mt-1">
              Teknologi &amp; Spesifikasi Fungsional
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {techEntries.map((tech, idx) => (
              <div
                key={`${tech.name}-${idx}`}
                className="p-4 sm:p-5 rounded-2xl bg-white border border-text/8 flex items-start justify-between gap-3 shadow-xs"
              >
                <div>
                  <h3 className="font-bold text-sm sm:text-base text-text">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-text-muted mt-1 leading-relaxed">
                    {tech.usage || "Komponen arsitektur sistem"}
                  </p>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-surface text-text-light shrink-0">
                  SPEC
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Gallery Section (Lightbox) */}
      {galleryImages.length > 0 && (
        <section className="py-12 sm:py-20">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-text-muted block mb-2">
              Visual Preview
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold italic text-text mb-8">
              Tangkapan Layar &amp; Antarmuka
            </h2>
            <ImageGallery
              images={galleryImages}
              projectTitle={project.title}
            />
          </div>
        </section>
      )}

      {/* 7. Next / Prev Project Navigation (Endless Browsing) */}
      <section className="py-16 sm:py-24 border-t border-text/8 bg-surface/30">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Prev Link */}
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group w-full sm:w-1/2 p-6 rounded-3xl bg-white border border-text/8 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-full bg-surface group-hover:bg-primary group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block">
                  Proyek Sebelumnya
                </span>
                <p className="font-heading text-lg font-bold italic text-text truncate group-hover:text-primary transition-colors">
                  {prevProject.title}
                </p>
              </div>
            </Link>

            {/* Next Link */}
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group w-full sm:w-1/2 p-6 rounded-3xl bg-white border border-text/8 hover:border-primary/40 hover:shadow-md transition-all duration-300 flex items-center justify-end text-right gap-4"
            >
              <div className="min-w-0">
                <span className="text-[11px] font-mono uppercase tracking-wider text-text-muted block">
                  Proyek Berikutnya
                </span>
                <p className="font-heading text-lg font-bold italic text-text truncate group-hover:text-primary transition-colors">
                  {nextProject.title}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-surface group-hover:bg-primary group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                <svg
                  className="w-4 h-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </Link>
          </div>

          {/* Centered Return to Home */}
          <div className="mt-12 text-center">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-text/15 text-xs sm:text-sm font-semibold text-text hover:bg-white hover:border-text transition-all duration-300"
            >
              Lihat Seluruh Koleksi Portofolio
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

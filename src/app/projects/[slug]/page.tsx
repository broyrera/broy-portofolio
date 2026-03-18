"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { parseTechEntries } from "@/lib/projectTech";

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  long_description: string;
  image: string;
  screenshots: string[];
  tech: string[];
  role: string;
  year: string;
  link?: string;
  demo?: string;
  published: boolean;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const techEntries = parseTechEntries(project?.tech);

  useEffect(() => {
    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (!error && data) {
        setProject(data);
      }
      setLoading(false);
    };

    if (slug) {
      fetchProject();
    }
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-bg flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-text/30"></div>
      </main>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-bg">
      {/* Top Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-bg/70 backdrop-blur-2xl">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 py-5 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-sm text-text-muted hover:text-text transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Kembali
          </Link>
          <span className="text-2xl font-black tracking-tighter text-text">
            b<span className="text-primary">.</span>
          </span>
        </div>
      </nav>

      {/* Hero Image */}
      <section className="pt-24 pb-0">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="relative rounded-4xl overflow-hidden bg-dark aspect-[16/8] sm:aspect-[16/7]">
            <Image
              src={project.image || "/globe.svg"}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent" />
            <div className="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 right-6 sm:right-10">
              <div className="flex flex-wrap gap-2 mb-4">
                {techEntries.map((entry) => (
                  <span
                    key={entry.name}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 backdrop-blur text-white/80 border border-white/10"
                  >
                    {entry.name}
                  </span>
                ))}
              </div>
              <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl font-bold italic text-white">
                {project.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-6 sm:px-10">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
            {/* Main Description */}
            <div className="lg:col-span-2">
              <p className="text-xs font-semibold tracking-[0.3em] uppercase text-text-muted mb-6">
                — Overview
              </p>
              <p className="text-lg sm:text-xl text-text leading-relaxed mb-8">
                {project.long_description}
              </p>

              {/* External Links */}
              <div className="flex flex-wrap gap-3">
                {project.link && (
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-text text-bg text-sm font-semibold hover:bg-primary transition-colors"
                  >
                    Source Code
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
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-text/15 text-text text-sm font-semibold hover:border-primary hover:text-primary transition-colors"
                  >
                    Live Demo
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
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-8">
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-text-muted mb-2">
                  Role
                </p>
                <p className="text-base font-medium text-text">{project.role}</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-text-muted mb-2">
                  Year
                </p>
                <p className="text-base font-medium text-text">{project.year}</p>
              </div>
              <div>
                <p className="text-xs font-semibold tracking-[0.3em] uppercase text-text-muted mb-2">
                  Tech Stack
                </p>
                {techEntries.length > 0 && (
                  <div className="overflow-hidden rounded-xl border border-text/10 bg-surface">
                    <table className="w-full text-sm">
                      <thead className="bg-bg/60 border-b border-text/10">
                        <tr>
                          <th className="text-left px-3 py-2 text-xs font-semibold tracking-wide uppercase text-text-muted">
                            Tech
                          </th>
                          <th className="text-left px-3 py-2 text-xs font-semibold tracking-wide uppercase text-text-muted">
                            Penggunaan
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {techEntries.map((entry, index) => (
                          <tr
                            key={`${entry.name}-${index}`}
                            className="border-b border-text/5 last:border-b-0"
                          >
                            <td className="px-3 py-2 font-medium text-text">{entry.name}</td>
                            <td className="px-3 py-2 text-text-muted">
                              {entry.usage || "-"}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshots Gallery */}
      {project.screenshots && project.screenshots.length > 0 && (
        <section className="pb-24 sm:pb-32">
          <div className="mx-auto max-w-7xl px-6 sm:px-10">
            <p className="text-xs font-semibold tracking-[0.3em] uppercase text-text-muted mb-8">
              — Screenshots
            </p>
            <div className="grid sm:grid-cols-2 gap-6">
              {project.screenshots.map((src: string, i: number) => (
                <div
                  key={i}
                  className="relative rounded-3xl overflow-hidden bg-surface aspect-[16/10] border border-text/5"
                >
                  <Image
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Back CTA */}
      <section className="pb-16">
        <div className="mx-auto max-w-7xl px-6 sm:px-10 text-center">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-text/15 text-text-muted text-sm font-medium hover:border-text hover:text-text transition-colors"
          >
            <svg
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Lihat semua project
          </Link>
        </div>
      </section>
    </main>
  );
}

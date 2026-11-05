"use client";

import { useState } from "react";
import aboutData from "@/data/about.json";
import ScrollReveal from "./ScrollReveal";
import type {
  Skill,
  Experience,
  Honor,
  Certification,
  AboutData,
} from "@/types/portfolio";

const data = aboutData as unknown as AboutData;
const skills = data.skills as Skill[];
const experiences = data.experiences as Experience[];
const honors = (data.honors || []) as Honor[];
const certifications = (data.certifications || []) as Certification[];

function renderHighlightedText(text: string) {
  const parts = text.split(/(\*\*.*?\*\*)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const content = part.slice(2, -2);
      return (
        <span
          key={index}
          className="font-semibold text-text bg-primary/8 px-1.5 py-0.5 rounded-md border border-primary/15 inline-block"
        >
          {content}
        </span>
      );
    }
    return <span key={index}>{part}</span>;
  });
}

export default function AboutSection() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [expandedSkills, setExpandedSkills] = useState<Record<string, boolean>>(
    {}
  );

  const toggleSkillExpand = (id: string) => {
    setExpandedSkills((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const skillCategories = [
    { id: "all", label: "Semua Stack" },
    { id: "backend", label: "Backend & Systems" },
    { id: "database", label: "Database & Storage" },
    { id: "mobile", label: "Mobile Engineering" },
    { id: "devops", label: "DevOps & Cloud" },
    { id: "workflow", label: "Automation & AI" },
  ];

  const filteredSkills =
    activeCategory === "all"
      ? skills
      : skills.filter((s) => s.category === activeCategory);

  return (
    <>
      {/* Scrolling Text Divider */}
      <div className="py-5 overflow-hidden border-y border-text/8 group cursor-default bg-surface/40">
        <div className="flex whitespace-nowrap animate-marquee">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="text-4xl sm:text-5xl font-black tracking-tight lowercase text-text/[0.06] mx-6 group-hover:text-primary/[0.12] transition-colors duration-700"
            >
              engineering · backend · scalability · mobile · release ·&nbsp;
            </span>
          ))}
        </div>
      </div>

      <section id="about" className="relative py-20 sm:py-28 overflow-hidden">
        {/* Ambient background glow */}
        <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-gradient-to-br from-primary/5 to-accent/5 blur-3xl animate-float pointer-events-none" />

        <div className="mx-auto max-w-7xl px-6 sm:px-10 relative z-10 space-y-24 sm:space-y-32">
          {/* 1. Bio & Overview */}
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-5 space-y-4">
              <ScrollReveal>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-text-muted">
                  Profil & Rekayasa
                </p>
                <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-bold italic text-text leading-[1.1] mt-2">
                  {data.bio_headline}
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={150}>
                <div className="pt-4 flex flex-wrap gap-3">
                  <a
                    href="mailto:royazizbarera@gmail.com"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-text text-bg text-xs sm:text-sm font-semibold hover:bg-primary transition-all duration-300"
                  >
                    Hubungi via Email
                    <svg
                      className="w-3.5 h-3.5"
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
                  <a
                    href="/cv-roy-aziz-barera.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-text/15 text-text text-xs sm:text-sm font-semibold hover:bg-surface transition-all duration-300"
                  >
                    <svg
                      className="w-3.5 h-3.5 text-primary"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                    Preview CV (PDF)
                  </a>
                </div>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-text-muted leading-relaxed">
              {data.bio_description.map((paragraph, index) => (
                <ScrollReveal key={index} delay={index * 100}>
                  <p>{paragraph}</p>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* 2. Skills & Actual Implementation Deeds */}
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <ScrollReveal>
                <p className="text-xs font-semibold tracking-[0.25em] uppercase text-text-muted">
                  Stack in Practice
                </p>
                <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold italic text-text mt-1">
                  Keterampilan Teknis &amp; Rekam Implementasi
                </h3>
                <p className="text-xs sm:text-sm text-text-muted max-w-xl mt-2">
                  Highlight implementasi nyata yang telah dirilis dan beroperasi,
                  dilengkapi keyword teknis utama.
                </p>
              </ScrollReveal>

              {/* Filter pills */}
              <ScrollReveal delay={100}>
                <div className="flex flex-wrap gap-2">
                  {skillCategories.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setActiveCategory(c.id)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                        activeCategory === c.id
                          ? "bg-text text-bg shadow-xs"
                          : "bg-surface border border-text/8 text-text-muted hover:text-text hover:bg-surface-dark"
                      }`}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Detailed Skills Cards */}
            <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
              {filteredSkills.map((skill, index) => {
                const isExpanded = Boolean(expandedSkills[skill.id]);
                const displayedHighlights = isExpanded
                  ? skill.highlights
                  : skill.highlights.slice(0, 2);

                return (
                  <ScrollReveal key={skill.id} delay={index * 60}>
                    <div className="h-full rounded-3xl p-6 sm:p-7 bg-white/70 backdrop-blur-xs border border-text/8 hover:border-primary/30 transition-all duration-300 shadow-xs flex flex-col justify-between">
                      <div>
                        {/* Top Meta */}
                        <div className="flex items-center justify-between gap-3 mb-3">
                          <span className="text-xs font-semibold tracking-wider uppercase px-2.5 py-1 rounded-md bg-surface text-primary-dark border border-text/5">
                            {skill.category_label}
                          </span>
                          <span className="text-[11px] font-mono font-bold text-text-light px-2 py-0.5 rounded bg-text/5">
                            {skill.tag.toUpperCase()}
                          </span>
                        </div>

                        {/* Skill Name & Summary */}
                        <h4 className="font-heading text-xl sm:text-2xl font-bold italic text-text mb-1.5">
                          {skill.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-text-muted mb-4 leading-relaxed">
                          {skill.description}
                        </p>

                        {/* Attached Prototypes & Implementations */}
                        {skill.projects && skill.projects.length > 0 && (
                          <div className="mb-5 flex flex-wrap gap-1.5">
                            {skill.projects.map((proj, pIdx) => (
                              <span
                                key={pIdx}
                                className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-surface text-text/80 border border-text/8"
                              >
                                {proj}
                              </span>
                            ))}
                          </div>
                        )}

                        {/* Deeds / Highlights list */}
                        <div className="border-t border-text/6 pt-4">
                          <p className="text-[11px] font-semibold uppercase tracking-wider text-text-muted mb-3">
                            Implementasi Terverifikasi:
                          </p>
                          <ul className="space-y-2.5">
                            {displayedHighlights.map((h, hIdx) => (
                              <li
                                key={hIdx}
                                className="text-xs sm:text-sm text-text/85 flex items-start gap-2.5 leading-relaxed"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                                <div>{renderHighlightedText(h)}</div>
                              </li>
                            ))}
                          </ul>

                          {/* Toggle Expand / Collapse */}
                          {skill.highlights.length > 2 && (
                            <button
                              onClick={() => toggleSkillExpand(skill.id)}
                              className="mt-3.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                            >
                              {isExpanded ? (
                                <>
                                  <span>Tutup detail</span>
                                  <svg
                                    className="w-3.5 h-3.5 rotate-180 transition-transform"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                  >
                                    <path d="m6 9 6 6 6-6" />
                                  </svg>
                                </>
                              ) : (
                                <>
                                  <span>
                                    +{skill.highlights.length - 2} poin
                                    implementasi lainnya
                                  </span>
                                  <svg
                                    className="w-3.5 h-3.5 transition-transform"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                  >
                                    <path d="m6 9 6 6 6-6" />
                                  </svg>
                                </>
                              )}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

          {/* 3. Experiences Timeline */}
          <div className="space-y-8">
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-text-muted">
                Career Track
              </p>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold italic text-text mt-1">
                Pengalaman Kerja &amp; Kepemimpinan
              </h3>
            </ScrollReveal>

            <div className="space-y-4">
              {experiences.map((exp, idx) => (
                <ScrollReveal key={exp.id} delay={idx * 100}>
                  <div className="rounded-3xl p-6 sm:p-8 bg-surface/60 border border-text/8 hover:bg-white/80 hover:border-primary/20 transition-all duration-300">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-4">
                      <div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-primary font-mono">
                            {exp.num}
                          </span>
                          <h4 className="font-heading text-xl sm:text-2xl font-bold italic text-text">
                            {exp.role}
                          </h4>
                        </div>
                        <p className="text-sm font-medium text-text-muted mt-1">
                          {exp.company}{" "}
                          {exp.location && (
                            <span className="text-text-light font-normal">
                              · {exp.location}
                            </span>
                          )}
                        </p>
                      </div>
                      <span className="inline-block self-start px-3 py-1 rounded-full text-xs font-medium bg-text/5 text-text-muted border border-text/10">
                        {exp.period}
                      </span>
                    </div>

                    {/* Highlights bullets */}
                    {exp.highlights && exp.highlights.length > 0 && (
                      <ul className="space-y-2 mt-4 text-xs sm:text-sm text-text/80 leading-relaxed max-w-4xl">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary-dark mt-1.5 shrink-0" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    {/* Tech stack tags */}
                    {exp.tech && exp.tech.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2 pt-4 border-t border-text/6">
                        {exp.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/70 border border-text/8 text-text-muted"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* 4. Honors & Certifications */}
          <div className="space-y-8">
            <ScrollReveal>
              <p className="text-xs font-semibold tracking-[0.25em] uppercase text-text-muted">
                Validation &amp; Social Proof
              </p>
              <h3 className="font-heading text-2xl sm:text-3xl md:text-4xl font-bold italic text-text mt-1">
                Pencapaian Nasional &amp; Sertifikasi
              </h3>
            </ScrollReveal>

            {/* Honors Grid */}
            <div className="grid md:grid-cols-3 gap-5">
              {honors.map((item, idx) => (
                <ScrollReveal key={item.id} delay={idx * 80}>
                  <div className="h-full rounded-3xl p-6 bg-white/80 border border-text/8 hover:border-primary/30 transition-all duration-300 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="px-2.5 py-1 rounded-md text-xs font-semibold bg-primary/10 text-primary-dark border border-primary/20">
                          {item.badge}
                        </span>
                        <span className="text-xs font-mono text-text-light">
                          {item.year}
                        </span>
                      </div>
                      <h4 className="font-heading text-lg font-bold italic text-text mb-2">
                        {item.title}
                      </h4>
                      <p className="text-xs text-text-muted mb-4 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                    <p className="text-[11px] font-medium text-text-light border-t border-text/6 pt-3">
                      Penyelenggara: {item.issuer}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Certifications row */}
            <div className="grid sm:grid-cols-2 gap-5 pt-2">
              {certifications.map((cert, idx) => (
                <ScrollReveal key={cert.id} delay={idx * 100}>
                  <div className="rounded-2xl p-5 bg-surface/50 border border-text/8 flex items-start gap-4">
                    <div className="w-9 h-9 rounded-xl bg-text text-bg flex items-center justify-center shrink-0 font-bold text-xs">
                      CERT
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-text">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-text-muted mt-0.5">
                        {cert.issuer} · {cert.period}
                      </p>
                      <p className="text-xs text-text-muted/80 mt-1.5 leading-relaxed">
                        {cert.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

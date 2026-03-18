"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

interface Stats {
  projects: number;
  experiences: number;
  skills: number;
  guestbook: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    projects: 0,
    experiences: 0,
    skills: 0,
    guestbook: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const [projects, experiences, skills, guestbook] = await Promise.all([
        supabase.from("projects").select("id", { count: "exact", head: true }),
        supabase.from("experiences").select("id", { count: "exact", head: true }),
        supabase.from("skills").select("id", { count: "exact", head: true }),
        supabase.from("guestbook").select("id", { count: "exact", head: true }),
      ]);

      setStats({
        projects: projects.count || 0,
        experiences: experiences.count || 0,
        skills: skills.count || 0,
        guestbook: guestbook.count || 0,
      });
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      label: "Projects",
      value: stats.projects,
      href: "/admin/projects",
      accent: "from-[#942345] to-[#751833]",
    },
    {
      label: "Experiences",
      value: stats.experiences,
      href: "/admin/experiences",
      accent: "from-[#0b5951] to-[#0a3f3a]",
    },
    {
      label: "Skills",
      value: stats.skills,
      href: "/admin/skills",
      accent: "from-[#5f3f9c] to-[#402a6f]",
    },
    {
      label: "Guestbook",
      value: stats.guestbook,
      href: "/admin/guestbook",
      accent: "from-[#a8681d] to-[#7a4c13]",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] admin-subtle mb-2">Admin Panel</p>
          <h1 className="admin-title text-3xl sm:text-4xl font-semibold text-text">Dashboard Overview</h1>
          <p className="admin-subtle mt-2">Kelola portfolio dengan panel yang rapi dan terstruktur.</p>
        </div>
        <Link
          href="/admin/projects/new"
          className="admin-btn-primary px-4 py-2.5 rounded-xl text-sm font-medium"
        >
          + New Project
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          {statCards.map((card) => (
            <Link
              key={card.label}
              href={card.href}
              className="admin-card rounded-2xl p-5 hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-text/65">{card.label}</p>
                  <p className="text-4xl font-black text-text mt-1 tracking-tight">{card.value}</p>
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.accent} flex items-center justify-center shadow-lg`}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </div>
              </div>
              <p className="text-xs admin-subtle mt-4">Open module</p>
            </Link>
          ))}
        </div>
      )}

      <div className="admin-card rounded-3xl p-6">
        <h2 className="admin-title text-2xl font-semibold text-text mb-1">Quick Actions</h2>
        <p className="admin-subtle text-sm mb-5">Akses cepat untuk update konten utama.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Link
            href="/admin/projects/new"
            className="admin-card-soft flex items-center gap-3 p-4 rounded-2xl hover:border-primary/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-text">Add Project</p>
              <p className="text-sm admin-subtle">Tambah project baru</p>
            </div>
          </Link>

          <Link
            href="/admin/experiences/new"
            className="admin-card-soft flex items-center gap-3 p-4 rounded-2xl hover:border-primary/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-accent/20 text-[#7a4c13] flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-text">Add Experience</p>
              <p className="text-sm admin-subtle">Tambah pengalaman kerja</p>
            </div>
          </Link>

          <Link
            href="/admin/skills/new"
            className="admin-card-soft flex items-center gap-3 p-4 rounded-2xl hover:border-primary/30 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-black/10 text-text flex items-center justify-center">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div>
              <p className="font-medium text-text">Add Skill</p>
              <p className="text-sm admin-subtle">Tambah skill baru</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

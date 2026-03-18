"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Skill {
  id: string;
  name: string;
  tag: string;
  created_at: string;
}

export default function SkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      const { data, error } = await supabase
        .from("skills")
        .select("*")
        .order("name", { ascending: true });

      if (!error && data) {
        setSkills(data);
      }
      setLoading(false);
    };

    fetchSkills();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus skill ini?")) return;

    const { error } = await supabase.from("skills").delete().eq("id", id);

    if (!error) {
      setSkills(skills.filter((s) => s.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] admin-subtle mb-2">Capabilities</p>
          <h1 className="admin-title text-3xl font-semibold text-text">Skills</h1>
          <p className="admin-subtle mt-1">Kelola daftar skill utama untuk portfolio.</p>
        </div>
        <Link
          href="/admin/skills/new"
          className="admin-btn-primary px-4 py-2.5 text-sm font-medium rounded-xl"
        >
          + Add Skill
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : skills.length === 0 ? (
        <div className="admin-card rounded-2xl p-12 text-center">
          <p className="admin-subtle mb-4">Belum ada skill</p>
          <Link href="/admin/skills/new" className="text-primary hover:underline">
            Tambah skill pertama →
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {skills.map((skill) => (
            <div
              key={skill.id}
              className="admin-card rounded-2xl p-4 flex items-center justify-between hover:-translate-y-0.5 transition-transform"
            >
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 rounded-md admin-pill text-xs font-bold">
                  {skill.tag}
                </span>
                <span className="font-medium text-text">{skill.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <Link
                  href={`/admin/skills/${skill.id}`}
                  className="p-2 text-text/45 hover:text-text rounded-lg hover:bg-black/5 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                </Link>
                <button
                  onClick={() => handleDelete(skill.id)}
                  className="p-2 text-text/45 hover:text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

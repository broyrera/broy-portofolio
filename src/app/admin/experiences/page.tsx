"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Experience {
  id: string;
  num: string;
  role: string;
  company: string;
  period: string;
  created_at: string;
}

export default function ExperiencesPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      const { data, error } = await supabase
        .from("experiences")
        .select("*")
        .order("num", { ascending: true });

      if (!error && data) {
        setExperiences(data);
      }
      setLoading(false);
    };

    fetchExperiences();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus pengalaman ini?")) return;

    const { error } = await supabase.from("experiences").delete().eq("id", id);

    if (!error) {
      setExperiences(experiences.filter((e) => e.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] admin-subtle mb-2">Career</p>
          <h1 className="admin-title text-3xl font-semibold text-text">Experiences</h1>
          <p className="admin-subtle mt-1">Kelola perjalanan karier dan pengalaman profesional.</p>
        </div>
        <Link
          href="/admin/experiences/new"
          className="admin-btn-primary px-4 py-2.5 text-sm font-medium rounded-xl"
        >
          + Add Experience
        </Link>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : experiences.length === 0 ? (
        <div className="admin-card rounded-2xl p-12 text-center">
          <p className="admin-subtle mb-4">Belum ada pengalaman</p>
          <Link
            href="/admin/experiences/new"
            className="text-primary hover:underline"
          >
            Tambah pengalaman pertama →
          </Link>
        </div>
      ) : (
        <div className="admin-card rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-black/[0.03] border-b border-black/10">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text/55 uppercase tracking-wider">
                  #
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text/55 uppercase tracking-wider">
                  Role
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text/55 uppercase tracking-wider">
                  Company
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text/55 uppercase tracking-wider">
                  Period
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-text/55 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {experiences.map((exp) => (
                <tr key={exp.id} className="hover:bg-black/[0.02]">
                  <td className="px-6 py-4 text-sm text-text/55">{exp.num}</td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-text">{exp.role}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-text/75">
                    {exp.company}
                  </td>
                  <td className="px-6 py-4 text-sm text-text/75">
                    {exp.period}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/experiences/${exp.id}`}
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
                        onClick={() => handleDelete(exp.id)}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

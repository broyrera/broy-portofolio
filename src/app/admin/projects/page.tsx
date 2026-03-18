"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface Project {
  id: string;
  slug: string;
  title: string;
  description: string;
  year: string;
  published: boolean;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setProjects(data);
      }
      setLoading(false);
    };

    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Yakin ingin menghapus project ini?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (!error) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  const handleTogglePublish = async (project: Project) => {
    const { error } = await supabase
      .from("projects")
      .update({ published: !project.published })
      .eq("id", project.id);

    if (!error) {
      setProjects(
        projects.map((p) =>
          p.id === project.id ? { ...p, published: !p.published } : p
        )
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between mb-2">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] admin-subtle mb-2">Content</p>
          <h1 className="admin-title text-3xl font-semibold text-text">Projects</h1>
          <p className="admin-subtle mt-1">Kelola project portfolio dan status publish.</p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/admin/tech"
            className="admin-btn-secondary px-4 py-2.5 text-sm font-medium rounded-xl"
          >
            Manage Tech
          </Link>
          <Link
            href="/admin/projects/new"
            className="admin-btn-primary px-4 py-2.5 text-sm font-medium rounded-xl"
          >
            + Add Project
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      ) : projects.length === 0 ? (
        <div className="admin-card rounded-2xl p-12 text-center">
          <p className="admin-subtle mb-4">Belum ada project</p>
          <Link
            href="/admin/projects/new"
            className="text-primary hover:underline"
          >
            Tambah project pertama →
          </Link>
        </div>
      ) : (
        <div className="admin-card rounded-2xl overflow-hidden">
          <table className="w-full">
            <thead className="bg-black/[0.03] border-b border-black/10">
              <tr>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text/55 uppercase tracking-wider">
                  Project
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text/55 uppercase tracking-wider">
                  Year
                </th>
                <th className="text-left px-6 py-4 text-xs font-semibold text-text/55 uppercase tracking-wider">
                  Status
                </th>
                <th className="text-right px-6 py-4 text-xs font-semibold text-text/55 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5">
              {projects.map((project) => (
                <tr key={project.id} className="hover:bg-black/[0.02]">
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-medium text-text">
                        {project.title}
                      </p>
                      <p className="text-sm admin-subtle mt-0.5">
                        {project.slug}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-text/75">
                    {project.year}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleTogglePublish(project)}
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                        project.published
                          ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                          : "bg-black/10 text-text/65 hover:bg-black/15"
                      }`}
                    >
                      {project.published ? "Published" : "Draft"}
                    </button>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link
                        href={`/admin/projects/${project.id}`}
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
                        onClick={() => handleDelete(project.id)}
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

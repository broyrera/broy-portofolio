"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Project {
  id?: string;
  slug: string;
  title: string;
  description: string;
  long_description: string;
  image: string;
  screenshots: string;
  tech: string;
  role: string;
  year: string;
  link: string;
  demo: string;
  published: boolean;
}

const initialProject: Project = {
  slug: "",
  title: "",
  description: "",
  long_description: "",
  image: "",
  screenshots: "",
  tech: "",
  role: "",
  year: "",
  link: "",
  demo: "",
  published: false,
};

export default function ProjectFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const [project, setProject] = useState<Project>(initialProject);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      const fetchProject = async () => {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          setProject({
            ...data,
            screenshots: data.screenshots?.join("\n") || "",
            tech: data.tech?.join(", ") || "",
          });
        }
        setLoading(false);
      };

      fetchProject();
    }
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    const projectData = {
      slug: project.slug.toLowerCase().replace(/\s+/g, "-"),
      title: project.title,
      description: project.description,
      long_description: project.long_description,
      image: project.image,
      screenshots: project.screenshots
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      tech: project.tech.split(",").map((t) => t.trim()).filter(Boolean),
      role: project.role,
      year: project.year,
      link: project.link || null,
      demo: project.demo || null,
      published: project.published,
    };

    let result;

    if (isNew) {
      result = await supabase.from("projects").insert([projectData]);
    } else {
      result = await supabase
        .from("projects")
        .update(projectData)
        .eq("id", id);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/projects");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {isNew ? "Add Project" : "Edit Project"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isNew ? "Tambah project baru" : "Edit project yang ada"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
          <h2 className="font-semibold text-gray-900 mb-4">Basic Info</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                type="text"
                required
                value={project.title}
                onChange={(e) => setProject({ ...project, title: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Project Title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Slug *
              </label>
              <input
                type="text"
                required
                value={project.slug}
                onChange={(e) => setProject({ ...project, slug: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="project-slug"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={project.description}
              onChange={(e) =>
                setProject({ ...project, description: e.target.value })
              }
              rows={2}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Short description for card"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Long Description
            </label>
            <textarea
              value={project.long_description}
              onChange={(e) =>
                setProject({ ...project, long_description: e.target.value })
              }
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Full description for project page"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <input
                type="text"
                value={project.role}
                onChange={(e) => setProject({ ...project, role: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Full-Stack Developer"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Year
              </label>
              <input
                type="text"
                value={project.year}
                onChange={(e) => setProject({ ...project, year: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="2024"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Published
              </label>
              <button
                type="button"
                onClick={() => setProject({ ...project, published: !project.published })}
                className={`w-full px-4 py-2.5 rounded-lg border transition-colors ${
                  project.published
                    ? "bg-green-50 border-green-300 text-green-700"
                    : "bg-gray-50 border-gray-300 text-gray-600"
                }`}
              >
                {project.published ? "✓ Published" : "Draft"}
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
          <h2 className="font-semibold text-gray-900 mb-4">Media & Links</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Image URL
            </label>
            <input
              type="text"
              value={project.image}
              onChange={(e) => setProject({ ...project, image: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="/images/project-name.png"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Screenshots (one per line)
            </label>
            <textarea
              value={project.screenshots}
              onChange={(e) =>
                setProject({ ...project, screenshots: e.target.value })
              }
              rows={3}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="/images/screenshot1.png&#10;/images/screenshot2.png"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tech Stack (comma separated)
              </label>
              <input
                type="text"
                value={project.tech}
                onChange={(e) => setProject({ ...project, tech: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="React, Node.js, PostgreSQL"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Project Link
              </label>
              <input
                type="text"
                value={project.link}
                onChange={(e) => setProject({ ...project, link: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="https://github.com/..."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Demo Link
            </label>
            <input
              type="text"
              value={project.demo}
              onChange={(e) => setProject({ ...project, demo: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="https://demo.example.com"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : isNew ? "Create Project" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

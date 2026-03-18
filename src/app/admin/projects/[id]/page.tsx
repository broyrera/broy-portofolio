"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
import { supabase } from "@/lib/supabase";
import { compressAndUploadImage, fileToDataUrl } from "@/lib/imageUpload";
import { parseTechEntries, serializeTechEntries, type TechEntry } from "@/lib/projectTech";

interface Project {
  id?: string;
  slug: string;
  title: string;
  description: string;
  long_description: string;
  image: string;
  screenshots: string[];
  tech: TechEntry[];
  role: string;
  year: string;
  link: string;
  demo: string;
  published: boolean;
  display_order?: number | null;
}

interface TechOption {
  id: string;
  name: string;
  description: string | null;
}

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const initialProject: Project = {
  slug: "",
  title: "",
  description: "",
  long_description: "",
  image: "",
  screenshots: [],
  tech: [],
  role: "",
  year: "",
  link: "",
  demo: "",
  published: false,
  display_order: null,
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
  
  // Image upload states
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const screenshotInputRef = useRef<HTMLInputElement>(null);
  const [screenshotFiles, setScreenshotFiles] = useState<File[]>([]);
  const [screenshotPreviews, setScreenshotPreviews] = useState<string[]>([]);
  const [techOptions, setTechOptions] = useState<TechOption[]>([]);
  const [techOptionsLoading, setTechOptionsLoading] = useState(true);
  const [selectedTechName, setSelectedTechName] = useState("");
  const [selectedTechUsage, setSelectedTechUsage] = useState("");
  const [newTechOptionName, setNewTechOptionName] = useState("");
  const [newTechOptionDescription, setNewTechOptionDescription] = useState("");
  const [savingTechOption, setSavingTechOption] = useState(false);
  const [isSlugManuallyEdited, setIsSlugManuallyEdited] = useState(false);

  const fetchTechOptions = useCallback(async () => {
    const { data, error: optionsError } = await supabase
      .from("project_tech_options")
      .select("id, name, description")
      .order("name", { ascending: true });

    if (optionsError) {
      setTechOptions([]);
      setError(
        "Master tech belum siap. Jalankan SQL tabel project_tech_options terlebih dahulu."
      );
      setTechOptionsLoading(false);
      return;
    }

    if (data) {
      setTechOptions(data);
      setSelectedTechName((prev) => prev || data[0]?.name || "");
    }

    setTechOptionsLoading(false);
  }, []);

  useEffect(() => {
    const loadPageData = async () => {
      await fetchTechOptions();

      if (!isNew) {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          setProject({
            id: data.id,
            slug: data.slug || "",
            title: data.title || "",
            description: data.description || "",
            long_description: data.long_description || "",
            image: data.image || "",
            screenshots: Array.isArray(data.screenshots) ? data.screenshots : [],
            tech: parseTechEntries(data.tech),
            role: data.role || "",
            year: data.year || "",
            link: data.link || "",
            demo: data.demo || "",
            published: Boolean(data.published),
          });
          setIsSlugManuallyEdited(Boolean(data.slug));
          setImagePreview(data.image || "");
        }
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    void loadPageData();
  }, [fetchTechOptions, id, isNew]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    // Validate file size (max 10MB before compression)
    if (file.size > 10 * 1024 * 1024) {
      setError("Image must be less than 10MB");
      return;
    }

    setError("");
    setImageFile(file);
    
    // Create preview
    const preview = await fileToDataUrl(file);
    setImagePreview(preview);
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview("");
    setProject({ ...project, image: "" });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleScreenshotChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    const invalidType = files.some((file) => !file.type.startsWith("image/"));
    if (invalidType) {
      setError("Semua screenshot harus berupa file gambar.");
      return;
    }

    const tooLarge = files.some((file) => file.size > 10 * 1024 * 1024);
    if (tooLarge) {
      setError("Ukuran screenshot maksimal 10MB per file.");
      return;
    }

    setError("");
    const previews = await Promise.all(files.map((file) => fileToDataUrl(file)));
    setScreenshotFiles((prev) => [...prev, ...files]);
    setScreenshotPreviews((prev) => [...prev, ...previews]);

    if (screenshotInputRef.current) {
      screenshotInputRef.current.value = "";
    }
  };

  const removeExistingScreenshot = (index: number) => {
    setProject((prev) => ({
      ...prev,
      screenshots: prev.screenshots.filter((_, i) => i !== index),
    }));
  };

  const removeNewScreenshot = (index: number) => {
    setScreenshotFiles((prev) => prev.filter((_, i) => i !== index));
    setScreenshotPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const addTechRow = () => {
    const name = selectedTechName.trim();
    const selectedOption = techOptions.find((option) => option.name === name);
    const usage = selectedTechUsage.trim() || selectedOption?.description?.trim() || "";

    if (!name) {
      return;
    }

    const alreadyExists = project.tech.some(
      (entry) => entry.name.toLowerCase() === name.toLowerCase()
    );
    if (alreadyExists) {
      setSelectedTechUsage("");
      return;
    }

    setProject((prev) => ({
      ...prev,
      tech: [...prev.tech, { name, usage }],
    }));

    setSelectedTechUsage("");
  };

  const handleAddTechOption = async () => {
    const name = newTechOptionName.trim();
    const description = newTechOptionDescription.trim();
    if (!name) {
      return;
    }

    const existing = techOptions.find(
      (option) => option.name.toLowerCase() === name.toLowerCase()
    );
    if (existing) {
      setSelectedTechName(existing.name);
      if (!selectedTechUsage && existing.description) {
        setSelectedTechUsage(existing.description);
      }
      setNewTechOptionName("");
      setNewTechOptionDescription("");
      return;
    }

    setSavingTechOption(true);
    const { error: insertError } = await supabase
      .from("project_tech_options")
      .insert([{ name, description: description || null }]);

    setSavingTechOption(false);

    if (insertError) {
      setError(`Gagal menambah tech master: ${insertError.message}`);
      return;
    }

    await fetchTechOptions();
    setSelectedTechName(name);
    setSelectedTechUsage(description);
    setNewTechOptionName("");
    setNewTechOptionDescription("");
  };

  const updateTechRow = (index: number, key: keyof TechEntry, value: string) => {
    setProject((prev) => ({
      ...prev,
      tech: prev.tech.map((entry, i) =>
        i === index ? { ...entry, [key]: value } : entry
      ),
    }));
  };

  const removeTechRow = (index: number) => {
    setProject((prev) => ({
      ...prev,
      tech: prev.tech.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);
    setUploading(false);

    try {
      let imageUrl = project.image;
      let uploadedScreenshots: string[] = [];

      // Upload new image if selected
      if (imageFile) {
        setUploading(true);
        imageUrl = await compressAndUploadImage(imageFile, "images", "projects");
      }

      if (screenshotFiles.length > 0) {
        setUploading(true);
        uploadedScreenshots = await Promise.all(
          screenshotFiles.map((file) =>
            compressAndUploadImage(file, "images", "projects/screenshots")
          )
        );
      }

      setUploading(false);

      const projectData = {
        slug: slugify(project.slug || project.title),
        title: project.title,
        description: project.description,
        long_description: project.long_description,
        image: imageUrl,
        screenshots: [...project.screenshots, ...uploadedScreenshots],
        tech: serializeTechEntries(project.tech),
        role: project.role,
        year: project.year,
        link: project.link || null,
        demo: project.demo || null,
        published: project.published,
      };

      let result;

      if (isNew) {
        // Auto-place new project at the end of current order.
        let nextDisplayOrder: number | null = null;
        const maxOrderResult = await supabase
          .from("projects")
          .select("display_order")
          .order("display_order", { ascending: false, nullsFirst: false })
          .limit(1);

        if (!maxOrderResult.error && maxOrderResult.data && maxOrderResult.data.length > 0) {
          nextDisplayOrder = (maxOrderResult.data[0].display_order || 0) + 1;
        }

        const insertPayload =
          nextDisplayOrder !== null
            ? [{ ...projectData, display_order: nextDisplayOrder }]
            : [projectData];

        result = await supabase.from("projects").insert(insertPayload);
      } else {
        result = await supabase
          .from("projects")
          .update(projectData)
          .eq("id", id);
      }

      if (result.error) {
        throw new Error(result.error.message);
      }

      router.push("/admin/projects");
    } catch (err) {
      console.error("Submit error:", err);
      const message = err instanceof Error ? err.message : "Failed to save project. Please try again.";
      setError(message);
    } finally {
      setUploading(false);
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.2em] admin-subtle mb-2">Project Editor</p>
        <h1 className="admin-title text-3xl font-semibold text-text">
          {isNew ? "Add Project" : "Edit Project"}
        </h1>
        <p className="admin-subtle mt-1">
          {isNew ? "Tambah project baru" : "Edit project yang ada"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="admin-card rounded-2xl p-6 space-y-4">
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
                onChange={(e) => {
                  const nextTitle = e.target.value;
                  setProject((prev) => ({
                    ...prev,
                    title: nextTitle,
                    slug: isSlugManuallyEdited ? prev.slug : slugify(nextTitle),
                  }));
                }}
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
                onChange={(e) => {
                  setIsSlugManuallyEdited(true);
                  setProject({ ...project, slug: slugify(e.target.value) });
                }}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="project-slug"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSlugManuallyEdited(false);
                  setProject((prev) => ({ ...prev, slug: slugify(prev.title) }));
                }}
                className="mt-2 text-xs text-primary hover:underline"
              >
                Use title as slug
              </button>
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

        <div className="admin-card rounded-2xl p-6 space-y-4">
          <h2 className="font-semibold text-gray-900 mb-4">Media & Links</h2>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cover Image
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
            />
            
            <div className="mt-4 relative inline-block w-full max-w-xl">
              <div className="relative h-52 rounded-xl border border-black/10 overflow-hidden">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 640px"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#120d12] via-[#2a1520] to-[#3b1b2b]">
                    <div className="absolute -top-14 -right-14 w-56 h-56 rounded-full bg-[#d44a6e]/25 blur-3xl" />
                    <div className="absolute -bottom-12 -left-10 w-44 h-44 rounded-full bg-[#c9a96e]/25 blur-3xl" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center px-4">
                        <p className="text-sm font-semibold text-white/90">No Cover Uploaded</p>
                        <p className="text-xs text-white/60 mt-1">Placeholder ini akan tampil sampai kamu upload cover image.</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {imagePreview && (
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
            
            {uploading && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-900"></div>
                  Compressing and uploading image...
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Screenshots
            </label>
              <input
                ref={screenshotInputRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleScreenshotChange}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-gray-100 file:text-sm file:font-medium file:text-gray-700 hover:file:bg-gray-200"
              />
              <p className="mt-2 text-xs text-gray-500">
                Upload gambar screenshot langsung. Sistem akan otomatis kompres sebelum upload.
              </p>

              {(project.screenshots.length > 0 || screenshotPreviews.length > 0) && (
                <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                  {project.screenshots.map((src, index) => (
                    <div key={`existing-${src}-${index}`} className="relative">
                      <div className="relative w-full h-28 rounded-lg border border-gray-200 overflow-hidden">
                        <Image
                          src={src}
                          alt={`Existing screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeExistingScreenshot(index)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}

                  {screenshotPreviews.map((src, index) => (
                    <div key={`new-${index}`} className="relative">
                      <div className="relative w-full h-28 rounded-lg border border-gray-200 overflow-hidden">
                        <Image
                          src={src}
                          alt={`New screenshot ${index + 1}`}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      </div>
                      <span className="absolute left-2 top-2 px-2 py-0.5 text-[10px] font-medium bg-blue-600 text-white rounded-full">
                        New
                      </span>
                      <button
                        type="button"
                        onClick={() => removeNewScreenshot(index)}
                        className="absolute -top-2 -right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
          </div>

          <div className="admin-card-soft rounded-xl border border-black/10 p-4 sm:p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <h3 className="text-sm font-semibold text-gray-800">Tech Stack</h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Pilih dari tech master agar konsisten antar project.
                </p>
              </div>
              <a
                href="/admin/tech"
                className="text-xs font-medium text-gray-600 hover:text-gray-900 underline-offset-2 hover:underline"
              >
                Kelola Master Tech
              </a>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
              <div className="lg:col-span-4">
                <select
                  value={selectedTechName}
                  onChange={(e) => {
                    const nextName = e.target.value;
                    setSelectedTechName(nextName);

                    if (!selectedTechUsage.trim()) {
                      const option = techOptions.find((item) => item.name === nextName);
                      setSelectedTechUsage(option?.description || "");
                    }
                  }}
                  disabled={techOptionsLoading || techOptions.length === 0}
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:bg-gray-100"
                >
                  {techOptions.length === 0 && (
                    <option value="">
                      {techOptionsLoading ? "Loading tech..." : "Belum ada tech master"}
                    </option>
                  )}
                  {techOptions.map((option) => (
                    <option key={option.id} value={option.name}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>
              <input
                type="text"
                value={selectedTechUsage}
                onChange={(e) => setSelectedTechUsage(e.target.value)}
                className="lg:col-span-6 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Keterangan penggunaan (mis. sering digunakan)"
              />
              <button
                type="button"
                onClick={addTechRow}
                disabled={!selectedTechName}
                className="lg:col-span-2 px-3 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
              >
                Tambah
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-2">
              <input
                type="text"
                value={newTechOptionName}
                onChange={(e) => setNewTechOptionName(e.target.value)}
                className="lg:col-span-4 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Tambah tech baru ke master list"
              />
              <input
                type="text"
                value={newTechOptionDescription}
                onChange={(e) => setNewTechOptionDescription(e.target.value)}
                className="lg:col-span-5 px-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="Keterangan default (mis. sering digunakan)"
              />
              <button
                type="button"
                onClick={handleAddTechOption}
                disabled={savingTechOption}
                className="lg:col-span-3 px-3 py-2.5 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                {savingTechOption ? "Menyimpan..." : "Simpan ke Master"}
              </button>
            </div>

            <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-3 py-2 font-medium text-gray-600">Tech</th>
                    <th className="text-left px-3 py-2 font-medium text-gray-600">Keterangan Penggunaan</th>
                    <th className="px-3 py-2 w-12"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {project.tech.length === 0 && (
                    <tr>
                      <td colSpan={3} className="px-3 py-4 text-center text-gray-400">
                        Belum ada tech untuk project ini.
                      </td>
                    </tr>
                  )}
                  {project.tech.map((entry, index) => (
                    <tr key={index}>
                      <td className="px-3 py-2">
                        <select
                          value={entry.name}
                          onChange={(e) => updateTechRow(index, "name", e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                        >
                          <option value="">Pilih tech</option>
                          {!techOptions.some((option) => option.name === entry.name) && entry.name && (
                            <option value={entry.name}>{entry.name}</option>
                          )}
                          {techOptions.map((option) => (
                            <option key={option.id} value={option.name}>
                              {option.name}
                            </option>
                          ))}
                        </select>
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="text"
                          value={entry.usage}
                          onChange={(e) => updateTechRow(index, "usage", e.target.value)}
                          className="w-full px-2 py-1.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                          placeholder="Sering digunakan"
                        />
                      </td>
                      <td className="px-3 py-2 text-right">
                        <button
                          type="button"
                          onClick={() => removeTechRow(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="admin-btn-primary px-6 py-2.5 text-sm font-medium rounded-xl disabled:opacity-50"
          >
            {saving ? "Saving..." : isNew ? "Create Project" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="admin-btn-secondary px-6 py-2.5 text-sm font-medium rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

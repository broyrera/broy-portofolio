"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Experience {
  id?: string;
  num: string;
  role: string;
  company: string;
  period: string;
}

const initialExperience: Experience = {
  num: "",
  role: "",
  company: "",
  period: "",
};

export default function ExperienceFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const [experience, setExperience] = useState<Experience>(initialExperience);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      const fetchExperience = async () => {
        const { data, error } = await supabase
          .from("experiences")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          setExperience(data);
        }
        setLoading(false);
      };

      fetchExperience();
    }
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    let result;

    if (isNew) {
      // Generate new num based on existing count
      const { count } = await supabase
        .from("experiences")
        .select("id", { count: "exact", head: true });
      
      const newNum = String((count || 0) + 1).padStart(2, "0");
      result = await supabase
        .from("experiences")
        .insert([{ ...experience, num: newNum }]);
    } else {
      result = await supabase
        .from("experiences")
        .update(experience)
        .eq("id", id);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/experiences");
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
          {isNew ? "Add Experience" : "Edit Experience"}
        </h1>
        <p className="text-gray-500 mt-1">
          {isNew ? "Tambah pengalaman kerja" : "Edit pengalaman kerja"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl p-6 border border-gray-200 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role *
            </label>
            <input
              type="text"
              required
              value={experience.role}
              onChange={(e) =>
                setExperience({ ...experience, role: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Mobile Developer"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Company *
            </label>
            <input
              type="text"
              required
              value={experience.company}
              onChange={(e) =>
                setExperience({ ...experience, company: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="PT Neural Technologies Indonesia"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Period *
            </label>
            <input
              type="text"
              required
              value={experience.period}
              onChange={(e) =>
                setExperience({ ...experience, period: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Jun 2025 – Oct 2025"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 disabled:opacity-50 transition-colors"
          >
            {saving ? "Saving..." : isNew ? "Create Experience" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/experiences")}
            className="px-6 py-2.5 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";

interface Skill {
  id?: string;
  name: string;
  tag: string;
}

const initialSkill: Skill = {
  name: "",
  tag: "",
};

export default function SkillFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const isNew = id === "new";

  const [skill, setSkill] = useState<Skill>(initialSkill);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isNew) {
      const fetchSkill = async () => {
        const { data, error } = await supabase
          .from("skills")
          .select("*")
          .eq("id", id)
          .single();

        if (!error && data) {
          setSkill({
            id: data.id,
            name: data.name || "",
            tag: data.tag || "",
          });
        }
        setLoading(false);
      };

      fetchSkill();
    }
  }, [id, isNew]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSaving(true);

    let result;

    if (isNew) {
      result = await supabase.from("skills").insert([skill]);
    } else {
      result = await supabase.from("skills").update(skill).eq("id", id);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    router.push("/admin/skills");
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
        <p className="text-xs uppercase tracking-[0.2em] admin-subtle mb-2">Skill Editor</p>
        <h1 className="admin-title text-3xl font-semibold text-text">
          {isNew ? "Add Skill" : "Edit Skill"}
        </h1>
        <p className="admin-subtle mt-1">
          {isNew ? "Tambah skill baru" : "Edit skill yang ada"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 w-full">
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
            {error}
          </div>
        )}

        <div className="admin-card rounded-2xl p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skill Name *
            </label>
            <input
              type="text"
              required
              value={skill.name}
              onChange={(e) => setSkill({ ...skill, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-black/15 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="TypeScript"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tag (short code) *
            </label>
            <input
              type="text"
              required
              value={skill.tag}
              onChange={(e) => setSkill({ ...skill, tag: e.target.value.toLowerCase() })}
              className="w-full px-4 py-2.5 border border-black/15 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="ts"
              maxLength={10}
            />
            <p className="text-xs admin-subtle mt-1">
              Contoh: TypeScript → ts, JavaScript → js, Go → go
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="admin-btn-primary px-6 py-2.5 text-sm font-medium rounded-xl disabled:opacity-50"
          >
            {saving ? "Saving..." : isNew ? "Create Skill" : "Save Changes"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/skills")}
            className="admin-btn-secondary px-6 py-2.5 text-sm font-medium rounded-xl"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

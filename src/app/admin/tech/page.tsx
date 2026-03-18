"use client";

import { useCallback, useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface TechOption {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export default function TechMasterPage() {
  const [items, setItems] = useState<TechOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingDescription, setEditingDescription] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from("project_tech_options")
      .select("id, name, description, created_at")
      .order("name", { ascending: true });

    if (fetchError) {
      setError(fetchError.message);
      setItems([]);
    } else {
      setError("");
      setItems(data || []);
    }

    setLoading(false);
  }, []);

  useEffect(() => {
    const loadItems = async () => {
      await fetchItems();
    };

    void loadItems();
  }, [fetchItems]);

  const handleCreate = async () => {
    const name = newName.trim();
    const description = newDescription.trim();
    if (!name) return;

    const duplicated = items.some(
      (item) => item.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicated) {
      setError("Tech sudah ada di master list.");
      return;
    }

    setSaving(true);
    setError("");

    const { error: insertError } = await supabase
      .from("project_tech_options")
      .insert([{ name, description: description || null }]);

    setSaving(false);

    if (insertError) {
      setError(insertError.message);
      return;
    }

    setNewName("");
    setNewDescription("");
    await fetchItems();
  };

  const startEdit = (item: TechOption) => {
    setEditingId(item.id);
    setEditingName(item.name);
    setEditingDescription(item.description || "");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditingName("");
    setEditingDescription("");
  };

  const handleSaveEdit = async () => {
    if (!editingId) return;

    const name = editingName.trim();
    const description = editingDescription.trim();
    if (!name) return;

    const duplicated = items.some(
      (item) =>
        item.id !== editingId && item.name.toLowerCase() === name.toLowerCase()
    );
    if (duplicated) {
      setError("Nama tech sudah dipakai.");
      return;
    }

    setSaving(true);
    setError("");

    const { error: updateError } = await supabase
      .from("project_tech_options")
      .update({ name, description: description || null })
      .eq("id", editingId);

    setSaving(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    cancelEdit();
    await fetchItems();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Hapus tech ini dari master list?")) return;

    setSaving(true);
    setError("");

    const { error: deleteError } = await supabase
      .from("project_tech_options")
      .delete()
      .eq("id", id);

    setSaving(false);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    await fetchItems();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] admin-subtle mb-2">Taxonomy</p>
          <h1 className="admin-title text-3xl font-semibold text-text">Project Tech Master</h1>
          <p className="admin-subtle mt-1">Daftar tech yang dipakai oleh form project.</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="admin-card rounded-2xl p-5">
        <p className="text-sm font-medium text-text mb-3">Tambah tech baru</p>
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                void handleCreate();
              }
            }}
            placeholder="Contoh: Next.js"
            className="sm:col-span-4 px-4 py-2.5 border border-black/15 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Keterangan default (mis. sering digunakan)"
            className="sm:col-span-5 px-4 py-2.5 border border-black/15 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => void handleCreate()}
            disabled={saving}
            className="sm:col-span-3 admin-btn-primary px-4 py-2.5 rounded-xl disabled:opacity-50"
          >
            {saving ? "Saving..." : "Simpan"}
          </button>
        </div>
      </div>

      <div className="admin-card rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-black/10 bg-black/[0.03]">
          <p className="text-sm font-semibold text-text/75">Daftar Tech ({items.length})</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-gray-900"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center admin-subtle">Belum ada tech master.</div>
        ) : (
          <div className="divide-y divide-black/5">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex items-start justify-between gap-3">
                {editingId === item.id ? (
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="sm:col-span-4 px-3 py-2 border border-black/15 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      className="sm:col-span-5 px-3 py-2 border border-black/15 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <div className="sm:col-span-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => void handleSaveEdit()}
                        disabled={saving}
                        className="px-3 py-2 admin-btn-primary rounded-xl text-sm disabled:opacity-50"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-3 py-2 admin-btn-secondary rounded-xl text-sm"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="font-medium text-text">{item.name}</p>
                      <p className="text-sm admin-subtle mt-0.5">
                        {item.description || "-"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="px-3 py-1.5 text-sm admin-btn-secondary rounded-xl"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => void handleDelete(item.id)}
                        className="px-3 py-1.5 text-sm text-red-600 border border-red-200 rounded-lg hover:bg-red-50"
                      >
                        Hapus
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

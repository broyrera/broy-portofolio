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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Project Tech Master</h1>
          <p className="text-gray-500 mt-1">Kelola daftar tech untuk dipilih di form project</p>
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl p-5 border border-gray-200">
        <p className="text-sm font-medium text-gray-700 mb-3">Tambah tech baru</p>
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
            className="sm:col-span-4 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Keterangan default (mis. sering digunakan)"
            className="sm:col-span-5 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
          />
          <button
            type="button"
            onClick={() => void handleCreate()}
            disabled={saving}
            className="sm:col-span-3 px-4 py-2.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Simpan"}
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-200 bg-gray-50">
          <p className="text-sm font-semibold text-gray-700">Daftar Tech ({items.length})</p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-7 w-7 border-b-2 border-gray-900"></div>
          </div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Belum ada tech master.</div>
        ) : (
          <div className="divide-y divide-gray-100">
            {items.map((item) => (
              <div key={item.id} className="p-4 flex items-start justify-between gap-3">
                {editingId === item.id ? (
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      className="sm:col-span-4 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={editingDescription}
                      onChange={(e) => setEditingDescription(e.target.value)}
                      className="sm:col-span-5 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                    />
                    <div className="sm:col-span-3 flex gap-2">
                      <button
                        type="button"
                        onClick={() => void handleSaveEdit()}
                        disabled={saving}
                        className="px-3 py-2 bg-gray-900 text-white rounded-lg text-sm hover:bg-gray-800 disabled:opacity-50"
                      >
                        Simpan
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50"
                      >
                        Batal
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div>
                      <p className="font-medium text-gray-900">{item.name}</p>
                      <p className="text-sm text-gray-500 mt-0.5">
                        {item.description || "-"}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => startEdit(item)}
                        className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
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

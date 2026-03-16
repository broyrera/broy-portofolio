"use client";

import { useState, useEffect, useRef } from "react";
import { supabase, type GuestbookEntry } from "@/lib/supabase";

export default function GuestbookSection() {
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [connected, setConnected] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchEntries = async () => {
      const { data, error } = await supabase
        .from("guestbook")
        .select("*")
        .order("created_at", { ascending: true })
        .limit(50);

      if (!error && data) {
        setEntries(data);
        setConnected(true);
      }
    };

    fetchEntries();

    const channel = supabase
      .channel("guestbook-realtime")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "guestbook" },
        (payload) => {
          setEntries((prev) => [...prev, payload.new as GuestbookEntry]);
        }
      )
      .subscribe((status) => {
        if (status === "SUBSCRIBED") setConnected(true);
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [entries]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || sending) return;

    setSending(true);
    const { error } = await supabase
      .from("guestbook")
      .insert([{ name: name.trim(), message: message.trim() }]);

    if (!error) {
      setMessage("");
    }
    setSending(false);
  };

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <section id="guestbook" className="py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 sm:px-10">
        {/* Section Header */}
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-[0.3em] uppercase text-text-muted mb-4">
            — Guestbook
          </p>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight lowercase leading-[0.95]">
            leave a<br />
            <span className="text-primary">message</span>
          </h2>
          <p className="text-sm text-text-muted mt-6 max-w-md leading-relaxed">
            Tinggalkan pesan atau sapa saya. Pesan pengunjung lain akan muncul
            secara realtime.
          </p>
        </div>

        {/* Guestbook Container */}
        <div className="rounded-4xl overflow-hidden bg-surface border border-text/5">
          {/* Header */}
          <div className="px-6 sm:px-8 py-4 flex items-center justify-between border-b border-text/5">
            <div className="flex items-center gap-3">
              <span className="text-sm font-semibold text-text">
                buku tamu
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`w-2 h-2 rounded-full ${
                  connected ? "bg-green-500 animate-pulse" : "bg-text-light"
                }`}
              />
              <span className="text-xs text-text-muted">
                {connected ? "live" : "connecting..."}
              </span>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="h-72 sm:h-80 overflow-y-auto p-6 sm:p-8 space-y-0 divide-y divide-text/5"
          >
            {entries.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <span className="text-3xl mb-3">📝</span>
                <p className="text-text-muted text-sm">
                  Belum ada pesan. Jadilah yang pertama!
                </p>
              </div>
            )}

            {entries.map((entry, i) => (
              <div
                key={entry.id}
                className="group py-4 first:pt-0 flex items-start gap-4"
              >
                <span className="text-[10px] font-semibold text-text-light mt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-3 mb-1">
                    <span className="font-semibold text-sm text-text">
                      {entry.name}
                    </span>
                    <span className="text-[10px] text-text-light">
                      {formatTime(entry.created_at)}
                    </span>
                  </div>
                  <p className="text-sm text-text-muted leading-relaxed">
                    {entry.message}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 border-t border-text/5"
          >
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                type="text"
                placeholder="Nama"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                className="flex-shrink-0 sm:w-36 px-4 py-3 rounded-2xl bg-bg border border-text/8 text-text text-sm placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
              />
              <input
                type="text"
                placeholder="Tulis pesan..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                className="flex-1 px-4 py-3 rounded-2xl bg-bg border border-text/8 text-text text-sm placeholder:text-text-light focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/30 transition-all"
              />
              <button
                type="submit"
                disabled={sending || !name.trim() || !message.trim()}
                className="px-6 py-3 rounded-2xl bg-text text-bg text-sm font-semibold transition-all duration-300 hover:bg-primary disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {sending ? "..." : "kirim →"}
              </button>
            </div>
            <p className="text-[10px] text-text-light text-center mt-2">
              pesan bersifat publik · ditampilkan realtime
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

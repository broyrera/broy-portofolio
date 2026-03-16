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

  // Fetch initial entries + subscribe to realtime
  useEffect(() => {
    // Fetch existing entries
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

    // Subscribe to realtime inserts
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

  // Auto-scroll to bottom when new entry appears
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
    <section id="guestbook" className="relative py-32">
      {/* Top Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="mx-auto max-w-3xl px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <span className="font-accent text-accent text-sm tracking-[0.3em] uppercase block mb-4">
            Buku Tamu
          </span>
          <h2 className="font-heading text-4xl sm:text-5xl font-bold text-foreground mb-4">
            Live Guestbook
          </h2>
          <p className="text-foreground-muted max-w-md mx-auto">
            Tinggalkan pesan atau sapa saya. Pesan pengunjung lain akan muncul
            secara realtime.
          </p>
          <div className="elegant-divider mx-auto max-w-xs" />
        </div>

        {/* Guestbook Card — styled like a VIP Letter/Book */}
        <div className="relative rounded-3xl overflow-hidden bg-surface border border-accent/15 shadow-xl shadow-primary/5">
          {/* Header Bar */}
          <div className="px-6 sm:px-8 py-4 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b border-accent/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="font-heading text-lg font-semibold text-foreground">
                ✦ Buku Tamu VIP
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  connected ? "bg-green-500 animate-pulse" : "bg-foreground-light"
                }`}
              />
              <span className="text-xs text-foreground-muted">
                {connected ? "Live" : "Connecting..."}
              </span>
            </div>
          </div>

          {/* Messages Area */}
          <div
            ref={scrollRef}
            className="h-80 sm:h-96 overflow-y-auto p-6 sm:p-8 space-y-5"
          >
            {entries.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center">
                <span className="text-4xl mb-4">📜</span>
                <p className="text-foreground-muted font-accent text-lg">
                  Belum ada pesan. Jadilah yang pertama!
                </p>
              </div>
            )}

            {entries.map((entry) => (
              <div
                key={entry.id}
                className="group relative pl-6 border-l-2 border-accent/20 hover:border-accent/50 transition-colors"
              >
                {/* Dot on timeline */}
                <span className="absolute left-[-5px] top-1.5 w-2 h-2 rounded-full bg-accent/40 group-hover:bg-accent transition-colors" />

                <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3 mb-1">
                  <span className="font-heading font-semibold text-foreground text-sm">
                    {entry.name}
                  </span>
                  <span className="text-xs text-foreground-light font-accent">
                    {formatTime(entry.created_at)}
                  </span>
                </div>
                <p className="text-sm text-foreground-muted leading-relaxed">
                  {entry.message}
                </p>
              </div>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={handleSubmit}
            className="p-6 sm:p-8 bg-gradient-to-t from-surface-dark/50 to-transparent border-t border-accent/10"
          >
            <div className="flex flex-col sm:flex-row gap-3 mb-3">
              <input
                type="text"
                placeholder="Nama Anda"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={100}
                className="flex-shrink-0 sm:w-40 px-4 py-3 rounded-xl bg-background border border-accent/15 text-foreground text-sm placeholder:text-foreground-light/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-all"
              />
              <input
                type="text"
                placeholder="Tulis pesan..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                maxLength={500}
                className="flex-1 px-4 py-3 rounded-xl bg-background border border-accent/15 text-foreground text-sm placeholder:text-foreground-light/50 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent/40 transition-all"
              />
              <button
                type="submit"
                disabled={sending || !name.trim() || !message.trim()}
                className="px-6 py-3 rounded-xl bg-primary text-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-primary-dark hover:shadow-lg hover:shadow-primary/20 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-none"
              >
                {sending ? (
                  <span className="inline-flex items-center gap-2">
                    <svg
                      className="animate-spin h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      />
                    </svg>
                    Kirim
                  </span>
                ) : (
                  "Kirim ✦"
                )}
              </button>
            </div>
            <p className="text-xs text-foreground-light/40 text-center">
              Pesan bersifat publik dan ditampilkan secara realtime
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

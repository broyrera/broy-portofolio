/* ============================================================
   SUPABASE CLIENT
   ============================================================

   1. Buat project baru di https://supabase.com
   2. Copy URL dan Anon Key dari Settings > API
   3. Buat file .env.local di root project:

      NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
      NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

   4. Jalankan SQL berikut di Supabase SQL Editor:

   -- Create guestbook table
   CREATE TABLE guestbook (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
     name TEXT NOT NULL CHECK (char_length(name) >= 1 AND char_length(name) <= 100),
     message TEXT NOT NULL CHECK (char_length(message) >= 1 AND char_length(message) <= 500)
   );

   -- Enable Row Level Security
   ALTER TABLE guestbook ENABLE ROW LEVEL SECURITY;

   -- Policy: Semua orang bisa membaca pesan
   CREATE POLICY "Allow public read"
     ON guestbook FOR SELECT
     USING (true);

   -- Policy: Semua orang bisa menambah pesan
   CREATE POLICY "Allow public insert"
     ON guestbook FOR INSERT
     WITH CHECK (true);

   -- Policy: TIDAK ADA yang bisa update
   -- (Tidak perlu dibuat, karena default RLS = deny)

   -- Policy: TIDAK ADA yang bisa delete
   -- (Tidak perlu dibuat, karena default RLS = deny)

   -- Enable Realtime for guestbook table
   ALTER PUBLICATION supabase_realtime ADD TABLE guestbook;

   ============================================================ */

import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Conditionally create the client — during build/prerender the env vars
// may be absent, so we provide a dummy client that won't crash the build.
let supabase: SupabaseClient;

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  // Placeholder that will never be used at runtime (env vars are required
  // for the deployed app). This prevents build-time crashes.
  supabase = createClient(
    "https://placeholder.supabase.co",
    "placeholder-key"
  );
}

export { supabase };

export interface GuestbookEntry {
  id: string;
  created_at: string;
  name: string;
  message: string;
}

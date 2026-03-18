 # Supabase Database Setup

Jalankan SQL berikut di Supabase SQL Editor untuk membuat tabel-tabel yang diperlukan.

```sql
-- ============================================================
-- PROJECTS TABLE
-- ============================================================
CREATE TABLE projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  slug TEXT UNIQUE NOT NULL CHECK (char_length(slug) >= 1 AND char_length(slug) <= 100),
  title TEXT NOT NULL CHECK (char_length(title) >= 1 AND char_length(title) <= 200),
  description TEXT CHECK (char_length(description) <= 500),
  long_description TEXT,
  image TEXT,
  screenshots TEXT[] DEFAULT '{}',
  tech TEXT[] DEFAULT '{}',
  role TEXT,
  year TEXT,
  link TEXT,
  demo TEXT,
  published BOOLEAN DEFAULT false
);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa membaca project yang dipublish
CREATE POLICY "Allow public read published projects"
  ON projects FOR SELECT
  USING (published = true);

-- Policy: Admin bisa melakukan CRUD penuh
CREATE POLICY "Allow admin full access"
  ON projects FOR ALL
  USING (true);

-- ============================================================
-- PROJECT TECH OPTIONS TABLE (master tech untuk dipilih di form project)
-- ============================================================
CREATE TABLE project_tech_options (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL UNIQUE CHECK (char_length(name) >= 1 AND char_length(name) <= 100),
  description TEXT
);

-- Jika tabel project_tech_options sudah terlanjur dibuat sebelumnya,
-- jalankan ini agar kolom keterangan tersedia:
ALTER TABLE project_tech_options
ADD COLUMN IF NOT EXISTS description TEXT;

ALTER TABLE project_tech_options ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public read project tech options"
  ON project_tech_options;

CREATE POLICY "Allow public read project tech options"
  ON project_tech_options FOR SELECT
  USING (true);

DROP POLICY IF EXISTS "Allow admin full access project tech options"
  ON project_tech_options;

CREATE POLICY "Allow admin full access project tech options"
  ON project_tech_options FOR ALL
  USING (true);

-- ============================================================
-- EXPERIENCES TABLE
-- ============================================================
CREATE TABLE experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  num TEXT NOT NULL CHECK (char_length(num) <= 10),
  role TEXT NOT NULL CHECK (char_length(role) >= 1 AND char_length(role) <= 200),
  company TEXT NOT NULL CHECK (char_length(company) >= 1 AND char_length(company) <= 200),
  period TEXT NOT NULL CHECK (char_length(period) >= 1 AND char_length(period) <= 50)
);

-- Enable Row Level Security
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa membaca
CREATE POLICY "Allow public read experiences"
  ON experiences FOR SELECT
  USING (true);

-- Policy: Admin bisa melakukan CRUD penuh
CREATE POLICY "Allow admin full access experiences"
  ON experiences FOR ALL
  USING (true);

-- ============================================================
-- SKILLS TABLE
-- ============================================================
CREATE TABLE skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  name TEXT NOT NULL UNIQUE CHECK (char_length(name) >= 1 AND char_length(name) <= 100),
  tag TEXT NOT NULL CHECK (char_length(tag) >= 1 AND char_length(tag) <= 10)
);

-- Enable Row Level Security
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa membaca
CREATE POLICY "Allow public read skills"
  ON skills FOR SELECT
  USING (true);

-- Policy: Admin bisa melakukan CRUD penuh
CREATE POLICY "Allow admin full access skills"
  ON skills FOR ALL
  USING (true);

-- ============================================================
-- INSERT DEFAULT DATA (Optional - Run only if needed)
-- ============================================================
-- Uncomment below if you want to seed initial data

-- INSERT INTO experiences (num, role, company, period) VALUES
--   ('01', 'Mobile Developer', 'PT Neural Technologies Indonesia', 'Jun 2025 – Oct 2025'),
--   ('02', 'Ketua Unit Kewirausahaan', 'HIMAKOM Polban', 'Feb 2024 – Jan 2025'),
--   ('03', 'Project Manager & Full-Stack Dev', 'Lawan PMO Team', '2024');

-- INSERT INTO skills (name, tag) VALUES
--   ('TypeScript', 'ts'),
--   ('Go', 'go'),
--   ('Flutter', 'fl'),
--   ('Kotlin', 'kt'),
--   ('NestJS', 'nj'),
--   ('Express', 'ex'),
--   ('Docker', 'dk'),
--   ('Firebase', 'fb'),
--   ('Git', 'gt'),
--   ('Supabase', 'sb');

-- INSERT INTO projects (slug, title, description, long_description, image, screenshots, tech, role, year, link, published) VALUES
--   ('lawan-pmo', 'Lawan PMO', 'Mobile app untuk melawan prokrastinasi.', 'Long description here...', '/images/project-lawan-pmo.png', ARRAY['/images/project-lawan-pmo.png'], ARRAY['Flutter', 'Firebase'], 'PM & Full-Stack Dev', '2024', '#', false);

-- INSERT INTO project_tech_options (name) VALUES
-- INSERT INTO project_tech_options (name, description) VALUES
--   ('React', 'Sering digunakan untuk UI web'),
--   ('Next.js', 'Sering digunakan untuk fullstack web app'),
--   ('TypeScript', 'Digunakan untuk type-safe development'),
--   ('Supabase', 'Pernah digunakan untuk auth dan database');

-- ============================================================
-- ADMINS TABLE (for authorized admin emails)
-- ============================================================
CREATE TABLE admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  email TEXT UNIQUE NOT NULL CHECK (char_length(email) >= 3 AND char_length(email) <= 255)
);

-- Enable Row Level Security
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- Policy: Semua orang bisa baca (untuk cek authorization)
CREATE POLICY "Allow public read admins"
  ON admins FOR SELECT
  USING (true);

-- Policy: Admin bisa manage admins
CREATE POLICY "Allow admin full access admins"
  ON admins FOR ALL
  USING (true);

-- ============================================================
-- ENABLE REALTIME (optional)
-- ============================================================
ALTER PUBLICATION supabase_realtime ADD TABLE projects;
ALTER PUBLICATION supabase_realtime ADD TABLE project_tech_options;
ALTER PUBLICATION supabase_realtime ADD TABLE experiences;
ALTER PUBLICATION supabase_realtime ADD TABLE skills;
```

## Setup User Auth

1. Buka Supabase Dashboard → Authentication → Users
2. Klik "Add user" untuk membuat akun admin
3. Isi email & password (simpan baik-baik!)
4. Copy email tersebut

## Setup Admin Email

Setelah buat user, masukkan email-nya ke tabel admins:

```sql
-- Ganti dengan email lu
INSERT INTO admins (email) VALUES ('royazizbarera@gmail.com');
```

Kalo mau tambah admin lain, cukup:
```sql
INSERT INTO admins (email) VALUES ('email-admin-lain@example.com');
```

## Catatan

- **Guestbook table** sudah ada dari setup sebelumnya
- **RLS Policies** saat ini mengizinkan akses penuh untuk development. Untuk production, pertimbangkan untuk membatasi INSERT/UPDATE/DELETE hanya untuk admin
- **Realtime** diaktifkan untuk sync data real-time di dashboard admin

# Cara Menambah Gambar ke Project

## Cara Cepat (tanpa Supabase)

Taruh gambar langsung di folder `public/images/projects/{slug}/`, lalu update `src/data/projects.json`.

### 1. Struktur folder

```
public/
  images/
    projects/
      lawan-pmo/
        cover.jpg         ← gambar utama (ditampilkan di hero)
        screen-1.jpg
        screen-2.jpg
        screen-3.jpg      ← bisa sebanyak apapun
      broy-pos/
        cover.jpg
        screen-1.jpg
        ...
```

Format yang didukung: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`, `.avif`

### 2. Update projects.json

Buka `src/data/projects.json`, cari project yang mau diupdate, isi field `image` dan `screenshots`:

```json
{
  "slug": "lawan-pmo",
  "image": "/images/projects/lawan-pmo/cover.jpg",
  "screenshots": [
    "/images/projects/lawan-pmo/screen-1.jpg",
    "/images/projects/lawan-pmo/screen-2.jpg",
    "/images/projects/lawan-pmo/screen-3.jpg"
  ]
}
```

`image` = hero/cover yang muncul di card dan bagian atas halaman detail.
`screenshots` = semua gambar di gallery (bisa banyak, tidak ada batas).

Di halaman detail, `image` dan `screenshots` digabung otomatis ke gallery dengan lightbox.

---

## Cara via Supabase (setelah Supabase aktif)

1. Pastikan `.env.local` sudah punya kredensial Supabase yang valid
2. Taruh gambar di `portfolio-images/{slug}/` (file pertama atau yang bernama `cover.*` jadi cover)
3. Jalankan script upload:

```bash
# Upload gambar + upsert data ke DB:
npm run seed:projects

# Hanya upload gambar tanpa ubah data teks:
node scripts/seed-projects.mjs

# Preview tanpa nulis apapun:
npm run seed:projects:dry
```

Script otomatis upload semua gambar di `portfolio-images/{slug}/` ke Supabase Storage
dan update field `image` + `screenshots` di tabel projects.

---

## Tips

- Resolusi disarankan minimal 1280x720 untuk cover, 1200x800 untuk screenshots
- Kompres dulu sebelum taruh di `public/` karena tidak ada kompresi otomatis di jalur ini
- Kalau Supabase sudah aktif, gambar di Supabase Storage lebih baik karena di-cache CDN
- `.gitkeep` di dalam folder `portfolio-images/` bisa dihapus setelah ada file gambar di dalamnya

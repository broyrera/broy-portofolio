# Roy Aziz Barera — Personal Portfolio

Portofolio personal berbasis Next.js (App Router), Tailwind CSS, dan TypeScript dengan arsitektur **Full Static (SSG)**.

## Fitur Utama

- **Fast & Zero Maintenance**: Menggunakan data statis lokal (JSON) tanpa dependensi database eksternal.
- **Responsive & Modern UI**: Animasi halus, dark/light contrast section, custom marquee, dan typography elegan.
- **Detail Proyek Interaktif**: Dilengkapi lightbox gallery screenshot dan rincian teknologi per proyek.
- **SEO & Social Sharing Ready**: Metadata OpenGraph dan Twitter Card terpasang.

## Struktur Data

Semua konten dapat diedit langsung melalui:
- Proyek: [src/data/projects.json](src/data/projects.json)
- Biodata, Skills, Pengalaman: [src/data/about.json](src/data/about.json)
- Gambar proyek: `public/images/projects/{slug}/`

Lihat panduan lengkap di [HOW_TO_ADD_IMAGES.md](HOW_TO_ADD_IMAGES.md).

## Menjalankan Proyek

```bash
# Jalankan development server
npm run dev

# Build untuk produksi (Static Site Generation)
npm run build

# Menjalankan hasil build
npm run start
```

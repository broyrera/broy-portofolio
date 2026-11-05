# Cara Menambah & Mengelola Project (Statis)

Portofolio ini 100% statis. Semua data tersimpan di file JSON lokal dan gambar di folder `public/`. Tidak ada database atau server pihak ketiga yang perlu di-maintain.

---

## 1. Menambahkan Gambar Project

Taruh gambar langsung di folder `public/images/projects/{slug}/`.

### Struktur Folder
```text
public/
  images/
    projects/
      lawan-pmo/
        cover.png         ← gambar utama (card di homepage & hero di detail)
        screen-1.png      ← screenshot gallery (bebas berapa saja)
        screen-2.png
      project-baru/
        cover.png
        screen-1.png
        screen-2.png
```

* Format yang didukung: `.png`, `.jpg`, `.jpeg`, `.webp`, `.avif`
* Disarankan kompres gambar terlebih dahulu (misal via tinypng atau squoosh) agar loading cepat.

---

## 2. Menambahkan atau Edit Data Project

Buka [src/data/projects.json](src/data/projects.json). Tambahkan objek baru ke dalam array:

```json
{
  "id": "local-7",
  "slug": "project-baru",
  "title": "Nama Project",
  "description": "Deskripsi singkat yang tampil di kartu homepage.",
  "long_description": "Deskripsi lengkap yang tampil di halaman detail /projects/project-baru.",
  "image": "/images/projects/project-baru/cover.png",
  "screenshots": [
    "/images/projects/project-baru/screen-1.png",
    "/images/projects/project-baru/screen-2.png"
  ],
  "tech": [
    "{\"name\":\"Go\",\"usage\":\"Backend API\"}",
    "{\"name\":\"PostgreSQL\",\"usage\":\"Database utama\"}",
    "{\"name\":\"Docker\",\"usage\":\"Containerization\"}"
  ],
  "role": "Backend Developer",
  "year": "2025",
  "link": null,
  "demo": "https://example.com",
  "published": true,
  "display_order": 7
}
```

* `published: true` → tampil di web. Kalau `false` akan disembunyikan.
* `display_order` → urutan tampil di homepage (angka lebih kecil = lebih atas).

---

## 3. Mengubah Profil, Skills, dan Pengalaman

Buka [src/data/about.json](src/data/about.json):
* Bagian `"skills"`: daftar keahlian teknologi.
* Bagian `"experiences"`: riwayat karier / organisasi.

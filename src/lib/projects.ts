/* ============================================================
   PROJECT DATA (shared between list & detail pages)
   ============================================================
   Untuk menambahkan project baru:
   1. Tambahkan object baru ke array `projects` di bawah
   2. Taruh screenshot di public/images/projects/[slug]/
   3. Card di homepage otomatis link ke /projects/[slug]
   ============================================================ */

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  screenshots: string[];
  tech: string[];
  role: string;
  year: string;
  link?: string;
  demo?: string;
  published: boolean;
}

export const projects: Project[] = [
  {
    slug: "lawan-pmo",
    title: "Lawan PMO",
    description:
      "Mobile app untuk melawan prokrastinasi. Dikembangkan sebagai PM & Full-Stack Dev hingga rilis.",
    longDescription:
      "Aplikasi mobile yang dirancang untuk membantu pengguna melawan prokrastinasi dan membangun kebiasaan produktif. Fitur utama meliputi progress tracking, habit streaks, daily reflection, dan productivity scoring. Dikembangkan dari konsep hingga rilis sebagai Project Manager sekaligus Full-Stack Developer.",
    image: "/images/project-lawan-pmo.png",
    screenshots: ["/images/project-lawan-pmo.png"],
    tech: ["Flutter", "Firebase", "Dart"],
    role: "Project Manager & Full-Stack Developer",
    year: "2024",
    link: "#",
    published: false,
  },
  {
    slug: "klinik-kecantikan-broy",
    title: "Klinik Kecantikan Broy",
    description:
      "Sistem manajemen klinik kecantikan — dashboard admin, pelanggan, transaksi, dan jadwal.",
    longDescription:
      "Platform web untuk mengelola operasional klinik kecantikan secara menyeluruh. Meliputi dashboard admin, manajemen data pelanggan, pencatatan transaksi, penjadwalan appointment, dan laporan keuangan. Dibangun dengan arsitektur modular dan reusable components.",
    image: "/images/project-klinik-kecantikan.png",
    screenshots: ["/images/project-klinik-kecantikan.png"],
    tech: ["Next.js", "TypeScript", "Prisma"],
    role: "Full-Stack Developer",
    year: "2025",
    link: "#",
    published: false,
  },
  {
    slug: "shorts-broy",
    title: "Shorts Broy",
    description:
      "Tools otomasi pembuatan konten short-form video dengan pipeline CLI yang efisien.",
    longDescription:
      "Command-line tool untuk mengotomasi workflow pembuatan konten short-form video. Pipeline mencakup script generation, voiceover synthesis, scene selection, video assembly, subtitle generation, dan final rendering. Dirancang untuk mempercepat produksi konten tanpa mengorbankan kualitas.",
    image: "/images/project-shorts-broy.png",
    screenshots: ["/images/project-shorts-broy.png"],
    tech: ["Python", "FFmpeg", "CLI"],
    role: "Solo Developer",
    year: "2025",
    link: "#",
    published: false,
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

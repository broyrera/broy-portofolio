/* ============================================================
   DATA TYPES FOR DATABASE
   ============================================================ */

export interface Experience {
  id: string;
  num: string;
  role: string;
  company: string;
  period: string;
  created_at: string;
  updated_at: string;
}

export interface Skill {
  id: string;
  name: string;
  tag: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
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
  created_at: string;
  updated_at: string;
}

export interface GuestbookEntry {
  id: string;
  created_at: string;
  name: string;
  message: string;
}

// Default data for initial setup
export const defaultExperiences: Omit<Experience, "id" | "created_at" | "updated_at">[] = [
  {
    num: "01",
    role: "Mobile Developer",
    company: "PT Neural Technologies Indonesia",
    period: "Jun 2025 – Oct 2025",
  },
  {
    num: "02",
    role: "Ketua Unit Kewirausahaan",
    company: "HIMAKOM Polban",
    period: "Feb 2024 – Jan 2025",
  },
  {
    num: "03",
    role: "Project Manager & Full-Stack Dev",
    company: "Lawan PMO Team",
    period: "2024",
  },
];

export const defaultSkills: Omit<Skill, "id" | "created_at" | "updated_at">[] = [
  { name: "TypeScript", tag: "ts" },
  { name: "Go", tag: "go" },
  { name: "Flutter", tag: "fl" },
  { name: "Kotlin", tag: "kt" },
  { name: "NestJS", tag: "nj" },
  { name: "Express", tag: "ex" },
  { name: "Docker", tag: "dk" },
  { name: "Firebase", tag: "fb" },
  { name: "Git", tag: "gt" },
  { name: "Supabase", tag: "sb" },
];

export type ProjectCategory =
  | "all"
  | "team"
  | "work"
  | "client"
  | "personal"
  | "academic";

export interface ProjectHighlight {
  title: string;
  description: string;
}

export interface Project {
  id?: string;
  slug: string;
  title: string;
  category: ProjectCategory;
  category_label: string;
  description: string;
  long_description: string;
  image: string | null;
  screenshots: string[];
  tech: string[];
  role: string;
  year: string;
  link?: string | null;
  demo?: string | null;
  published: boolean;
  display_order?: number | null;
  highlight_metric?: string | null;
  highlights?: ProjectHighlight[];
}

export type SkillCategory =
  | "backend"
  | "mobile"
  | "database"
  | "devops"
  | "workflow";

export interface Skill {
  id: string;
  name: string;
  tag: string;
  category: SkillCategory;
  category_label: string;
  description: string;
  highlights: string[];
  projects?: string[];
}

export interface Experience {
  id: string;
  num: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  highlights?: string[];
  tech?: string[];
}

export interface Honor {
  id: string;
  title: string;
  badge: string;
  category: string;
  issuer: string;
  year: string;
  description: string;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  period: string;
  description: string;
}

export interface AboutData {
  bio_headline: string;
  bio_description: string[];
  skills: Skill[];
  experiences: Experience[];
  honors: Honor[];
  certifications: Certification[];
}

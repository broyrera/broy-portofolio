export interface Project {
  id?: string;
  slug: string;
  title: string;
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
}

export interface Skill {
  id: string;
  name: string;
  tag: string;
}

export interface Experience {
  id: string;
  num: string;
  role: string;
  company: string;
  period: string;
}

export interface AboutData {
  skills: Skill[];
  experiences: Experience[];
}

/**
 * Portfolio Project Seeder
 *
 * Usage:
 *   node scripts/seed-projects.mjs
 *   node scripts/seed-projects.mjs --skip-images   # skip image upload, insert text data only
 *   node scripts/seed-projects.mjs --dry-run       # preview without inserting
 *
 * Image folder convention:
 *   portfolio-images/{slug}/          <- put all images here
 *   portfolio-images/{slug}/cover.*   <- OR name one file "cover" to force it as cover image
 *   All other files become screenshots (sorted alphabetically)
 *
 * Requires: .env.local with NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
 * Optional: SUPABASE_SERVICE_ROLE_KEY in .env.local for bypassing storage auth
 */

import { createClient } from "@supabase/supabase-js";
import { readFileSync, readdirSync, existsSync, statSync } from "fs";
import { join, extname, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");

// ─── Parse .env.local ─────────────────────────────────────────────────────────
function loadEnv() {
  const envPath = join(ROOT, ".env.local");
  if (!existsSync(envPath)) throw new Error(".env.local not found at " + envPath);
  const raw = readFileSync(envPath, "utf-8");
  const env = {};
  for (const line of raw.split(/\r?\n/)) {
    const match = line.match(/^([^#=\s][^=]*)=(.*)$/);
    if (match) env[match[1].trim()] = match[2].trim().replace(/^["']|["']$/g, "");
  }
  return env;
}

// ─── Args ──────────────────────────────────────────────────────────────────────
const args = process.argv.slice(2);
const SKIP_IMAGES = args.includes("--skip-images");
const DRY_RUN = args.includes("--dry-run");

// ─── Project Data ──────────────────────────────────────────────────────────────
// tech.usage = label yang muncul di portfolio (free text, bisa disesuaikan)
const PROJECTS = [
  {
    slug: "lawan-pmo",
    title: "Lawan PMO",
    description:
      "Android mobile app for PMO addiction recovery using PI Model & MBSR approach. 350+ registered users on first release.",
    long_description: `Lawan PMO is a self-regulation mobile app that helps users recover from PMO addiction using evidence-based PI Model and MBSR approaches. Led as Project Manager and sole architect for both Android and backend.

**Highlights**
- 350+ registered users on first Play Store release
- Full CI/CD pipeline built from scratch with GitHub Actions + VPS across 3 environments (dev / staging / production)
- FCM push notifications, Google OAuth login
- Multi-environment build variant (dev / staging / production)
- Parental control module with real-time app-usage & URL detection on Android
- End-to-end ownership: Play Store Console management, policy config, production rollout

**Architecture**
- Frontend: Kotlin (Android) — clean architecture, modular codebase
- Backend: NestJS (TypeScript) — modular monorepo, REST API
- Infra: GitHub Actions CI/CD, VPS, PostgreSQL`,
    role: "Project Manager & Full-Stack Developer",
    year: "2025",
    link: null,
    demo: null,
    published: true,
    display_order: 1,
    tech: [
      { name: "Kotlin", usage: "Android — primary language" },
      { name: "NestJS", usage: "Backend framework" },
      { name: "TypeScript", usage: "Backend codebase" },
      { name: "GitHub Actions", usage: "CI/CD pipeline" },
      { name: "FCM", usage: "Push notifications" },
      { name: "Google OAuth", usage: "Authentication" },
      { name: "PostgreSQL", usage: "Database" },
      { name: "VPS", usage: "Server management" },
    ],
  },
  {
    slug: "broy-pos",
    title: "Broy POS",
    description:
      "POS system integrated with AI-powered CMS for automated multi-provider customer service via WhatsApp.",
    long_description: `Broy POS is a full-featured Point of Sale system combined with a CMS that auto-replies to customers using AI with multi-provider support (switch between OpenAI, Anthropic, Gemini, etc. without code changes).

**Key Features**
- POS: transaction management, inventory, reporting (Recharts)
- WhatsApp integration via Baileys for real-time customer chat
- AI multi-provider auto-reply: pluggable LLM backend, configurable per channel
- Worker architecture: separate workers for webhooks, message delivery, handoff, notifications
- Playwright E2E tests + unit tests for AI chat replay
- Docker multi-environment setup (dev / prod)

**Tech**
Next.js 16 · TypeScript · Prisma · PostgreSQL · Baileys (WhatsApp) · NextAuth · Docker · Zod`,
    role: "Solo Developer",
    year: "2025",
    link: null,
    demo: null,
    published: true,
    display_order: 2,
    tech: [
      { name: "Next.js", usage: "Fullstack framework" },
      { name: "TypeScript", usage: "Primary language" },
      { name: "Prisma", usage: "ORM" },
      { name: "PostgreSQL", usage: "Database" },
      { name: "WhatsApp (Baileys)", usage: "Customer messaging" },
      { name: "AI Multi-Provider", usage: "Auto-reply engine" },
      { name: "Docker", usage: "Containerization" },
      { name: "NextAuth", usage: "Authentication" },
    ],
  },
  {
    slug: "crypto-broy",
    title: "Crypto Broy",
    description:
      "Personal crypto dashboard with real-time market data, charts, and trading interface powered by Go backend and Next.js frontend.",
    long_description: `Crypto Broy is a personal crypto monitoring and trading dashboard built with a Go backend connecting to Indodax API and a Next.js frontend for real-time chart visualization.

**Features**
- Real-time candlestick charts via lightweight-charts
- Google OAuth login via @react-oauth/google
- TanStack React Query for efficient data fetching & caching
- Modular monorepo: separate frontend / backend / docs
- Dark/light theme support

**Stack**
Go · Next.js 16 · TypeScript · React Query · lightweight-charts · Framer Motion · Radix UI`,
    role: "Solo Developer",
    year: "2025",
    link: null,
    demo: null,
    published: true,
    display_order: 3,
    tech: [
      { name: "Go", usage: "Backend API" },
      { name: "Next.js", usage: "Frontend" },
      { name: "TypeScript", usage: "Frontend codebase" },
      { name: "React Query", usage: "Data fetching" },
      { name: "lightweight-charts", usage: "Chart visualization" },
      { name: "Framer Motion", usage: "Animations" },
    ],
  },
  {
    slug: "simeta",
    title: "Simeta",
    description:
      "Information system for Metagama organization activities at Politeknik Negeri Bandung, covering credentials, groups, and member management.",
    long_description: `Simeta (Sistem Informasi Mentoring Agama) is a web-based information system built to manage the activities, credentials, and members of Metagama — the competitive programming / tech organization at Politeknik Negeri Bandung.

**Features**
- Member management with group membership tracking
- Credential issuance with email queue delivery
- Activity & event management
- Docker multi-environment deployment (dev / prod)
- Backfill scripts for data migration

**Stack**
Next.js · TypeScript · Prisma · PostgreSQL · Docker · Nodemailer (email queue)`,
    role: "Developer",
    year: "2024 – 2025",
    link: null,
    demo: null,
    published: true,
    display_order: 4,
    tech: [
      { name: "Next.js", usage: "Fullstack framework" },
      { name: "TypeScript", usage: "Primary language" },
      { name: "Prisma", usage: "ORM" },
      { name: "PostgreSQL", usage: "Database" },
      { name: "Docker", usage: "Containerization" },
    ],
  },
  {
    slug: "klinik-erp",
    title: "Klinik ERP",
    description:
      "ERP system for clinic management built with Go (Gin + GORM), featuring modular clean architecture and Docker deployment.",
    long_description: `Klinik ERP is a backend-focused ERP system for managing clinic operations — patients, appointments, inventory, and reporting.

**Architecture**
- Clean architecture with cmd / internal / pkg separation
- Gin HTTP framework for REST API
- GORM for PostgreSQL ORM
- Docker Compose for easy deployment
- Modular package structure for scalability

**Stack**
Go · Gin · GORM · PostgreSQL · Docker`,
    role: "Developer",
    year: "2025",
    link: null,
    demo: null,
    published: true,
    display_order: 5,
    tech: [
      { name: "Go", usage: "Primary language" },
      { name: "Gin", usage: "HTTP framework" },
      { name: "GORM", usage: "ORM" },
      { name: "PostgreSQL", usage: "Database" },
      { name: "Docker", usage: "Containerization" },
    ],
  },
  {
    slug: "bot-ig-broy",
    title: "Bot IG Broy",
    description:
      "Instagram automation bot for scraping and content management, built with Python using an extensible Plugin Pattern architecture.",
    long_description: `Bot IG Broy is an Instagram automation tool for scraping content and managing accounts. Designed with extensibility in mind — new behaviors can be added as plugins without touching core code.

**Architecture: Plugin Pattern**
- core/ — session management, runner engine
- behaviors/ — pluggable behavior modules (each behavior is a self-contained plugin)
- Adding a new automation = dropping a new file in behaviors/, zero changes elsewhere
- Multi-account session management with per-account state persistence

**Features**
- Content scraping from target accounts / hashtags
- Multi-account support with isolated sessions
- Configurable behaviors via JSON config
- Expandable: any new automation type is a new plugin

**Stack**
Python · Instaloader / custom session management · Plugin Pattern`,
    role: "Solo Developer",
    year: "2025",
    link: null,
    demo: null,
    published: true,
    display_order: 6,
    tech: [
      { name: "Python", usage: "Primary language" },
      { name: "Plugin Pattern", usage: "Architecture" },
      { name: "Instagram API", usage: "Scraping target" },
    ],
  },
  {
    slug: "gold-flossaluto",
    title: "Gold Flossaluto",
    description:
      "Modern landing page for Gold Flossaluto brand, built with Next.js and Firebase with smooth Framer Motion animations.",
    long_description: `Gold Flossaluto is a product landing page with a clean, modern design featuring smooth animations and Firebase integration for backend services.

**Features**
- Responsive landing page with polished UI
- Framer Motion animations for engagement
- Firebase for backend (hosting / data)
- Deployed and production-ready

**Stack**
Next.js · TypeScript · Firebase · Framer Motion · Tailwind CSS`,
    role: "Developer",
    year: "2025",
    link: null,
    demo: null,
    published: true,
    display_order: 7,
    tech: [
      { name: "Next.js", usage: "Framework" },
      { name: "TypeScript", usage: "Language" },
      { name: "Firebase", usage: "Backend & hosting" },
      { name: "Framer Motion", usage: "Animations" },
      { name: "Tailwind CSS", usage: "Styling" },
    ],
  },
];

// ─── Image Upload ──────────────────────────────────────────────────────────────
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);

function getImagesForSlug(slug) {
  const dir = join(ROOT, "portfolio-images", slug);
  if (!existsSync(dir)) return { cover: null, screenshots: [] };

  const files = readdirSync(dir)
    .filter((f) => {
      const ext = extname(f).toLowerCase();
      return IMAGE_EXTENSIONS.has(ext) && statSync(join(dir, f)).isFile();
    })
    .sort();

  if (files.length === 0) return { cover: null, screenshots: [] };

  // If there's a file named "cover.*", use it as cover regardless of sort order
  const coverFile = files.find((f) => f.toLowerCase().startsWith("cover"));
  if (coverFile) {
    const rest = files.filter((f) => f !== coverFile);
    return { cover: join(dir, coverFile), screenshots: rest.map((f) => join(dir, f)) };
  }

  const [first, ...rest] = files;
  return { cover: join(dir, first), screenshots: rest.map((f) => join(dir, f)) };
}

async function uploadFile(supabase, localPath, remotePath) {
  const buffer = readFileSync(localPath);
  const ext = extname(localPath).toLowerCase();
  const mimeMap = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
    ".gif": "image/gif",
    ".avif": "image/avif",
  };
  const contentType = mimeMap[ext] || "application/octet-stream";

  const { error } = await supabase.storage
    .from("images")
    .upload(remotePath, buffer, { contentType, upsert: true });

  if (error) throw new Error(`Storage upload failed for ${remotePath}: ${error.message}`);

  const { data } = supabase.storage.from("images").getPublicUrl(remotePath);
  return data.publicUrl;
}

async function uploadImagesForProject(supabase, slug) {
  const { cover, screenshots } = getImagesForSlug(slug);

  let coverUrl = null;
  const screenshotUrls = [];

  if (cover) {
    const remotePath = `projects/${slug}-cover${extname(cover).toLowerCase()}`;
    coverUrl = await uploadFile(supabase, cover, remotePath);
    console.log(`  ✓ Cover uploaded: ${remotePath}`);
  }

  for (let i = 0; i < screenshots.length; i++) {
    const f = screenshots[i];
    const remotePath = `projects/screenshots/${slug}-${String(i + 1).padStart(2, "0")}${extname(f).toLowerCase()}`;
    const url = await uploadFile(supabase, f, remotePath);
    screenshotUrls.push(url);
    console.log(`  ✓ Screenshot ${i + 1} uploaded: ${remotePath}`);
  }

  return { coverUrl, screenshotUrls };
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function main() {
  const env = loadEnv();
  const url = env["NEXT_PUBLIC_SUPABASE_URL"];
  const key = env["SUPABASE_SERVICE_ROLE_KEY"] || env["NEXT_PUBLIC_SUPABASE_ANON_KEY"];

  if (!url || !key) {
    throw new Error(
      "Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local"
    );
  }

  const supabase = createClient(url, key);

  console.log(`\n🚀 Portfolio Project Seeder`);
  console.log(`   Mode: ${DRY_RUN ? "DRY RUN (no writes)" : "LIVE"}`);
  console.log(`   Images: ${SKIP_IMAGES ? "SKIPPED" : "enabled"}`);
  console.log(`   Key type: ${env["SUPABASE_SERVICE_ROLE_KEY"] ? "service_role" : "anon"}\n`);

  for (const project of PROJECTS) {
    console.log(`\n📁 [${project.display_order}] ${project.title} (${project.slug})`);

    let imageUrl = null;
    let screenshotUrls = [];

    if (!SKIP_IMAGES && !DRY_RUN) {
      try {
        const result = await uploadImagesForProject(supabase, project.slug);
        imageUrl = result.coverUrl;
        screenshotUrls = result.screenshotUrls;
      } catch (err) {
        console.warn(`  ⚠ Image upload failed: ${err.message}`);
        console.warn(`    Put images in: portfolio-images/${project.slug}/`);
      }
    } else if (!SKIP_IMAGES) {
      const { cover, screenshots } = getImagesForSlug(project.slug);
      if (cover) console.log(`  → Would upload cover: ${cover}`);
      screenshots.forEach((s, i) => console.log(`  → Would upload screenshot ${i + 1}: ${s}`));
    }

    // Serialize tech entries to JSON strings (DB format: TEXT[])
    const techSerialized = project.tech.map((t) => JSON.stringify(t));

    const payload = {
      slug: project.slug,
      title: project.title,
      description: project.description,
      long_description: project.long_description,
      role: project.role,
      year: project.year,
      link: project.link,
      demo: project.demo,
      published: project.published,
      display_order: project.display_order,
      tech: techSerialized,
      ...(imageUrl ? { image: imageUrl } : {}),
      ...(screenshotUrls.length > 0 ? { screenshots: screenshotUrls } : {}),
      updated_at: new Date().toISOString(),
    };

    if (DRY_RUN) {
      console.log("  → Payload (dry run):", JSON.stringify(payload, null, 2).substring(0, 300) + "…");
      continue;
    }

    const { error } = await supabase
      .from("projects")
      .upsert(payload, { onConflict: "slug", ignoreDuplicates: false });

    if (error) {
      console.error(`  ✗ DB upsert failed: ${error.message}`);
    } else {
      console.log(`  ✓ Upserted to DB`);
    }
  }

  console.log("\n✅ Done!\n");
  console.log("📌 Next steps:");
  console.log("   1. Add images to portfolio-images/{slug}/ folders");
  console.log("   2. Re-run: node scripts/seed-projects.mjs");
  console.log("   3. Edit descriptions/links at /admin/projects");
}

main().catch((err) => {
  console.error("\n❌ Fatal:", err.message);
  process.exit(1);
});

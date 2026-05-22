// ============================================================
// Intake Pipeline — Tipos e Schema
// Alinhado com: docs/ai-intake-pipeline.md
// ============================================================

export type IntakeHabilidade = {
  name: string;
  label: string;
  type:
    | "frontend"
    | "backend"
    | "database"
    | "devops"
    | "all"
    | "softskill"
    | "default";
  link: string | null;
  icon_url?: string | null;
};

export type IntakeProject = {
  slug: string;
  title: string;
  summary_line: string | null;
  period: string | null;
  technologies: string[];
  description: string;
  image_url: string | null;
  production_link: string | null;
  repository_link: string | null;
  details_goal: string | null;
  details_highlights: string[];
  details_impact: string | null;
};

export type IntakeExperience = {
  slug: string;
  title: string;
  location: string | null;
  period: string | null;
  role: string | null;
  summary: string;
  achievements: string[];
  skills_learned: string[];
  image_urls: string[];
  intro_title: string | null;
  intro: string | null;
};

export type IntakeDraft = {
  habilidades: IntakeHabilidade[];
  projects: IntakeProject[];
  experiences: IntakeExperience[];
  warnings: string[];
  resume_tex?: string | null;
};

export type ValidationResult = {
  valid: boolean;
  errors: string[];
  warnings: string[];
};

// Enum válidos para o tipo de habilidade
const VALID_HABILIDADE_TYPES = [
  "frontend",
  "backend",
  "database",
  "devops",
  "all",
  "softskill",
  "default",
] as const;

// Regex para slugs válidos
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Regex simplificado de URL
const URL_RE = /^https?:\/\/.+/;

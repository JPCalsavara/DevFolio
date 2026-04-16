import { supabaseServer } from "@/lib/supabase/server";
import {
  experiencesData,
  experiencesDetailsData,
  projectsData,
  skillsData,
  tagsData,
} from "@/data/portfolioData";

export type PortfolioTechnology = {
  id: string;
  name: string;
  label: string;
  type: string;
  isVisible: boolean;
  link: string | null;
  iconUrl: string | null;
};

export type PortfolioProject = {
  id: string;
  slug: string;
  title: string;
  summaryLine: string | null;
  period: string | null;
  tecnosUsed: string[];
  description: string;
  imageUrl: string | null;
  produtionLink: string | null;
  repositoryLink: string | null;
  detailsGoal: string | null;
  detailsHighlights: string[];
  detailsImpact: string | null;
  createdAt: string;
};

export type PortfolioExperience = {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  period: string | null;
  role: string | null;
  summary: string;
  achievements: string[];
  skillsLearned: string[];
  imageUrls: string[];
  introTitle: string | null;
  intro: string | null;
  createdAt: string;
};

export type TechnologyTagMap = Record<
  string,
  { category: string; link?: string; realName?: string }
>;

export type LegendItem = {
  label: string;
  color: string;
  type: string;
};

const DEFAULT_LEGEND: LegendItem[] = [
  { label: "Frontend", color: "#FB7185", type: "frontend" },
  { label: "Backend", color: "#A3E635", type: "backend" },
  { label: "Database", color: "#F59E0B", type: "database" },
  { label: "DevOps", color: "#22D3EE", type: "devops" },
  { label: "Soft Skills", color: "#34D399", type: "softskill" },
  { label: "All", color: "#A78BFA", type: "all" },
  { label: "Default", color: "#64748B", type: "default" },
];

const HIDDEN_SKILL_TYPES = new Set(["hidden", "internal", "private"]);

function parseTechnologyType(rawType: string | null): {
  type: string;
  isVisible: boolean;
} {
  const normalized = (rawType || "default").trim();
  const normalizedLower = normalized.toLowerCase();

  if (normalizedLower.startsWith("hidden:")) {
    const baseType = normalized.slice(7).trim() || "default";
    return { type: baseType, isVisible: false };
  }

  if (HIDDEN_SKILL_TYPES.has(normalizedLower)) {
    return { type: "default", isVisible: false };
  }

  return { type: normalized || "default", isVisible: true };
}

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  summary_line: string | null;
  period: string | null;
  technologies: string[] | null;
  description: string;
  image_url: string | null;
  production_link: string | null;
  repository_link: string | null;
  details_goal: string | null;
  details_highlights: string[] | null;
  details_impact: string | null;
  created_at: string;
};

type ExperienceRow = {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  period: string | null;
  role: string | null;
  summary: string;
  achievements: string[] | null;
  skills_learned: string[] | null;
  image_urls: string[] | null;
  intro_title: string | null;
  intro: string | null;
  created_at: string;
};

type TechnologyRow = {
  id: string;
  name: string;
  label: string | null;
  type: string | null;
  link: string | null;
  icon_url: string | null;
};

function mapProject(row: ProjectRow): PortfolioProject {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    summaryLine: row.summary_line,
    period: row.period,
    tecnosUsed: row.technologies ?? [],
    description: row.description,
    imageUrl: row.image_url,
    produtionLink: row.production_link,
    repositoryLink: row.repository_link,
    detailsGoal: row.details_goal,
    detailsHighlights: row.details_highlights ?? [],
    detailsImpact: row.details_impact,
    createdAt: row.created_at,
  };
}

function mapExperience(row: ExperienceRow): PortfolioExperience {
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    location: row.location,
    period: row.period,
    role: row.role,
    summary: row.summary,
    achievements: row.achievements ?? [],
    skillsLearned: row.skills_learned ?? [],
    imageUrls: row.image_urls ?? [],
    introTitle: row.intro_title,
    intro: row.intro,
    createdAt: row.created_at,
  };
}

function mapTechnology(row: TechnologyRow): PortfolioTechnology {
  const parsed = parseTechnologyType(row.type);

  return {
    id: row.id,
    name: row.name,
    label: row.label ?? row.name,
    type: parsed.type,
    isVisible: parsed.isVisible,
    link: row.link,
    iconUrl: row.icon_url,
  };
}

function normalizeType(category: string | undefined): string {
  return category || "default";
}

function fallbackProjects(): PortfolioProject[] {
  return projectsData.map((project) => ({
    id: `legacy-project-${project.slug}`,
    slug: project.slug,
    title: project.title,
    summaryLine: project.summaryLine ?? null,
    period: project.period ?? null,
    tecnosUsed: project.tecnosUsed ?? [],
    description: project.description,
    imageUrl: project.urlName ? `/images/projects/${project.urlName}` : null,
    produtionLink: project.produtionLink || null,
    repositoryLink: project.repositoryLink || null,
    detailsGoal: null,
    detailsHighlights: [],
    detailsImpact: null,
    createdAt: new Date(0).toISOString(),
  }));
}

function fallbackExperiences(): PortfolioExperience[] {
  return experiencesData.map((experience) => {
    const imageUrls = experience.imageNames?.length
      ? experience.imageNames.map((name) => `/images/experiences/${name}`)
      : experience.imageName
        ? [`/images/experiences/${experience.imageName}`]
        : [];

    return {
      id: `legacy-experience-${experience.slug || experience.title}`,
      slug:
        experience.slug || experience.title.toLowerCase().replace(/\s+/g, "-"),
      title: experience.title,
      location: experience.location || null,
      period: experience.period || null,
      role: experience.role || null,
      summary: experience.summary,
      achievements: experience.achievements ?? [],
      skillsLearned: experience.skillsLearned,
      imageUrls,
      introTitle: experience.title,
      intro: experience.summary,
      createdAt: new Date(0).toISOString(),
    };
  });
}

function fallbackExperienceBySlug(slug: string): PortfolioExperience | null {
  const detail = experiencesDetailsData.find((item) => item.slug === slug);

  if (detail && detail.sections.length > 0) {
    const section = detail.sections[0];
    const imageUrls = section.imageNames?.length
      ? section.imageNames.map((name) => `/images/experiences/${name}`)
      : section.imageName
        ? [`/images/experiences/${section.imageName}`]
        : [];

    return {
      id: `legacy-experience-${detail.slug}`,
      slug: detail.slug,
      title: detail.title,
      location: section.location || null,
      period: section.period || null,
      role: section.role || null,
      summary: section.summary,
      achievements: section.achievements ?? [],
      skillsLearned: section.skillsLearned,
      imageUrls,
      introTitle: detail.introTitle,
      intro: detail.intro,
      createdAt: new Date(0).toISOString(),
    };
  }

  return (
    fallbackExperiences().find((experience) => experience.slug === slug) || null
  );
}

function fallbackTechnologies(): PortfolioTechnology[] {
  const fromSkills = skillsData.map((skill) => ({
    id: `legacy-tech-${skill.name}`,
    name: skill.name,
    label: skill.label,
    type: normalizeType(skill.type),
    isVisible: true,
    link: skill.link || null,
    iconUrl: null,
  }));

  const fromTags = Object.entries(tagsData).map(([name, info]) => ({
    id: `legacy-tech-${name}`,
    name,
    label: info.realName || name,
    type: normalizeType(info.category),
    isVisible: true,
    link: info.link || null,
    iconUrl: null,
  }));

  const merged = new Map<string, PortfolioTechnology>();

  [...fromTags, ...fromSkills].forEach((tech) => {
    merged.set(tech.name, tech);
  });

  return Array.from(merged.values()).sort((a, b) =>
    a.label.localeCompare(b.label),
  );
}

export async function getPortfolioProjects(): Promise<PortfolioProject[]> {
  const { data, error } = await supabaseServer
    .from("projects")
    .select(
      "id, slug, title, summary_line, period, technologies, description, image_url, production_link, repository_link, details_goal, details_highlights, details_impact, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading projects from Supabase", error.message);
    return fallbackProjects();
  }

  if (!data || data.length === 0) {
    return fallbackProjects();
  }

  return (data as ProjectRow[]).map(mapProject);
}

export async function getPortfolioProjectBySlug(
  slug: string,
): Promise<PortfolioProject | null> {
  const { data, error } = await supabaseServer
    .from("projects")
    .select(
      "id, slug, title, summary_line, period, technologies, description, image_url, production_link, repository_link, details_goal, details_highlights, details_impact, created_at",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error("Error loading project by slug from Supabase", error.message);
    return fallbackProjects().find((project) => project.slug === slug) || null;
  }

  if (!data) {
    return fallbackProjects().find((project) => project.slug === slug) || null;
  }

  return mapProject(data as ProjectRow);
}

export async function getPortfolioExperiences(): Promise<
  PortfolioExperience[]
> {
  const { data, error } = await supabaseServer
    .from("experiences")
    .select(
      "id, slug, title, location, period, role, summary, achievements, skills_learned, image_urls, intro_title, intro, created_at",
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error loading experiences from Supabase", error.message);
    return fallbackExperiences();
  }

  if (!data || data.length === 0) {
    return fallbackExperiences();
  }

  return (data as ExperienceRow[]).map(mapExperience);
}

export async function getPortfolioExperienceBySlug(
  slug: string,
): Promise<PortfolioExperience | null> {
  const { data, error } = await supabaseServer
    .from("experiences")
    .select(
      "id, slug, title, location, period, role, summary, achievements, skills_learned, image_urls, intro_title, intro, created_at",
    )
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(
      "Error loading experience by slug from Supabase",
      error.message,
    );
    return fallbackExperienceBySlug(slug);
  }

  if (!data) {
    return fallbackExperienceBySlug(slug);
  }

  return mapExperience(data as ExperienceRow);
}

export async function getPortfolioTechnologies(): Promise<
  PortfolioTechnology[]
> {
  const { data, error } = await supabaseServer
    .from("habilidades")
    .select("id, name, label, type, link, icon_url")
    .order("label", { ascending: true });

  if (error) {
    console.error("Error loading technologies from Supabase", error.message);
    return fallbackTechnologies();
  }

  if (!data || data.length === 0) {
    return fallbackTechnologies();
  }

  return (data as TechnologyRow[]).map(mapTechnology);
}

export function buildTechnologyTagMap(
  technologies: PortfolioTechnology[],
): TechnologyTagMap {
  return technologies.reduce<TechnologyTagMap>((acc, technology) => {
    acc[technology.name] = {
      category: technology.type,
      realName: technology.label,
      link: technology.link ?? undefined,
    };
    return acc;
  }, {});
}

export function buildLegendItems(
  technologies: PortfolioTechnology[],
): LegendItem[] {
  const uniqueTypes = Array.from(
    new Set(technologies.map((technology) => technology.type || "default")),
  );

  const known = DEFAULT_LEGEND.filter((item) =>
    uniqueTypes.includes(item.type),
  );
  const unknown = uniqueTypes
    .filter((type) => !DEFAULT_LEGEND.some((item) => item.type === type))
    .map((type) => ({
      type,
      label: type.charAt(0).toUpperCase() + type.slice(1),
      color: "#64748B",
    }));

  return [...known, ...unknown];
}

export function filterVisiblePortfolioTechnologies(
  technologies: PortfolioTechnology[],
): PortfolioTechnology[] {
  return technologies.filter((technology) => {
    if (technology.isVisible === false) {
      return false;
    }

    const type = (technology.type || "").trim().toLowerCase();
    return !HIDDEN_SKILL_TYPES.has(type) && !type.startsWith("hidden:");
  });
}

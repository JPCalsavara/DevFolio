import type {
  IntakeDraft,
  IntakeHabilidade,
  IntakeProject,
  IntakeExperience,
  ValidationResult,
} from "./schema";

const VALID_HABILIDADE_TYPES = [
  "frontend",
  "backend",
  "database",
  "devops",
  "all",
  "softskill",
  "default",
];

const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const URL_RE = /^https?:\/\/.+/;

function isValidUrl(value: string | null): boolean {
  if (!value) return true; // null is allowed
  return URL_RE.test(value);
}

// ── Habilidades ────────────────────────────────────────────
function validateHabilidade(h: IntakeHabilidade, idx: number): string[] {
  const errs: string[] = [];
  const ctx = `habilidades[${idx}]`;

  if (!h.name?.trim()) errs.push(`${ctx}: 'name' é obrigatório`);
  if (!h.label?.trim()) errs.push(`${ctx}: 'label' é obrigatório`);
  if (!VALID_HABILIDADE_TYPES.includes(h.type)) {
    errs.push(`${ctx}: 'type' inválido "${h.type}". Válidos: ${VALID_HABILIDADE_TYPES.join(", ")}`);
  }
  if (h.link && !isValidUrl(h.link)) {
    errs.push(`${ctx}: 'link' não é uma URL válida: "${h.link}"`);
  }
  if (h.name?.length > 60) {
    errs.push(`${ctx}: 'name' excede 60 caracteres`);
  }
  if (h.label?.length > 80) {
    errs.push(`${ctx}: 'label' excede 80 caracteres`);
  }

  return errs;
}

// ── Projects ───────────────────────────────────────────────
function validateProject(p: IntakeProject, idx: number): string[] {
  const errs: string[] = [];
  const ctx = `projects[${idx}]`;

  if (!p.slug?.trim()) {
    errs.push(`${ctx}: 'slug' é obrigatório`);
  } else if (!SLUG_RE.test(p.slug)) {
    errs.push(`${ctx}: 'slug' inválido "${p.slug}" — use kebab-case (ex: meu-projeto)`);
  }

  if (!p.title?.trim()) errs.push(`${ctx}: 'title' é obrigatório`);
  if (!p.description?.trim()) errs.push(`${ctx}: 'description' é obrigatório`);

  if (!Array.isArray(p.technologies)) {
    errs.push(`${ctx}: 'technologies' deve ser um array`);
  }
  if (!Array.isArray(p.details_highlights)) {
    errs.push(`${ctx}: 'details_highlights' deve ser um array`);
  }

  if (p.production_link && !isValidUrl(p.production_link)) {
    errs.push(`${ctx}: 'production_link' não é uma URL válida`);
  }
  if (p.repository_link && !isValidUrl(p.repository_link)) {
    errs.push(`${ctx}: 'repository_link' não é uma URL válida`);
  }
  if (p.image_url && !isValidUrl(p.image_url)) {
    errs.push(`${ctx}: 'image_url' não é uma URL válida`);
  }

  if (p.title?.length > 120) errs.push(`${ctx}: 'title' excede 120 caracteres`);
  if (p.description?.length > 4000) errs.push(`${ctx}: 'description' excede 4000 caracteres`);

  return errs;
}

// ── Experiences ────────────────────────────────────────────
function validateExperience(e: IntakeExperience, idx: number): string[] {
  const errs: string[] = [];
  const ctx = `experiences[${idx}]`;

  if (!e.slug?.trim()) {
    errs.push(`${ctx}: 'slug' é obrigatório`);
  } else if (!SLUG_RE.test(e.slug)) {
    errs.push(`${ctx}: 'slug' inválido "${e.slug}" — use kebab-case`);
  }

  if (!e.title?.trim()) errs.push(`${ctx}: 'title' é obrigatório`);
  if (!e.summary?.trim()) errs.push(`${ctx}: 'summary' é obrigatório`);

  if (!Array.isArray(e.achievements)) {
    errs.push(`${ctx}: 'achievements' deve ser um array`);
  }
  if (!Array.isArray(e.skills_learned)) {
    errs.push(`${ctx}: 'skills_learned' deve ser um array`);
  }
  if (!Array.isArray(e.image_urls)) {
    errs.push(`${ctx}: 'image_urls' deve ser um array`);
  }

  (e.image_urls ?? []).forEach((url, i) => {
    if (!isValidUrl(url)) {
      errs.push(`${ctx}: 'image_urls[${i}]' não é uma URL válida: "${url}"`);
    }
  });

  return errs;
}

// ── Entrada pública ────────────────────────────────────────
export function validateIntakeDraft(draft: unknown): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Checa se é um objeto e tem as chaves raiz esperadas
  if (!draft || typeof draft !== "object") {
    return { valid: false, errors: ["Payload não é um objeto JSON válido"], warnings: [] };
  }

  const d = draft as Record<string, unknown>;

  if (!Array.isArray(d.habilidades)) errors.push("'habilidades' deve ser um array");
  if (!Array.isArray(d.projects)) errors.push("'projects' deve ser um array");
  if (!Array.isArray(d.experiences)) errors.push("'experiences' deve ser um array");

  if (errors.length > 0) return { valid: false, errors, warnings };

  const typed = draft as IntakeDraft;

  // Valida cada entidade
  typed.habilidades.forEach((h, i) => errors.push(...validateHabilidade(h, i)));
  typed.projects.forEach((p, i) => errors.push(...validateProject(p, i)));
  typed.experiences.forEach((e, i) => errors.push(...validateExperience(e, i)));

  // Propaga os warnings do agente
  if (Array.isArray(typed.warnings)) {
    warnings.push(...typed.warnings.map((w) => `[AI] ${w}`));
  }

  // Aviso: arrays vazios
  if (typed.habilidades.length === 0) warnings.push("Nenhuma habilidade no draft");
  if (typed.projects.length === 0) warnings.push("Nenhum projeto no draft");
  if (typed.experiences.length === 0) warnings.push("Nenhuma experiência no draft");

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

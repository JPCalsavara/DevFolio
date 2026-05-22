import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import type { IntakeDraft } from "@/lib/intake/schema";
import { validateIntakeDraft } from "@/lib/intake/validate";

// ============================================================
// POST /api/intake/apply
// Body: { draft: IntakeDraft }
// Protegida: requer Authorization: Bearer <supabase_access_token>
// Retorna: { applied: { habilidades: number, projects: number, experiences: number }, errors: string[] }
// ============================================================

type ApplyReport = {
  applied: { habilidades: number; projects: number; experiences: number };
  errors: string[];
};

export async function POST(req: NextRequest) {
  // ── Autenticação ─────────────────────────────────────────
  const authHeader = req.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return NextResponse.json({ error: "Autenticação obrigatória" }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: `Bearer ${token}` } } }
  );

  const { data: { user }, error: authError } = await supabase.auth.getUser();
  if (authError || !user) {
    return NextResponse.json({ error: "Token inválido ou expirado" }, { status: 401 });
  }

  // ── Parse do body ─────────────────────────────────────────
  let draft: IntakeDraft;
  try {
    const body = await req.json();
    if (!body?.draft) {
      return NextResponse.json({ error: "'draft' é obrigatório no body" }, { status: 400 });
    }
    draft = body.draft as IntakeDraft;
  } catch {
    return NextResponse.json({ error: "Body JSON inválido" }, { status: 400 });
  }

  // ── Re-validação antes de escrever ────────────────────────
  const validation = validateIntakeDraft(draft);
  if (!validation.valid) {
    return NextResponse.json(
      { error: "Draft inválido. Valide antes de aplicar.", errors: validation.errors },
      { status: 422 }
    );
  }

  const report: ApplyReport = {
    applied: { habilidades: 0, projects: 0, experiences: 0 },
    errors: [],
  };

  // ── 1. Upsert habilidades (chave: name) ───────────────────
  if (draft.habilidades.length > 0) {
    const { error } = await supabase
      .from("habilidades")
      .upsert(
        draft.habilidades.map((h) => ({
          name: h.name,
          label: h.label,
          type: h.type,
          link: h.link ?? null,
          icon_url: h.icon_url ?? null,
        })),
        { onConflict: "name" }
      );

    if (error) {
      report.errors.push(`habilidades: ${error.message}`);
    } else {
      report.applied.habilidades = draft.habilidades.length;
    }
  }

  // ── 2. Upsert experiences (chave: slug) ───────────────────
  if (draft.experiences.length > 0) {
    const { error } = await supabase
      .from("experiences")
      .upsert(
        draft.experiences.map((e) => ({
          slug: e.slug,
          title: e.title,
          location: e.location ?? null,
          period: e.period ?? null,
          role: e.role ?? null,
          summary: e.summary,
          achievements: e.achievements,
          skills_learned: e.skills_learned,
          image_urls: e.image_urls,
          intro_title: e.intro_title ?? null,
          intro: e.intro ?? null,
        })),
        { onConflict: "slug" }
      );

    if (error) {
      report.errors.push(`experiences: ${error.message}`);
    } else {
      report.applied.experiences = draft.experiences.length;
    }
  }

  // ── 3. Upsert projects (chave: slug) ──────────────────────
  if (draft.projects.length > 0) {
    const { error } = await supabase
      .from("projects")
      .upsert(
        draft.projects.map((p) => ({
          slug: p.slug,
          title: p.title,
          summary_line: p.summary_line ?? null,
          period: p.period ?? null,
          technologies: p.technologies,
          description: p.description,
          image_url: p.image_url ?? null,
          production_link: p.production_link ?? null,
          repository_link: p.repository_link ?? null,
          details_goal: p.details_goal ?? null,
          details_highlights: p.details_highlights,
          details_impact: p.details_impact ?? null,
        })),
        { onConflict: "slug" }
      );

    if (error) {
      report.errors.push(`projects: ${error.message}`);
    } else {
      report.applied.projects = draft.projects.length;
    }
  }

  const status = report.errors.length > 0 ? 207 : 200; // 207 = Multi-Status (parcial)
  return NextResponse.json(report, { status });
}

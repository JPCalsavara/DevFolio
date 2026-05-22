import { NextRequest, NextResponse } from "next/server";
import type { IntakeDraft } from "@/lib/intake/schema";

// ============================================================
// POST /api/intake/parse
// Body: { cv_text: string, github_links: string[], project_links: string[], notes?: string }
// Retorna: { draft: IntakeDraft }
// ============================================================

const SYSTEM_PROMPT = `You are a data extraction assistant for a software portfolio.
Return ONLY valid JSON with no markdown fences, no explanation, no extra text.

Rules:
- Keep original Portuguese accents and cedilha exactly as they appear.
- Infer slugs in kebab-case from the title (lowercase, hyphens only).
- Technology names must use canonical keys: react, dotnet, csharp, postgres, nextjs, node, docker, kubernetes, typescript, python, aws, etc.
- If uncertain about a field, set it to null and add a descriptive item to the warnings array.
- Do not invent private or unverifiable claims.

Return this exact JSON shape:
{
  "habilidades": [
    {"name": "string", "label": "string", "type": "frontend|backend|database|devops|all|softskill|default", "link": "string|null", "icon_url": null}
  ],
  "projects": [
    {
      "slug": "string",
      "title": "string",
      "summary_line": "string|null",
      "period": "string|null",
      "technologies": ["string"],
      "description": "string",
      "image_url": null,
      "production_link": "string|null",
      "repository_link": "string|null",
      "details_goal": "string|null",
      "details_highlights": ["string"],
      "details_impact": "string|null"
    }
  ],
  "experiences": [
    {
      "slug": "string",
      "title": "string",
      "location": "string|null",
      "period": "string|null",
      "role": "string|null",
      "summary": "string",
      "achievements": ["string"],
      "skills_learned": ["string"],
      "image_urls": [],
      "intro_title": "string|null",
      "intro": "string|null"
    }
  ],
  "warnings": ["string"]
}`;

function buildUserPrompt(
  cvText: string,
  githubLinks: string[],
  projectLinks: string[],
  notes: string
): string {
  return [
    `CV Text:\n${cvText}`,
    githubLinks.length > 0 ? `GitHub Links:\n${githubLinks.join("\n")}` : "",
    projectLinks.length > 0 ? `Project Links:\n${projectLinks.join("\n")}` : "",
    notes ? `Additional Notes:\n${notes}` : "",
  ]
    .filter(Boolean)
    .join("\n\n---\n\n");
}

// Fallback mock quando a API key não está configurada
function buildMockDraft(): IntakeDraft {
  return {
    habilidades: [
      { name: "typescript", label: "TypeScript", type: "frontend", link: "https://www.typescriptlang.org", icon_url: null },
      { name: "nextjs", label: "Next.js", type: "frontend", link: "https://nextjs.org", icon_url: null },
      { name: "node", label: "Node.js", type: "backend", link: "https://nodejs.org", icon_url: null },
      { name: "docker", label: "Docker", type: "devops", link: "https://docker.com", icon_url: null },
      { name: "postgres", label: "PostgreSQL", type: "database", link: "https://postgresql.org", icon_url: null },
    ],
    projects: [
      {
        slug: "meu-projeto-exemplo",
        title: "Meu Projeto Exemplo",
        summary_line: "Projeto gerado como mock de exemplo",
        period: "2024",
        technologies: ["typescript", "nextjs", "postgres"],
        description: "Este é um projeto de demonstração gerado automaticamente. Substitua com dados reais do seu CV.",
        image_url: null,
        production_link: null,
        repository_link: null,
        details_goal: "Demonstrar o pipeline de intake",
        details_highlights: ["Feature A", "Feature B"],
        details_impact: null,
      },
    ],
    experiences: [
      {
        slug: "empresa-exemplo",
        title: "Empresa Exemplo",
        location: "São Paulo, BR",
        period: "Jan 2023 – Presente",
        role: "Desenvolvedor Backend",
        summary: "Exemplo de experiência profissional. Substitua com dados reais do seu CV.",
        achievements: ["Redução de latência em 40%", "Implementação de CI/CD"],
        skills_learned: ["node", "docker", "postgres"],
        image_urls: [],
        intro_title: null,
        intro: null,
      },
    ],
    warnings: [
      "MOCK: API key Gemini não configurada. Configure GEMINI_API_KEY no .env para análise real.",
    ],
  };
}

async function callGemini(userPrompt: string, apiKey: string): Promise<IntakeDraft> {
  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: [{ parts: [{ text: userPrompt }] }],
        generationConfig: {
          response_mime_type: "application/json",
          temperature: 0.1,
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.text();
    throw new Error(`Gemini API error ${response.status}: ${err}`);
  }

  const data = await response.json();
  const rawText: string =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

  return JSON.parse(rawText) as IntakeDraft;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      cv_text = "",
      github_links = [],
      project_links = [],
      notes = "",
    } = body as {
      cv_text?: string;
      github_links?: string[];
      project_links?: string[];
      notes?: string;
    };

    if (!cv_text.trim() && github_links.length === 0 && project_links.length === 0) {
      return NextResponse.json(
        { error: "Forneça ao menos cv_text ou links para análise" },
        { status: 400 }
      );
    }

    const apiKey = process.env.GEMINI_API_KEY ?? "";

    let draft: IntakeDraft;
    if (!apiKey) {
      // Fallback mock — útil para desenvolvimento e testes
      draft = buildMockDraft();
    } else {
      const userPrompt = buildUserPrompt(cv_text, github_links, project_links, notes);
      draft = await callGemini(userPrompt, apiKey);
    }

    return NextResponse.json({ draft }, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

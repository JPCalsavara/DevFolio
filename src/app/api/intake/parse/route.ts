import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import * as path from "path";
import type { IntakeDraft } from "@/lib/intake/schema";

// ============================================================
// POST /api/intake/parse
// Body: FormData (cv_file?, cv_text, github_links, project_links, notes, tune_content, generate_resume)
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

Return this exact JSON shape (if generate_resume is asked, include resume_tex):
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
  "warnings": ["string"],
  "resume_tex": "string|null"
}`;

// Fallback mock quando a API key não está configurada
function buildMockDraft(): IntakeDraft {
  return {
    habilidades: [{ name: "typescript", label: "TypeScript", type: "frontend", link: null, icon_url: null }],
    projects: [],
    experiences: [],
    warnings: ["MOCK: API key Gemini não configurada."],
    resume_tex: null
  };
}

async function callGemini(
  systemPrompt: string,
  userPrompt: string,
  fileBase64: string | null,
  fileMimeType: string | null,
  apiKey: string
): Promise<IntakeDraft> {
  const parts: any[] = [];
  
  if (fileBase64 && fileMimeType) {
    parts.push({
      inlineData: {
        mimeType: fileMimeType,
        data: fileBase64
      }
    });
  }
  
  parts.push({ text: userPrompt });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: systemPrompt }] },
        contents: [{ parts }],
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
  const rawText: string = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";
  
  try {
    return JSON.parse(rawText) as IntakeDraft;
  } catch (e) {
    throw new Error("Gemini returned invalid JSON");
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    
    const cvFile = formData.get("cv_file") as File | null;
    const cvText = formData.get("cv_text") as string ?? "";
    const githubLinksStr = formData.get("github_links") as string ?? "";
    const projectLinksStr = formData.get("project_links") as string ?? "";
    const notes = formData.get("notes") as string ?? "";
    const tuneContent = formData.get("tune_content") === "true";
    const generateResume = formData.get("generate_resume") === "true";
    const customApiKey = formData.get("custom_api_key") as string ?? "";

    const githubLinks = githubLinksStr.split("\\n").map((l) => l.trim()).filter(Boolean);
    const projectLinks = projectLinksStr.split("\\n").map((l) => l.trim()).filter(Boolean);

    if (!cvFile && !cvText.trim() && githubLinks.length === 0 && projectLinks.length === 0) {
      return NextResponse.json(
        { error: "Forneça ao menos um arquivo PDF, texto de CV ou links para análise" },
        { status: 400 }
      );
    }

    const apiKey = customApiKey || process.env.GEMINI_API_KEY || "";
    if (!apiKey) {
      return NextResponse.json(
        { error: "Chave da API do Gemini não configurada. Defina no .env ou insira na interface." },
        { status: 400 }
      );
    }

    // Processamento do arquivo
    let fileBase64: string | null = null;
    let fileMimeType: string | null = null;

    if (cvFile) {
      const buffer = await cvFile.arrayBuffer();
      fileBase64 = Buffer.from(buffer).toString("base64");
      fileMimeType = cvFile.type;
    }

    // Processamento do Template LaTeX
    let latexTemplate = "";
    if (generateResume) {
      try {
        const templatePath = path.join(process.cwd(), "resume-template", "resumes", "pt-br", "curriculo.tex");
        latexTemplate = fs.readFileSync(templatePath, "utf-8");
      } catch (e) {
        console.warn("Template LaTeX não encontrado:", e);
      }
    }

    // Construção do Prompt do Usuário
    const promptParts = [];
    if (cvText) promptParts.push(`CV Text:\n${cvText}`);
    if (githubLinks.length > 0) promptParts.push(`GitHub Links:\n${githubLinks.join("\n")}`);
    if (projectLinks.length > 0) promptParts.push(`Project Links:\n${projectLinks.join("\n")}`);
    if (notes) promptParts.push(`Additional Notes:\n${notes}`);
    
    if (tuneContent) {
      promptParts.push("ACTION REQUESTED: Tune the content! Improve the descriptions of experiences and projects by using strong action verbs (Method STAR). Make the professional profile sound impactful and senior.");
    } else {
      promptParts.push("ACTION REQUESTED: Exact extraction! Do NOT alter the wording of the experiences or projects. Just extract them exactly as written.");
    }

    if (generateResume && latexTemplate) {
      promptParts.push(
        "ACTION REQUESTED: Generate LaTeX Resume!\n" +
        "Using the data provided above, generate a complete LaTeX document based STRICTLY on the template below.\n" +
        "DO NOT remove the copyright header: '% Copyright © 2025 Celio B Junior. All rights reserved.'\n" +
        "Make sure to escape special LaTeX characters (like %, &, $, #, _). Return the full LaTeX string inside the 'resume_tex' JSON field.\n\n" +
        "--- TEMPLATE START ---\n" +
        latexTemplate +
        "\n--- TEMPLATE END ---"
      );
    }

    const userPrompt = promptParts.join("\n\n---\n\n");

    const draft = await callGemini(SYSTEM_PROMPT, userPrompt, fileBase64, fileMimeType, apiKey);

    return NextResponse.json({ draft }, { status: 200 });
  } catch (err) {
    console.error("Parse Error:", err);
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

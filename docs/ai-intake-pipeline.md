# AI Intake Pipeline (CV + Links -> Supabase)

## Objective

Build a semi-automatic flow where a person uploads a CV and project links, an AI agent returns structured JSON, a human reviews the payload, and only then the system writes to Supabase.

## Recommended Flow

1. Intake form receives: `cv_file`, `github_links[]`, `project_links[]`, optional notes.
2. Backend extracts text from CV (PDF/DOCX) and fetches public metadata from links.
3. MCP/agent receives normalized text + strict instructions and must return only JSON.
4. Backend validates JSON against schema.
5. Admin review screen shows parsed data and editable fields.
6. User approves and backend performs upserts to `habilidades`, `projects`, `experiences`.

## Why This Is Safe

- Agent cannot write directly to DB.
- JSON is schema-validated first.
- Human approval is required before persistence.
- Upsert uses stable keys (`name` for habilidades, `slug` for projects/experiences).

## Prompt Template (Agent)

Use this prompt with your MCP agent/subagent:

```text
You are a data extraction assistant for a software portfolio.
Return ONLY valid JSON. Do not include markdown.

Input:
- CV text: {{CV_TEXT}}
- GitHub links: {{GITHUB_LINKS}}
- Project links: {{PROJECT_LINKS}}

Rules:
- Keep original Portuguese accents and cedilha exactly when present.
- Infer slugs in kebab-case.
- Keep technology names aligned with canonical keys (react, dotnet, csharp, postgres, etc).
- If uncertain, keep field null and add item to warnings.
- Do not invent private or unverifiable claims.

Output JSON schema:
{
  "habilidades": [
    {"name": "string", "label": "string", "type": "frontend|backend|database|devops|all|softskill|default", "link": "string|null"}
  ],
  "projects": [
    {
      "slug": "string",
      "title": "string",
      "summary_line": "string|null",
      "period": "string|null",
      "technologies": ["string"],
      "description": "string",
      "image_url": "string|null",
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
      "image_urls": ["string"],
      "intro_title": "string|null",
      "intro": "string|null"
    }
  ],
  "warnings": ["string"]
}
```

## Validation Step (Required)

Before writing to DB:

- Validate JSON shape and enum values.
- Enforce max lengths by column.
- Ensure arrays are arrays (never comma string).
- Validate URLs.
- Ensure `technologies`/`skills_learned` reference known `habilidades.name` or collect warning.

## Upsert Strategy

- `habilidades`: upsert by `name`.
- `projects`: upsert by `slug`.
- `experiences`: upsert by `slug`.

## MCP Integration Options

- Option A (recommended): backend calls agent, gets JSON, validates, saves draft for review.
- Option B: agent writes draft JSON file in workspace, admin imports this file to review UI.

## Suggested Next Implementation

1. Create `/api/intake/parse` (CV + links -> draft JSON).
2. Create `/api/intake/validate` (draft -> structured errors/warnings).
3. Create `/api/intake/apply` (approved draft -> Supabase upserts in transaction-safe order).
4. Add admin page `admin/intake` with diff/review UI.

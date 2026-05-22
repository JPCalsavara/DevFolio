import { NextRequest, NextResponse } from "next/server";
import { validateIntakeDraft } from "@/lib/intake/validate";

// ============================================================
// POST /api/intake/validate
// Body: { draft: IntakeDraft }
// Retorna: { valid: boolean, errors: string[], warnings: string[] }
// ============================================================

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { draft } = body as { draft?: unknown };

    if (!draft) {
      return NextResponse.json(
        { error: "'draft' é obrigatório no body" },
        { status: 400 }
      );
    }

    const result = validateIntakeDraft(draft);

    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

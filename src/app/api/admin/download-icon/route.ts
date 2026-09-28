import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import { getDeviconUrl } from "@/lib/techIcons";

export async function POST(req: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";
  if (!isDev) {
    return NextResponse.json(
      { success: false, error: "Download local disponível apenas em modo desenvolvimento." },
      { status: 403 },
    );
  }

  try {
    const body = await req.json();
    const { name, url } = body;

    if (!name) {
      return NextResponse.json(
        { success: false, error: "Nome da tecnologia é obrigatório." },
        { status: 400 },
      );
    }

    const targetUrl = url?.trim() || getDeviconUrl(name);
    const res = await fetch(targetUrl);

    if (!res.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Falha ao buscar ícone em ${targetUrl} (Status: ${res.status})`,
        },
        { status: 502 },
      );
    }

    const contentType = res.headers.get("content-type") || "";
    let ext = ".svg";
    if (contentType.includes("image/png") || targetUrl.endsWith(".png")) {
      ext = ".png";
    } else if (contentType.includes("image/jpeg") || targetUrl.endsWith(".jpg") || targetUrl.endsWith(".jpeg")) {
      ext = ".jpg";
    } else if (contentType.includes("image/webp") || targetUrl.endsWith(".webp")) {
      ext = ".webp";
    }

    const arrayBuffer = await res.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const safeName = name.trim().replace(/[^a-zA-Z0-9_\-+]/g, "_");
    const fileName = `${safeName}${ext}`;
    const targetDir = path.join(process.cwd(), "public", "images", "tecnologies");

    await fs.mkdir(targetDir, { recursive: true });
    await fs.writeFile(path.join(targetDir, fileName), buffer);

    const localUrl = `/images/tecnologies/${fileName}`;

    return NextResponse.json({
      success: true,
      localUrl,
      fileName,
      message: `Ícone de ${name} baixado e salvo em ${localUrl}!`,
    });
  } catch (err: unknown) {
    console.error("Erro ao baixar ícone:", err);
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : "Erro interno ao baixar ícone." },
      { status: 500 },
    );
  }
}

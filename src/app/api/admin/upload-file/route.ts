import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    return NextResponse.json(
      { error: "Upload local direto desativado em produção." },
      { status: 403 },
    );
  }

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;
    const targetType = (formData.get("type") as string) || "general";

    if (!file) {
      return NextResponse.json(
        { error: "Nenhum arquivo enviado." },
        { status: 400 },
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = path.extname(file.name) || ".png";
    const rawBaseName = path.basename(file.name, ext);
    const safeBaseName = rawBaseName
      .replace(/[^a-zA-Z0-9_\-\s]/g, "")
      .trim()
      .replace(/\s+/g, "-");
    const safeName = `${safeBaseName || "upload"}${ext}`;

    let relativePath = "";
    let publicUrl = "";

    if (targetType === "resume") {
      relativePath = path.join("public", "files", "curriculo.pdf");
      await fs.mkdir(path.join(process.cwd(), "public", "files"), {
        recursive: true,
      });
      await fs.writeFile(path.join(process.cwd(), relativePath), buffer);
      return NextResponse.json({
        success: true,
        url: "/files/curriculo.pdf",
        filename: "curriculo.pdf",
        message: "Currículo PDF salvo com sucesso em public/files/curriculo.pdf",
      });
    } else if (targetType === "hero") {
      const heroFilename = `hero-img${ext}`;
      relativePath = path.join("public", "images", heroFilename);
      await fs.mkdir(path.join(process.cwd(), "public", "images"), {
        recursive: true,
      });
      await fs.writeFile(path.join(process.cwd(), relativePath), buffer);
      return NextResponse.json({
        success: true,
        url: `/images/${heroFilename}`,
        filename: heroFilename,
        message: `Foto de perfil atualizada em /images/${heroFilename}`,
      });
    } else if (targetType === "experience" || targetType === "experiences") {
      const targetDir = path.join("public", "images", "experiences");
      await fs.mkdir(path.join(process.cwd(), targetDir), {
        recursive: true,
      });
      relativePath = path.join(targetDir, safeName);
      await fs.writeFile(path.join(process.cwd(), relativePath), buffer);
      publicUrl = `/images/experiences/${safeName}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: safeName,
        message: `Imagem salva com sucesso em ${publicUrl}`,
      });
    } else if (targetType === "project" || targetType === "projects") {
      const targetDir = path.join("public", "images", "projects");
      await fs.mkdir(path.join(process.cwd(), targetDir), {
        recursive: true,
      });
      relativePath = path.join(targetDir, safeName);
      await fs.writeFile(path.join(process.cwd(), relativePath), buffer);
      publicUrl = `/images/projects/${safeName}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: safeName,
        message: `Imagem salva com sucesso em ${publicUrl}`,
      });
    } else if (targetType === "technology" || targetType === "tecnologies") {
      const targetDir = path.join("public", "images", "tecnologies");
      await fs.mkdir(path.join(process.cwd(), targetDir), {
        recursive: true,
      });
      relativePath = path.join(targetDir, safeName);
      await fs.writeFile(path.join(process.cwd(), relativePath), buffer);
      publicUrl = `/images/tecnologies/${safeName}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: safeName,
        message: `Ícone salvo com sucesso em ${publicUrl}`,
      });
    } else {
      const targetDir = path.join("public", "images");
      await fs.mkdir(path.join(process.cwd(), targetDir), {
        recursive: true,
      });
      relativePath = path.join(targetDir, safeName);
      await fs.writeFile(path.join(process.cwd(), relativePath), buffer);
      publicUrl = `/images/${safeName}`;
      return NextResponse.json({
        success: true,
        url: publicUrl,
        filename: safeName,
        message: `Arquivo salvo com sucesso em ${publicUrl}`,
      });
    }
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Falha ao salvar arquivo no servidor local.",
      },
      { status: 500 },
    );
  }
}

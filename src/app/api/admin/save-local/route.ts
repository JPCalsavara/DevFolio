import { NextRequest, NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import {
  collegeData,
  cvConfig,
  experiencesData,
  profileData,
  projectsData,
  skillsData,
  socialLinks,
  themeConfig,
} from "@/data/portfolioData";

export async function GET() {
  const isDev = process.env.NODE_ENV === "development";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    "";
  const geminiKey = process.env.GEMINI_API_KEY || "";

  const isSupabaseReady =
    Boolean(supabaseUrl && supabaseKey) &&
    !supabaseUrl.includes("placeholder") &&
    !supabaseUrl.includes("YOUR_PROJECT_REF");

  const isGeminiReady = Boolean(geminiKey) && !geminiKey.includes("your_");

  return NextResponse.json({
    isDev,
    environment: {
      supabaseReady: isSupabaseReady,
      supabaseUrl: isSupabaseReady ? supabaseUrl : null,
      geminiReady: isGeminiReady,
    },
    data: {
      profileData,
      themeConfig,
      cvConfig,
      socialLinks,
      collegeData,
      projectsCount: projectsData.length,
      skillsCount: skillsData.length,
      experiencesCount: experiencesData.length,
    },
  });
}

import { updateSectionInSource } from "@/lib/sourceUpdater";

export async function POST(req: NextRequest) {
  const isDev = process.env.NODE_ENV === "development";

  if (!isDev) {
    return NextResponse.json(
      {
        success: false,
        message:
          "Gravação direta no disco está desativada em produção. Utilize a opção de download para salvar o código.",
      },
      { status: 403 },
    );
  }

  const filePath = path.join(
    process.cwd(),
    "src",
    "data",
    "portfolioData.ts",
  );
  const backupPath = `${filePath}.bak`;

  try {
    const body = await req.json();
    let content = await fs.readFile(filePath, "utf8");

    // Salva backup de segurança antes de qualquer modificação
    await fs.copyFile(filePath, backupPath);

    if (body.profileData) {
      content = updateSectionInSource(
        content,
        "profileData",
        "ProfileData",
        body.profileData,
      );
    }

    if (body.themeConfig) {
      content = updateSectionInSource(
        content,
        "themeConfig",
        "ThemeConfig",
        body.themeConfig,
      );
    }

    if (body.cvConfig) {
      content = updateSectionInSource(
        content,
        "cvConfig",
        "CvConfig",
        body.cvConfig,
      );
    }

    if (body.socialLinks) {
      content = updateSectionInSource(
        content,
        "socialLinks",
        "Record<string, string>",
        body.socialLinks,
      );
    }

    if (body.collegeData) {
      content = updateSectionInSource(
        content,
        "collegeData",
        "CollegeDetailData",
        body.collegeData,
      );
    }

    if (body.projectsData) {
      content = updateSectionInSource(
        content,
        "projectsData",
        "ProjectCardData[]",
        body.projectsData,
      );
    }

    if (body.skillsData) {
      content = updateSectionInSource(
        content,
        "skillsData",
        "SkillCardData[]",
        body.skillsData,
      );
    }

    if (body.experiencesData) {
      content = updateSectionInSource(
        content,
        "experiencesData",
        "ExperienceCardData[]",
        body.experiencesData,
      );
    }

    if (body.experiencesDetailsData) {
      content = updateSectionInSource(
        content,
        "experiencesDetailsData",
        "ExperienceDetailPageData[]",
        body.experiencesDetailsData,
      );
    }

    if (body.tagsData) {
      content = updateSectionInSource(
        content,
        "tagsData",
        "Record<string, { category: string; link?: string; realName?: string }>",
        body.tagsData,
      );
    }

    await fs.writeFile(filePath, content, "utf8");

    return NextResponse.json({
      success: true,
      message: "portfolioData.ts atualizado localmente com sucesso!",
    });
  } catch (error) {
    try {
      await fs.copyFile(backupPath, filePath);
    } catch {
      // ignore rollback error
    }
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Erro ao gravar no arquivo local. O backup anterior foi restaurado.",
      },
      { status: 500 },
    );
  }
}

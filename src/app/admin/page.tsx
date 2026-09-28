"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import PaletteRoundedIcon from "@mui/icons-material/PaletteRounded";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import FolderRoundedIcon from "@mui/icons-material/FolderRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import SaveRoundedIcon from "@mui/icons-material/SaveRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import CloudSyncRoundedIcon from "@mui/icons-material/CloudSyncRounded";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import LanguageRoundedIcon from "@mui/icons-material/LanguageRounded";
import { useRouter } from "next/navigation";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { resolveTechIcon, getDeviconUrl, isExternalIcon } from "@/lib/techIcons";
import {
  collegeData,
  CollegeDetailData,
  cvConfig,
  CvConfig,
  experiencesData,
  profileData,
  ProfileData,
  projectsData,
  SkillCardData,
  skillsData,
  socialLinks,
  themeConfig,
  ThemeConfig,
  ThemePreset,
} from "@/data/portfolioData";
import { THEME_PRESETS } from "@/theme/theme";
import { generateResumeTex } from "@/lib/resumeGenerator";

type AdminTab =
  | "profile"
  | "theme"
  | "cv"
  | "projects"
  | "habilidades"
  | "experiences"
  | "environment";

type ProjectRow = {
  id: string;
  slug: string;
  title: string;
  period: string | null;
  created_at: string;
};

type ExperienceRow = {
  id: string;
  slug: string;
  title: string;
  period: string | null;
  created_at: string;
};

type TechnologyRow = {
  id: string;
  name: string;
  label: string;
  type: string;
  link: string | null;
  icon_url: string | null;
  created_at: string;
};

type EntityRow = ProjectRow | ExperienceRow | TechnologyRow;

type TechnologyFormState = {
  name: string;
  label: string;
  type: string;
  isVisible: boolean;
  link: string;
  icon_url: string;
};

const TECHNOLOGY_DEFAULTS: TechnologyFormState = {
  name: "",
  label: "",
  type: "default",
  isVisible: true,
  link: "",
  icon_url: "",
};

function parseAdminTechnologyType(rawType: string): {
  type: string;
  isVisible: boolean;
} {
  const normalized = (rawType || "default").trim();
  const normalizedLower = normalized.toLowerCase();

  if (normalizedLower.startsWith("hidden:")) {
    return {
      type: normalized.slice(7).trim() || "default",
      isVisible: false,
    };
  }

  if (["hidden", "internal", "private"].includes(normalizedLower)) {
    return { type: "default", isVisible: false };
  }

  return { type: normalized || "default", isVisible: true };
}

function composeAdminTechnologyType(type: string, isVisible: boolean): string {
  const normalizedType = type.trim() || "default";
  return isVisible ? normalizedType : `hidden:${normalizedType}`;
}

const TECHNOLOGY_IMAGE_BY_NAME: Record<string, string> = {
  aws: "/images/tecnologies/AWS.png",
  angular: "/images/tecnologies/Angular.png",
  c: "/images/tecnologies/C.png",
  "c++": "/images/tecnologies/C++.png",
  csharp: "/images/tecnologies/CSharp.png",
  css: "/images/tecnologies/CSS.png",
  datadog: "/images/tecnologies/Datadog.png",
  docker: "/images/tecnologies/Docker.png",
  express: "/images/tecnologies/Express.png",
  git: "/images/tecnologies/Git.png",
  html: "/images/tecnologies/HTML.png",
  insomnia: "/images/tecnologies/Insomnia.png",
  kubernetes: "/images/tecnologies/Kubernetes.png",
  linux: "/images/tecnologies/Linux.png",
  mongodb: "/images/tecnologies/mongodb.png",
  nginx: "/images/tecnologies/NGINX.png",
  nextjs: "/images/tecnologies/Next.js.png",
  node: "/images/tecnologies/Node.png",
  postgres: "/images/tecnologies/PostgresSQL.png",
  prisma: "/images/tecnologies/Prisma.png",
  python: "/images/tecnologies/Python.png",
  rabbitmq: "/images/tecnologies/RabbitMQ.png",
  rancher: "/images/tecnologies/Rancher.png",
  react: "/images/tecnologies/React.png",
  rider: "/images/tecnologies/Rider.png",
  sqlserver: "/images/tecnologies/sqlserver.svg",
  supabase: "/images/tecnologies/SupaBase.png",
  swagger: "/images/tecnologies/Swagger.png",
  tailwind: "/images/tecnologies/Tailwind.png",
  typescript: "/images/tecnologies/TypeScript.png",
  uml: "/images/tecnologies/Unified Modelling Language (UML).png",
  xunit: "/images/tecnologies/xUnit.png",
  argocd: "/images/tecnologies/Argo CD.png",
  dotnet: "/images/tecnologies/NET.png",
  vercel: "/images/tecnologies/vercel.png",
  javascript: "/images/tecnologies/JavaScript.png",
  mysql: "/images/tecnologies/MySQL.png",
  php: "/images/tecnologies/PHP.png",
  pubsub: "/images/tecnologies/PubSub.png",
};

export default function AdminPage() {
  const router = useRouter();
  const isDev = process.env.NODE_ENV === "development";

  // Auth State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(isDev);

  // Tab State
  const [activeTab, setActiveTab] = useState<AdminTab>("profile");

  // Notifications
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // 1. Profile State
  const [profileForm, setProfileForm] = useState<ProfileData>(profileData);
  const [socialForm, setSocialForm] =
    useState<Record<string, string>>(socialLinks);
  const [collegeForm, setCollegeForm] =
    useState<CollegeDetailData>(collegeData);

  // 2. Theme State
  const [themeForm, setThemeForm] = useState<ThemeConfig>(themeConfig);

  // 3. CV State
  const [cvForm, setCvForm] = useState<CvConfig>(cvConfig);
  const [latexCode, setLatexCode] = useState("");
  const [isLatexCopied, setIsLatexCopied] = useState(false);

  // 4, 5, 6. Entities State (Projects, Skills, Experiences)
  const [rows, setRows] = useState<EntityRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isTechnologyDialogOpen, setIsTechnologyDialogOpen] = useState(false);
  const [technologyDialogMode, setTechnologyDialogMode] = useState<
    "create" | "view" | "edit"
  >("create");
  const [selectedTechnologyId, setSelectedTechnologyId] = useState("");
  const [technologyForm, setTechnologyForm] =
    useState<TechnologyFormState>(TECHNOLOGY_DEFAULTS);
  const [isUploading, setIsUploading] = useState(false);

  // 7. Environment State
  const [envDiagnostics, setEnvDiagnostics] = useState<{
    supabaseReady: boolean;
    supabaseUrl: string | null;
    geminiReady: boolean;
  }>({
    supabaseReady: false,
    supabaseUrl: null,
    geminiReady: false,
  });

  // Filtered rows for projects/experiences/skills
  const filteredRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return rows;
    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [rows, searchTerm]);

  // Load rows for the currently selected entity tab
  const loadRows = useCallback(
    async (entity: "projects" | "habilidades" | "experiences") => {
      // Local-First: carregar dados locais imediatamente sem aguardar timeout de rede
      if (isDev || !isSupabaseConfigured) {
        if (entity === "projects") {
          setRows(
            projectsData.map((project) => ({
              id: project.slug,
              slug: project.slug,
              title: project.title,
              period: project.period ?? null,
              created_at: new Date(0).toISOString(),
            })),
          );
        } else if (entity === "experiences") {
          setRows(
            experiencesData.map((experience) => ({
              id:
                experience.slug ||
                experience.title.toLowerCase().replace(/\s+/g, "-"),
              slug:
                experience.slug ||
                experience.title.toLowerCase().replace(/\s+/g, "-"),
              title: experience.title,
              period: experience.period ?? null,
              created_at: new Date(0).toISOString(),
            })),
          );
        } else if (entity === "habilidades") {
          setRows(
            skillsData.map((skill) => ({
              id: skill.name,
              name: skill.name,
              label: skill.label,
              type: skill.type,
              link: skill.link ?? null,
              icon_url: resolveTechIcon(skill.name, skill.iconUrl),
              created_at: new Date(0).toISOString(),
            })),
          );
        }
        return;
      }

      const { data, error: queryError } = await supabase
        .from(entity)
        .select("*")
        .order("created_at", { ascending: false });

      if (queryError) {
        setError(queryError.message);
        return;
      }

      setRows((data ?? []) as EntityRow[]);
    },
    [isDev],
  );

  // Refresh Session and Environment
  const refreshSession = useCallback(async () => {
    if (isDev || !isSupabaseConfigured) {
      setIsAuthenticated(true);
    } else {
      const { data } = await supabase.auth.getSession();
      setIsAuthenticated(Boolean(data.session));
    }

    try {
      const res = await fetch("/api/admin/save-local");
      if (res.ok) {
        const json = await res.json();
        if (json.environment) {
          setEnvDiagnostics(json.environment);
        }
      }
    } catch {
      // Ignora erro de fetch inicial
    }
  }, [isDev]);

  useEffect(() => {
    refreshSession();

    if (!isDev && isSupabaseConfigured) {
      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange((_event, session) => {
        setIsAuthenticated(Boolean(session));
      });

      return () => subscription.unsubscribe();
    }
  }, [isDev, refreshSession]);

  useEffect(() => {
    if (!isAuthenticated) return;

    if (
      activeTab === "projects" ||
      activeTab === "habilidades" ||
      activeTab === "experiences"
    ) {
      loadRows(activeTab);
      setSearchTerm("");
      setIsTechnologyDialogOpen(false);
      setStatus("");
      setError("");
    }
  }, [isAuthenticated, activeTab, loadRows]);

  // Auth Handlers
  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("Autenticando...");

    if (isDev && !password) {
      setIsAuthenticated(true);
      setStatus("Acesso liberado em modo desenvolvimento.");
      return;
    }

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
      if (isDev) {
        setIsAuthenticated(true);
        setStatus("Acesso liberado em modo desenvolvimento.");
        return;
      }
      setError(loginError.message);
      setStatus("");
      return;
    }

    await refreshSession();
    setStatus("Login realizado com sucesso.");
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setRows([]);
    router.push("/");
  }

  // Local Save Handler
  async function saveLocalData(
    payload: Record<string, unknown>,
    successMessage: string,
  ) {
    setIsSaving(true);
    setError("");
    setStatus("");

    try {
      const res = await fetch("/api/admin/save-local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || data.error || "Erro ao salvar dados.");
      }

      setStatus(successMessage);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido ao salvar.");
    } finally {
      setIsSaving(false);
    }
  }

  // Save Handlers for specific sections
  async function handleSaveProfile() {
    await saveLocalData(
      {
        profileData: profileForm,
        socialLinks: socialForm,
        collegeData: collegeForm,
      },
      "Perfil e informações pessoais atualizadas com sucesso em portfolioData.ts!",
    );
  }

  async function handleSaveTheme() {
    await saveLocalData(
      { themeConfig: themeForm },
      "Estética e tema atualizados com sucesso em portfolioData.ts!",
    );
  }

  async function handleSaveCv() {
    await saveLocalData(
      { cvConfig: cvForm },
      "Configurações do CV atualizadas com sucesso em portfolioData.ts!",
    );
  }

  // Theme Preset Change
  function applyThemePreset(presetKey: ThemePreset) {
    if (presetKey === "custom") {
      setThemeForm((prev) => ({ ...prev, preset: "custom" }));
      return;
    }
    const preset = THEME_PRESETS[presetKey];
    if (preset) {
      setThemeForm({
        ...preset,
        preset: presetKey,
      });
    }
  }

  // LaTeX Resume Generator
  function handleGenerateLatex() {
    const code = generateResumeTex(
      profileForm,
      experiencesData,
      skillsData,
      collegeForm,
      cvForm,
      socialForm,
    );
    setLatexCode(code);
    setStatus("Código LaTeX (curriculo.tex) gerado com base no resume-template!");
  }

  function handleCopyLatex() {
    if (!latexCode) return;
    navigator.clipboard.writeText(latexCode);
    setIsLatexCopied(true);
    setStatus("LaTeX copiado para a área de transferência.");
  }

  function handleDownloadLatex() {
    if (!latexCode) return;
    const blob = new Blob([latexCode], { type: "text/x-tex;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "curriculo.tex";
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Arquivo curriculo.tex baixado com sucesso!");
  }

  // File Upload Handlers (Hero Photo, CV PDF)
  async function handleUploadHeroPhoto(file: File) {
    setIsUploading(true);
    setError("");
    setStatus("Enviando foto de perfil...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "hero");

      const res = await fetch("/api/admin/upload-file", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Falha no upload");
      }

      setProfileForm((prev) => ({ ...prev, heroImageUrl: data.url }));
      setStatus(data.message || "Foto de perfil atualizada!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no upload da foto.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleUploadResumePdf(file: File) {
    setIsUploading(true);
    setError("");
    setStatus("Enviando currículo PDF...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "resume");

      const res = await fetch("/api/admin/upload-file", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Falha no upload");
      }

      setCvForm((prev) => ({ ...prev, resumePdfUrl: data.url }));
      setStatus(data.message || "PDF do currículo atualizado em /files/curriculo.pdf!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no upload do PDF.");
    } finally {
      setIsUploading(false);
    }
  }

  async function handleUploadTechnologyIcon(file: File) {
    setIsUploading(true);
    setError("");
    setStatus("Enviando ícone da habilidade...");

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", "technology");

      const res = await fetch("/api/admin/upload-file", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Falha no upload do ícone");
      }

      setTechnologyForm((prev) => ({ ...prev, icon_url: data.url }));
      setStatus(data.message || `Ícone salvo em ${data.url}!`);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Erro no upload do ícone.",
      );
    } finally {
      setIsUploading(false);
    }
  }

  async function handleDownloadIcon(techName: string, iconUrl?: string) {
    setIsUploading(true);
    setError("");
    setStatus(`Baixando ícone de ${techName}...`);

    try {
      const res = await fetch("/api/admin/download-icon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: techName, url: iconUrl }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Falha ao baixar ícone");
      }

      setTechnologyForm((prev) => ({ ...prev, icon_url: data.localUrl }));

      if (isDev) {
        const existingIndex = skillsData.findIndex(
          (s) => s.name.toLowerCase() === techName.toLowerCase(),
        );
        if (existingIndex >= 0) {
          const nextSkills = [...skillsData];
          nextSkills[existingIndex] = {
            ...nextSkills[existingIndex],
            iconUrl: data.localUrl,
          };
          await saveLocalData(
            { skillsData: nextSkills },
            `Ícone de ${techName} salvo localmente em ${data.localUrl}!`,
          );
        }
      }

      await loadRows("habilidades");
      setStatus(data.message || `Ícone salvo em ${data.localUrl}!`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao baixar ícone.");
    } finally {
      setIsUploading(false);
    }
  }

  // Technology Modal Handlers
  function openTechnologyDialog(
    mode: "create" | "view" | "edit",
    row?: EntityRow,
  ) {
    if (mode === "create") {
      setSelectedTechnologyId("");
      setTechnologyForm(TECHNOLOGY_DEFAULTS);
      setTechnologyDialogMode("create");
      setIsTechnologyDialogOpen(true);
      return;
    }

    const technology = row as TechnologyRow;
    setSelectedTechnologyId(technology.id);
    const parsed = parseAdminTechnologyType(technology.type);
    setTechnologyForm({
      name: technology.name,
      label: technology.label,
      type: parsed.type,
      isVisible: parsed.isVisible,
      link: technology.link || "",
      icon_url: technology.icon_url || resolveTechIcon(technology.name),
    });
    setTechnologyDialogMode(mode);
    setIsTechnologyDialogOpen(true);
  }

  async function saveTechnology() {
    setError("");
    const payload = {
      name: technologyForm.name.trim(),
      label: technologyForm.label.trim() || technologyForm.name.trim(),
      type: composeAdminTechnologyType(
        technologyForm.type,
        technologyForm.isVisible,
      ),
      link: technologyForm.link.trim() || null,
      icon_url: technologyForm.icon_url.trim() || null,
    };

    if (isDev || !isSupabaseConfigured) {
      const updatedSkill: SkillCardData = {
        name: payload.name,
        label: payload.label,
        type: payload.type,
        link: payload.link || undefined,
        iconUrl: payload.icon_url || undefined,
      };

      const existingIndex = skillsData.findIndex(
        (s) => s.name.toLowerCase() === updatedSkill.name.toLowerCase(),
      );
      let nextSkills = [...skillsData];
      if (existingIndex >= 0) {
        nextSkills[existingIndex] = updatedSkill;
      } else {
        nextSkills = [updatedSkill, ...nextSkills];
      }

      await saveLocalData(
        { skillsData: nextSkills },
        "Habilidade salva localmente em portfolioData.ts!",
      );
      setIsTechnologyDialogOpen(false);
      await loadRows("habilidades");
      return;
    }

    if (technologyDialogMode === "create") {
      const { error: createError } = await supabase
        .from("habilidades")
        .insert(payload);
      if (createError && !isDev) {
        setError(createError.message);
        return;
      }
    }

    if (technologyDialogMode === "edit") {
      const { error: updateError } = await supabase
        .from("habilidades")
        .update(payload)
        .eq("id", selectedTechnologyId);
      if (updateError && !isDev) {
        setError(updateError.message);
        return;
      }
    }

    setIsTechnologyDialogOpen(false);
    await loadRows("habilidades");
  }

  // Delete Entity
  async function handleDelete(rowId: string) {
    if (!confirm("Tem certeza que deseja remover este registro?")) return;
    setError("");

    if (isDev || !isSupabaseConfigured) {
      if (activeTab === "projects") {
        const next = projectsData.filter((p) => p.slug !== rowId);
        await saveLocalData({ projectsData: next }, "Projeto removido localmente.");
        await loadRows("projects");
      } else if (activeTab === "experiences") {
        const next = experiencesData.filter(
          (e) => (e.slug || e.title.toLowerCase().replace(/\s+/g, "-")) !== rowId,
        );
        await saveLocalData({ experiencesData: next }, "Experiência removida localmente.");
        await loadRows("experiences");
      } else if (activeTab === "habilidades") {
        const next = skillsData.filter((s) => s.name !== rowId);
        await saveLocalData({ skillsData: next }, "Habilidade removida localmente.");
        await loadRows("habilidades");
      }
      return;
    }

    if (activeTab === "projects" || activeTab === "experiences" || activeTab === "habilidades") {
      const { error: deleteError } = await supabase
        .from(activeTab)
        .delete()
        .eq("id", rowId);

      if (deleteError && !isDev) {
        setError(deleteError.message);
        return;
      }
      await loadRows(activeTab);
    }
  }

  // Supabase Cloud Sync
  async function handleSyncWithSupabase() {
    setIsSaving(true);
    setStatus("Sincronizando dados locais com o Supabase...");
    setError("");

    try {
      // 1. Habilidades
      if (skillsData.length > 0) {
        const { error: errHabilidades } = await supabase.from("habilidades").upsert(
          skillsData.map((s) => ({
            name: s.name,
            label: s.label,
            type: s.type,
            link: s.link || null,
            icon_url: TECHNOLOGY_IMAGE_BY_NAME[s.name.toLowerCase()] || null,
          })),
          { onConflict: "name" },
        );
        if (errHabilidades) throw new Error(`Habilidades: ${errHabilidades.message}`);
      }

      // 2. Projetos
      if (projectsData.length > 0) {
        const { error: errProjects } = await supabase.from("projects").upsert(
          projectsData.map((p) => ({
            slug: p.slug,
            title: p.title,
            summary_line: p.summaryLine || null,
            period: p.period || null,
            technologies: p.tecnosUsed || [],
            description: p.description,
            image_url: p.urlName ? `/images/projects/${p.urlName}` : null,
            production_link: p.produtionLink || null,
            repository_link: p.repositoryLink || null,
            details_goal: p.detailsGoal || null,
            details_highlights: p.detailsHighlights || [],
            details_impact: p.detailsImpact || null,
          })),
          { onConflict: "slug" },
        );
        if (errProjects) throw new Error(`Projetos: ${errProjects.message}`);
      }

      // 3. Experiências
      if (experiencesData.length > 0) {
        const { error: errExperiences } = await supabase.from("experiences").upsert(
          experiencesData.map((e) => ({
            slug: e.slug || e.title.toLowerCase().replace(/\s+/g, "-"),
            title: e.title,
            location: e.location || null,
            period: e.period || null,
            role: e.role || null,
            summary: e.summary,
            achievements: e.achievements || [],
            skills_learned: e.skillsLearned || [],
            image_urls: e.imageNames?.length
              ? e.imageNames.map((name) => `/images/experiences/${name}`)
              : e.imageName
                ? [`/images/experiences/${e.imageName}`]
                : [],
            intro_title: e.title,
            intro: e.summary,
          })),
          { onConflict: "slug" },
        );
        if (errExperiences) throw new Error(`Experiências: ${errExperiences.message}`);
      }

      setStatus("Sincronização com Supabase concluída com sucesso!");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro na sincronização.");
    } finally {
      setIsSaving(false);
    }
  }

  // Backup Download Handler
  function handleDownloadBackup() {
    const fullBackup = `// Backup gerado pelo DevFolio Admin em ${new Date().toLocaleString()}
export const profileData = ${JSON.stringify(profileForm, null, 2)};
export const themeConfig = ${JSON.stringify(themeForm, null, 2)};
export const cvConfig = ${JSON.stringify(cvForm, null, 2)};
export const socialLinks = ${JSON.stringify(socialForm, null, 2)};
export const collegeData = ${JSON.stringify(collegeForm, null, 2)};
export const projectsData = ${JSON.stringify(projectsData, null, 2)};
export const skillsData = ${JSON.stringify(skillsData, null, 2)};
export const experiencesData = ${JSON.stringify(experiencesData, null, 2)};
`;
    const blob = new Blob([fullBackup], { type: "text/typescript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `portfolioData-backup-${Date.now()}.ts`;
    link.click();
    URL.revokeObjectURL(url);
    setStatus("Backup baixado com sucesso!");
  }

  // Login Gate
  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700 }}>
              Login Admin
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 3 }}>
              Painel de gerenciamento do DevFolio.
            </Typography>

            {isDev ? (
              <Alert severity="info" sx={{ mb: 2 }}>
                Ambiente de desenvolvimento ativo: você pode acessar sem digitar senha.
              </Alert>
            ) : null}

            {error ? (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            ) : null}
            {status ? (
              <Alert severity="success" sx={{ mb: 2 }}>
                {status}
              </Alert>
            ) : null}

            <Stack component="form" spacing={2} onSubmit={handleLogin}>
              <TextField
                label="E-mail"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!isDev}
              />
              <TextField
                label={isDev ? "Senha (opcional em dev)" : "Senha"}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!isDev}
              />
              <Button type="submit" variant="contained" color="primary">
                {isDev && !password ? "Entrar sem senha" : "Entrar"}
              </Button>
              {isDev ? (
                <Button
                  type="button"
                  variant="outlined"
                  color="secondary"
                  onClick={() => setIsAuthenticated(true)}
                >
                  Entrar direto (Modo Dev)
                </Button>
              ) : null}
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      {/* Top Header */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Box>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                <Typography variant="h4" sx={{ fontWeight: 800 }}>
                  Painel DevFolio
                </Typography>
                {isDev ? (
                  <Chip
                    label="Modo Dev (Local-First)"
                    color="success"
                    size="small"
                    variant="outlined"
                  />
                ) : (
                  <Chip label="Produção" color="primary" size="small" />
                )}
              </Stack>
              <Typography sx={{ color: "text.secondary", mt: 0.5 }}>
                Configure seu portfólio completo: informações pessoais, estética, currículo e ambiente.
              </Typography>
            </Box>

            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <Button
                variant="outlined"
                color="secondary"
                startIcon={<AutoAwesomeRoundedIcon />}
                onClick={() => router.push("/admin/intake")}
              >
                Intake IA
              </Button>
              <Button variant="outlined" color="inherit" onClick={handleLogout}>
                Sair
              </Button>
            </Stack>
          </Stack>

          {/* Main Navigation Tabs */}
          <Tabs
            value={activeTab}
            onChange={(_e, val: AdminTab) => setActiveTab(val)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{ mt: 3, borderBottom: 1, borderColor: "divider" }}
          >
            <Tab
              value="profile"
              label="Perfil & Bio"
              icon={<PersonRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              value="theme"
              label="Estética & Tema"
              icon={<PaletteRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              value="cv"
              label="Currículo (CV)"
              icon={<DescriptionRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              value="projects"
              label="Projetos"
              icon={<FolderRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              value="habilidades"
              label="Habilidades"
              icon={<CodeRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              value="experiences"
              label="Experiências"
              icon={<WorkOutlineRoundedIcon />}
              iconPosition="start"
            />
            <Tab
              value="environment"
              label="Ambiente & Setup"
              icon={<SettingsRoundedIcon />}
              iconPosition="start"
            />
          </Tabs>
        </CardContent>
      </Card>

      {/* Global Alerts */}
      {error ? (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      ) : null}
      {status ? (
        <Alert severity="success" sx={{ mb: 3 }}>
          {status}
        </Alert>
      ) : null}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 1. ABA: PERFIL & APRESENTAÇÃO */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === "profile" && (
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Identidade & Apresentação Principal
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                Estes dados alimentam a Navbar, a Apresentação e a seção Hero da página inicial.
              </Typography>

              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Nome Completo"
                    value={profileForm.name}
                    onChange={(e) =>
                      setProfileForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Cargo / Título Resumido"
                    value={profileForm.role}
                    onChange={(e) =>
                      setProfileForm((prev) => ({ ...prev, role: e.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Overline (ex: PORTFÓLIO / SEU NOME)"
                    value={profileForm.presentationOverline || ""}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        presentationOverline: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Localização"
                    value={profileForm.location}
                    onChange={(e) =>
                      setProfileForm((prev) => ({ ...prev, location: e.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    label="Headline de Impacto (Apresentação)"
                    value={profileForm.headline}
                    onChange={(e) =>
                      setProfileForm((prev) => ({ ...prev, headline: e.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Biografia Principal (Apresentação)"
                    value={profileForm.bio}
                    onChange={(e) =>
                      setProfileForm((prev) => ({ ...prev, bio: e.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Atuação Atual (Hero)"
                    value={profileForm.currentWork}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        currentWork: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Destaque de Experiências (Hero)"
                    value={profileForm.experienceHighlight}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        experienceHighlight: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Destaque de Projetos (Hero)"
                    value={profileForm.projectsHighlight}
                    onChange={(e) =>
                      setProfileForm((prev) => ({
                        ...prev,
                        projectsHighlight: e.target.value,
                      }))
                    }
                  />
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Foto de Perfil */}
              <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                Foto do Perfil (Hero)
              </Typography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center" }}>
                <TextField
                  fullWidth
                  label="URL da Foto do Hero"
                  value={profileForm.heroImageUrl}
                  onChange={(e) =>
                    setProfileForm((prev) => ({
                      ...prev,
                      heroImageUrl: e.target.value,
                    }))
                  }
                />
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadRoundedIcon />}
                  disabled={isUploading}
                  sx={{ minWidth: 200 }}
                >
                  Upload Foto
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadHeroPhoto(file);
                    }}
                  />
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Contatos & Redes */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Contatos & Redes Sociais
              </Typography>
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="E-mail de Contato"
                    value={profileForm.email}
                    onChange={(e) =>
                      setProfileForm((prev) => ({ ...prev, email: e.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="URL do GitHub"
                    value={socialForm.github || ""}
                    onChange={(e) =>
                      setSocialForm((prev) => ({ ...prev, github: e.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                  <TextField
                    fullWidth
                    label="URL do LinkedIn"
                    value={socialForm.linkedin || ""}
                    onChange={(e) =>
                      setSocialForm((prev) => ({ ...prev, linkedin: e.target.value }))
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Formação / Faculdade */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Formação Acadêmica (Página Faculdade)
              </Typography>
              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Instituição"
                    value={collegeForm.institution}
                    onChange={(e) =>
                      setCollegeForm((prev) => ({
                        ...prev,
                        institution: e.target.value,
                      }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Curso"
                    value={collegeForm.course}
                    onChange={(e) =>
                      setCollegeForm((prev) => ({ ...prev, course: e.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Período"
                    value={collegeForm.period}
                    onChange={(e) =>
                      setCollegeForm((prev) => ({ ...prev, period: e.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Status da Graduação"
                    value={collegeForm.status}
                    onChange={(e) =>
                      setCollegeForm((prev) => ({ ...prev, status: e.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={2}
                    label="Resumo da Trajetória Acadêmica"
                    value={collegeForm.summary}
                    onChange={(e) =>
                      setCollegeForm((prev) => ({ ...prev, summary: e.target.value }))
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveRoundedIcon />}
            onClick={handleSaveProfile}
            disabled={isSaving}
            sx={{ py: 1.5, fontSize: "1.05rem" }}
          >
            {isSaving ? "Gravando..." : "Salvar Informações do Perfil"}
          </Button>
        </Stack>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 2. ABA: ESTÉTICA & TEMA */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === "theme" && (
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Presets Visuais Rápidos
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                Escolha uma combinação pré-configurada de cores e atmosfera visual:
              </Typography>

              <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", gap: 1 }}>
                {(
                  [
                    ["blue-terminal", "🔵 Terminal-Chic (Padrão)"],
                    ["emerald-tech", "🟢 Emerald Tech"],
                    ["purple-cyberpunk", "🟣 Purple Cyberpunk"],
                    ["amber-glow", "🟡 Amber Glow"],
                    ["monochrome-slate", "⚪ Monochrome Slate"],
                    ["custom", "🎨 Personalizado"],
                  ] as const
                ).map(([key, label]) => (
                  <Chip
                    key={key}
                    label={label}
                    clickable
                    color={themeForm.preset === key ? "primary" : "default"}
                    variant={themeForm.preset === key ? "filled" : "outlined"}
                    onClick={() => applyThemePreset(key as ThemePreset)}
                    sx={{ py: 2.2, px: 1, fontSize: "0.95rem", fontWeight: 700 }}
                  />
                ))}
              </Stack>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Paleta de Cores Customizável
              </Typography>

              <Grid container spacing={3}>
                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Cor Primária (Destaques e Botões)
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    <input
                      type="color"
                      value={themeForm.primaryMain}
                      onChange={(e) => {
                        setThemeForm((prev) => ({
                          ...prev,
                          preset: "custom",
                          primaryMain: e.target.value,
                        }));
                      }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        cursor: "pointer",
                        border: "none",
                      }}
                    />
                    <TextField
                      size="small"
                      value={themeForm.primaryMain}
                      onChange={(e) =>
                        setThemeForm((prev) => ({
                          ...prev,
                          preset: "custom",
                          primaryMain: e.target.value,
                        }))
                      }
                    />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Cor Secundária (Accent e Bordas)
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    <input
                      type="color"
                      value={themeForm.secondaryMain}
                      onChange={(e) => {
                        setThemeForm((prev) => ({
                          ...prev,
                          preset: "custom",
                          secondaryMain: e.target.value,
                        }));
                      }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        cursor: "pointer",
                        border: "none",
                      }}
                    />
                    <TextField
                      size="small"
                      value={themeForm.secondaryMain}
                      onChange={(e) =>
                        setThemeForm((prev) => ({
                          ...prev,
                          preset: "custom",
                          secondaryMain: e.target.value,
                        }))
                      }
                    />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Fundo da Página (Background)
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    <input
                      type="color"
                      value={themeForm.backgroundDefault}
                      onChange={(e) => {
                        setThemeForm((prev) => ({
                          ...prev,
                          preset: "custom",
                          backgroundDefault: e.target.value,
                        }));
                      }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        cursor: "pointer",
                        border: "none",
                      }}
                    />
                    <TextField
                      size="small"
                      value={themeForm.backgroundDefault}
                      onChange={(e) =>
                        setThemeForm((prev) => ({
                          ...prev,
                          preset: "custom",
                          backgroundDefault: e.target.value,
                        }))
                      }
                    />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Fundo dos Cards (Paper)
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    <input
                      type="color"
                      value={themeForm.backgroundPaper}
                      onChange={(e) => {
                        setThemeForm((prev) => ({
                          ...prev,
                          preset: "custom",
                          backgroundPaper: e.target.value,
                        }));
                      }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        cursor: "pointer",
                        border: "none",
                      }}
                    />
                    <TextField
                      size="small"
                      value={themeForm.backgroundPaper}
                      onChange={(e) =>
                        setThemeForm((prev) => ({
                          ...prev,
                          preset: "custom",
                          backgroundPaper: e.target.value,
                        }))
                      }
                    />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Texto Principal
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                    <input
                      type="color"
                      value={themeForm.textPrimary}
                      onChange={(e) => {
                        setThemeForm((prev) => ({
                          ...prev,
                          preset: "custom",
                          textPrimary: e.target.value,
                        }));
                      }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 8,
                        cursor: "pointer",
                        border: "none",
                      }}
                    />
                    <TextField
                      size="small"
                      value={themeForm.textPrimary}
                      onChange={(e) =>
                        setThemeForm((prev) => ({
                          ...prev,
                          preset: "custom",
                          textPrimary: e.target.value,
                        }))
                      }
                    />
                  </Stack>
                </Grid>

                <Grid size={{ xs: 12, sm: 6, md: 4 }}>
                  <Typography variant="body2" sx={{ fontWeight: 600, mb: 1 }}>
                    Arredondamento dos Cantos (Border Radius: {themeForm.borderRadius}px)
                  </Typography>
                  <Slider
                    value={themeForm.borderRadius || 14}
                    min={0}
                    max={28}
                    step={2}
                    valueLabelDisplay="auto"
                    onChange={(_e, val) =>
                      setThemeForm((prev) => ({
                        ...prev,
                        preset: "custom",
                        borderRadius: val as number,
                      }))
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Live Preview Card */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
                Live Preview da Estética
              </Typography>
              <Box
                sx={{
                  p: 3,
                  borderRadius: `${themeForm.borderRadius}px`,
                  backgroundColor: themeForm.backgroundDefault,
                  border: `1px solid ${themeForm.secondaryMain}30`,
                }}
              >
                <Box
                  sx={{
                    p: 3,
                    borderRadius: `${themeForm.borderRadius}px`,
                    backgroundColor: themeForm.backgroundPaper,
                    border: `1px solid ${themeForm.secondaryMain}30`,
                    boxShadow: `0 4px 20px rgba(0,0,0,0.4)`,
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ color: themeForm.textPrimary, fontWeight: 700, mb: 1 }}
                  >
                    Exemplo de Card & Identidade Visual
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: themeForm.textSecondary, mb: 2.5 }}
                  >
                    Este é um exemplo de como os textos, botões e fundos ficarão renderizados no seu portfólio.
                  </Typography>

                  <Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundImage: `linear-gradient(135deg, ${themeForm.primaryMain} 0%, ${themeForm.secondaryMain} 100%)`,
                        borderRadius: `${Math.max(6, themeForm.borderRadius - 4)}px`,
                        color: "#fff",
                        fontWeight: 700,
                      }}
                    >
                      Botão Primário
                    </Button>
                    <Button
                      variant="outlined"
                      sx={{
                        borderColor: themeForm.secondaryMain,
                        color: themeForm.secondaryMain,
                        borderRadius: `${Math.max(6, themeForm.borderRadius - 4)}px`,
                        fontWeight: 700,
                      }}
                    >
                      Botão Outlined
                    </Button>
                    <Chip
                      label="Tag Demonstrativa"
                      sx={{
                        borderColor: themeForm.primaryMain,
                        color: themeForm.primaryMain,
                      }}
                      variant="outlined"
                    />
                  </Stack>
                </Box>
              </Box>
            </CardContent>
          </Card>

          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveRoundedIcon />}
            onClick={handleSaveTheme}
            disabled={isSaving}
            sx={{ py: 1.5, fontSize: "1.05rem" }}
          >
            {isSaving ? "Gravando..." : "Salvar Estética e Tema"}
          </Button>
        </Stack>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 3. ABA: CURRÍCULO (CV) */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === "cv" && (
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Configuração do Currículo
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                Edite os dados principais do currículo e gere arquivos prontos em PDF e LaTeX.
              </Typography>

              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <TextField
                    fullWidth
                    label="Cargo Alvo Desejado"
                    value={cvForm.desiredRole}
                    onChange={(e) =>
                      setCvForm((prev) => ({ ...prev, desiredRole: e.target.value }))
                    }
                  />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth>
                    <InputLabel>Mercado Alvo</InputLabel>
                    <Select
                      value={cvForm.targetMarket}
                      label="Mercado Alvo"
                      onChange={(e) =>
                        setCvForm((prev) => ({
                          ...prev,
                          targetMarket: e.target.value as "pt-br" | "en",
                        }))
                      }
                    >
                      <MenuItem value="pt-br">Mercado Brasileiro (PT-BR)</MenuItem>
                      <MenuItem value="en">Mercado Internacional (Inglês)</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Resumo Profissional do CV"
                    value={cvForm.summary}
                    onChange={(e) =>
                      setCvForm((prev) => ({ ...prev, summary: e.target.value }))
                    }
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Estatísticas de Destaque */}
          <Card>
            <CardContent>
              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
              >
                <Typography variant="h6" sx={{ fontWeight: 700 }}>
                  Estatísticas de Destaque (Cards do CV)
                </Typography>
                <Button
                  startIcon={<AddRoundedIcon />}
                  size="small"
                  variant="outlined"
                  onClick={() =>
                    setCvForm((prev) => ({
                      ...prev,
                      stats: [...prev.stats, { label: "Nova Métrica", value: "10+" }],
                    }))
                  }
                >
                  Adicionar Métrica
                </Button>
              </Stack>

              <Grid container spacing={2}>
                {cvForm.stats.map((stat, idx) => (
                  <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: "1px solid rgba(255,255,255,0.1)",
                      }}
                    >
                      <TextField
                        fullWidth
                        size="small"
                        label="Rótulo"
                        value={stat.label}
                        onChange={(e) => {
                          const next = [...cvForm.stats];
                          next[idx].label = e.target.value;
                          setCvForm((prev) => ({ ...prev, stats: next }));
                        }}
                        sx={{ mb: 1.5 }}
                      />
                      <TextField
                        fullWidth
                        size="small"
                        label="Valor"
                        value={stat.value}
                        onChange={(e) => {
                          const next = [...cvForm.stats];
                          next[idx].value = e.target.value;
                          setCvForm((prev) => ({ ...prev, stats: next }));
                        }}
                        sx={{ mb: 1 }}
                      />
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          const next = cvForm.stats.filter((_, i) => i !== idx);
                          setCvForm((prev) => ({ ...prev, stats: next }));
                        }}
                      >
                        Remover
                      </Button>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>

          {/* Upload do PDF do Currículo */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Arquivo PDF do Currículo
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 2 }}>
                O botão de download na página inicial e nas redes sociais aponta para este arquivo.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ alignItems: "center" }}>
                <TextField
                  fullWidth
                  label="Caminho do PDF"
                  value={cvForm.resumePdfUrl}
                  onChange={(e) =>
                    setCvForm((prev) => ({ ...prev, resumePdfUrl: e.target.value }))
                  }
                />
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadRoundedIcon />}
                  disabled={isUploading}
                  sx={{ minWidth: 200 }}
                >
                  Upload PDF
                  <input
                    type="file"
                    hidden
                    accept="application/pdf"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) handleUploadResumePdf(file);
                    }}
                  />
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  href={cvForm.resumePdfUrl}
                  target="_blank"
                  sx={{ minWidth: 140 }}
                >
                  Ver PDF
                </Button>
              </Stack>
            </CardContent>
          </Card>

          {/* Gerador LaTeX Baseado no Resume-Template */}
          <Card>
            <CardContent>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
              >
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    Gerador de Currículo LaTeX (resume-template)
                  </Typography>
                  <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    Gera automaticamente o código `curriculo.tex` com suas informações formatadas para ATS.
                  </Typography>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AutoAwesomeRoundedIcon />}
                  onClick={handleGenerateLatex}
                >
                  Gerar curriculo.tex
                </Button>
              </Stack>

              {latexCode ? (
                <Box sx={{ mt: 2 }}>
                  <TextField
                    fullWidth
                    multiline
                    rows={12}
                    value={latexCode}
                    onChange={(e) => setLatexCode(e.target.value)}
                    sx={{
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                      backgroundColor: "background.paper",
                    }}
                  />
                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      startIcon={<ContentCopyRoundedIcon />}
                      onClick={handleCopyLatex}
                    >
                      {isLatexCopied ? "Copiado!" : "Copiar Código LaTeX"}
                    </Button>
                    <Button
                      variant="contained"
                      color="secondary"
                      startIcon={<DownloadRoundedIcon />}
                      onClick={handleDownloadLatex}
                    >
                      Baixar curriculo.tex
                    </Button>
                  </Stack>
                </Box>
              ) : null}
            </CardContent>
          </Card>

          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<SaveRoundedIcon />}
            onClick={handleSaveCv}
            disabled={isSaving}
            sx={{ py: 1.5, fontSize: "1.05rem" }}
          >
            {isSaving ? "Gravando..." : "Salvar Configurações do CV"}
          </Button>
        </Stack>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 4. ABA: PROJETOS */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === "projects" && (
        <Card>
          <CardContent>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
            >
              <TextField
                placeholder="Buscar projeto..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ width: { xs: "100%", sm: 300 } }}
              />

              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={() => router.push("/admin/projects/new?mode=edit")}
              >
                Novo Projeto
              </Button>
            </Stack>

            <Grid container spacing={2}>
              {filteredRows.map((row) => {
                const project = row as ProjectRow;
                return (
                  <Grid size={{ xs: 12, md: 6 }} key={project.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
                        >
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                              {project.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              {project.slug} {project.period ? `• ${project.period}` : ""}
                            </Typography>
                          </Box>

                          <Stack direction="row" spacing={0.5}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                router.push(`/admin/projects/${project.id}?mode=edit`)
                              }
                            >
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(project.id)}
                            >
                              <DeleteOutlineRoundedIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 5. ABA: HABILIDADES */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === "habilidades" && (
        <Card>
          <CardContent>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
            >
              <TextField
                placeholder="Buscar habilidade..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ width: { xs: "100%", sm: 300 } }}
              />

              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={() => openTechnologyDialog("create")}
              >
                Nova Habilidade
              </Button>
            </Stack>

            <Grid container spacing={2}>
              {filteredRows.map((row) => {
                const tech = row as TechnologyRow;
                const parsed = parseAdminTechnologyType(tech.type);
                return (
                  <Grid size={{ xs: 12, sm: 6, md: 4 }} key={tech.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "space-between", alignItems: "center" }}
                        >
                          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                            {tech.icon_url ? (
                              <Box
                                component="img"
                                src={tech.icon_url}
                                alt={tech.name}
                                loading="eager"
                                decoding="async"
                                sx={{ width: 28, height: 28, objectFit: "contain" }}
                              />
                            ) : null}
                            <Box>
                              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                {tech.label}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                {tech.name} • {parsed.type}
                              </Typography>
                            </Box>
                          </Stack>

                          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                            {isExternalIcon(tech.icon_url) && (
                              <Tooltip title="Salvar ícone da CDN localmente em public/images/tecnologies/">
                                <IconButton
                                  size="small"
                                  color="info"
                                  disabled={isUploading}
                                  onClick={() =>
                                    handleDownloadIcon(
                                      tech.name,
                                      tech.icon_url || undefined,
                                    )
                                  }
                                >
                                  <DownloadRoundedIcon fontSize="small" />
                                </IconButton>
                              </Tooltip>
                            )}
                            <IconButton
                              size="small"
                              onClick={() => openTechnologyDialog("edit", tech)}
                            >
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(tech.id)}
                            >
                              <DeleteOutlineRoundedIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 6. ABA: EXPERIÊNCIAS */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === "experiences" && (
        <Card>
          <CardContent>
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
            >
              <TextField
                placeholder="Buscar experiência..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                size="small"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchRoundedIcon />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={{ width: { xs: "100%", sm: 300 } }}
              />

              <Button
                variant="contained"
                startIcon={<AddRoundedIcon />}
                onClick={() => router.push("/admin/experiences/new?mode=edit")}
              >
                Nova Experiência
              </Button>
            </Stack>

            <Grid container spacing={2}>
              {filteredRows.map((row) => {
                const exp = row as ExperienceRow;
                return (
                  <Grid size={{ xs: 12, md: 6 }} key={exp.id}>
                    <Card variant="outlined">
                      <CardContent>
                        <Stack
                          direction="row"
                          sx={{ justifyContent: "space-between", alignItems: "flex-start" }}
                        >
                          <Box>
                            <Typography variant="h6" sx={{ fontWeight: 700 }}>
                              {exp.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "text.secondary" }}>
                              {exp.slug} {exp.period ? `• ${exp.period}` : ""}
                            </Typography>
                          </Box>

                          <Stack direction="row" spacing={0.5}>
                            <IconButton
                              size="small"
                              onClick={() =>
                                router.push(`/admin/experiences/${exp.id}?mode=edit`)
                              }
                            >
                              <EditOutlinedIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(exp.id)}
                            >
                              <DeleteOutlineRoundedIcon fontSize="small" />
                            </IconButton>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </CardContent>
        </Card>
      )}

      {/* ───────────────────────────────────────────────────────────── */}
      {/* 7. ABA: AMBIENTE & SETUP */}
      {/* ───────────────────────────────────────────────────────────── */}
      {activeTab === "environment" && (
        <Stack spacing={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Diagnóstico do Ambiente
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                Verificação de conectividade e status dos serviços integrados.
              </Typography>

              <Grid container spacing={2.5}>
                <Grid size={{ xs: 12, md: 4 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                        Modo de Execução
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                        {isDev ? "Desenvolvimento (Dev)" : "Produção"}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "success.main" }}>
                        {isDev
                          ? "✓ Hot-Reload e persistência em disco ativos"
                          : "Modo otimizado"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                        Banco Supabase
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                        {envDiagnostics.supabaseReady ? "Conectado" : "Modo Local-First"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: envDiagnostics.supabaseReady
                            ? "success.main"
                            : "warning.main",
                        }}
                      >
                        {envDiagnostics.supabaseReady
                          ? "✓ Nuvem sincronizada"
                          : "Funcionando 100% local com portfolioData.ts"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 4 }}>
                  <Card variant="outlined">
                    <CardContent>
                      <Typography variant="subtitle2" sx={{ color: "text.secondary" }}>
                        Intake com IA (Gemini)
                      </Typography>
                      <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                        {envDiagnostics.geminiReady ? "Ativo" : "Não configurado"}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{
                          color: envDiagnostics.geminiReady
                            ? "success.main"
                            : "text.secondary",
                        }}
                      >
                        {envDiagnostics.geminiReady
                          ? "✓ Gemini 2.0 Flash pronto"
                          : "Chave GEMINI_API_KEY opcional"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </CardContent>
          </Card>

          {/* Ações Globais */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
                Ações do Ambiente & Backup
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary", mb: 3 }}>
                Gere backups, sincronize com a nuvem ou faça a persistência global dos seus dados.
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<SaveRoundedIcon />}
                  onClick={() =>
                    saveLocalData(
                      {
                        profileData: profileForm,
                        themeConfig: themeForm,
                        cvConfig: cvForm,
                        socialLinks: socialForm,
                        collegeData: collegeForm,
                        projectsData,
                        skillsData,
                        experiencesData,
                      },
                      "Todos os dados foram salvos com sucesso em portfolioData.ts!",
                    )
                  }
                  disabled={isSaving}
                >
                  Salvar Tudo no Disco
                </Button>

                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<DownloadRoundedIcon />}
                  onClick={handleDownloadBackup}
                >
                  Baixar Backup (.ts)
                </Button>

                {envDiagnostics.supabaseReady ? (
                  <Button
                    variant="outlined"
                    color="primary"
                    startIcon={<CloudSyncRoundedIcon />}
                    onClick={handleSyncWithSupabase}
                    disabled={isSaving}
                  >
                    Sincronizar com Supabase
                  </Button>
                ) : null}
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      )}

      {/* Modal de Habilidade / Tecnologia */}
      <Dialog
        open={isTechnologyDialogOpen}
        onClose={() => setIsTechnologyDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {technologyDialogMode === "create" ? "Nova Habilidade" : "Editar Habilidade"}
        </DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nome Chave (ex: react, csharp, docker)"
              value={technologyForm.name}
              onChange={(e) =>
                setTechnologyForm((prev) => ({ ...prev, name: e.target.value }))
              }
              fullWidth
            />
            <TextField
              label="Rótulo Visível (ex: React, C#, Docker)"
              value={technologyForm.label}
              onChange={(e) =>
                setTechnologyForm((prev) => ({ ...prev, label: e.target.value }))
              }
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel>Categoria</InputLabel>
              <Select
                value={technologyForm.type}
                label="Categoria"
                onChange={(e) =>
                  setTechnologyForm((prev) => ({ ...prev, type: e.target.value }))
                }
              >
                <MenuItem value="frontend">Frontend</MenuItem>
                <MenuItem value="backend">Backend</MenuItem>
                <MenuItem value="database">Database</MenuItem>
                <MenuItem value="devops">DevOps</MenuItem>
                <MenuItem value="softskill">Soft Skills</MenuItem>
                <MenuItem value="all">Geral / All</MenuItem>
                <MenuItem value="default">Default</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Link Oficial (opcional)"
              value={technologyForm.link}
              onChange={(e) =>
                setTechnologyForm((prev) => ({ ...prev, link: e.target.value }))
              }
              fullWidth
            />
            <Stack spacing={1.5}>
              <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
                {technologyForm.icon_url ? (
                  <Box
                    component="img"
                    src={technologyForm.icon_url}
                    alt="Preview"
                    sx={{
                      width: 44,
                      height: 44,
                      objectFit: "contain",
                      p: 0.5,
                      borderRadius: 1,
                      border: "1px solid rgba(255,255,255,0.15)",
                      bgcolor: "rgba(255,255,255,0.03)",
                    }}
                  />
                ) : null}
                <TextField
                  label="URL do Ícone"
                  placeholder="/images/tecnologies/React.png ou https://..."
                  value={technologyForm.icon_url}
                  onChange={(e) =>
                    setTechnologyForm((prev) => ({ ...prev, icon_url: e.target.value }))
                  }
                  fullWidth
                />
              </Stack>

              <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                <Button
                  variant="outlined"
                  size="small"
                  component="label"
                  disabled={isUploading}
                >
                  {isUploading ? "Enviando..." : "Upload Arquivo"}
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={async (e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      await handleUploadTechnologyIcon(file);
                      e.currentTarget.value = "";
                    }}
                  />
                </Button>

                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<LanguageRoundedIcon />}
                  disabled={isUploading || !technologyForm.name.trim()}
                  onClick={() => {
                    const devicon = getDeviconUrl(technologyForm.name);
                    setTechnologyForm((prev) => ({ ...prev, icon_url: devicon }));
                    setStatus(`Ícone CDN sugerido: ${devicon}`);
                  }}
                >
                  Buscar no Devicon
                </Button>

                {isExternalIcon(technologyForm.icon_url) && (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    startIcon={<DownloadRoundedIcon />}
                    disabled={isUploading || !technologyForm.name.trim()}
                    onClick={async () => {
                      await handleDownloadIcon(
                        technologyForm.name,
                        technologyForm.icon_url,
                      );
                    }}
                  >
                    Baixar para public/
                  </Button>
                )}
              </Stack>

              <Typography variant="caption" color="text.secondary">
                Híbrido: Você pode usar URLs da CDN do Devicon/SimpleIcons ou clicar em &quot;Baixar para public/&quot; para congelar na pasta local.
              </Typography>
            </Stack>
            <FormControlLabel
              control={
                <Checkbox
                  checked={technologyForm.isVisible}
                  onChange={(e) =>
                    setTechnologyForm((prev) => ({
                      ...prev,
                      isVisible: e.target.checked,
                    }))
                  }
                />
              }
              label="Visível no portfólio"
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsTechnologyDialogOpen(false)}>Cancelar</Button>
          <Button variant="contained" onClick={saveTechnology}>
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

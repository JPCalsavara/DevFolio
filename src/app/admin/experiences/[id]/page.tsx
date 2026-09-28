"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import {
  Alert,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";
import {
  ExperienceCardData,
  ExperienceDetailPageData,
  experiencesData,
  experiencesDetailsData,
} from "@/data/portfolioData";

type ExperienceFormState = {
  slug: string;
  title: string;
  location: string;
  period: string;
  role: string;
  summary: string;
  skills_learned: string;
  image_urls: string;
  intro_title: string;
  intro: string;
  achievements: string;
};

const DEFAULTS: ExperienceFormState = {
  slug: "",
  title: "",
  location: "",
  period: "",
  role: "",
  summary: "",
  skills_learned: "",
  image_urls: "",
  intro_title: "",
  intro: "",
  achievements: "",
};

function parseCsv(value: string): string[] {
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseLines(value: string): string[] {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringifyCsv(values?: string[]): string {
  return values?.join(", ") ?? "";
}

function stringifyLines(values?: string[]): string {
  return values?.join("\n") ?? "";
}

export default function AdminExperienceDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState<ExperienceFormState>(DEFAULTS);

  const id = params.id;
  const mode = searchParams.get("mode") === "view" ? "view" : "edit";
  const isNew = id === "new";
  const isReadOnly = mode === "view";

  useEffect(() => {
    async function bootstrap() {
      const isDev = process.env.NODE_ENV === "development";
      if (!isDev && isSupabaseConfigured) {
        const { data: sessionData } = await supabase.auth.getSession();
        if (!sessionData.session) {
          router.push("/admin");
          return;
        }
      }

      if (isNew) {
        setForm(DEFAULTS);
        setIsLoading(false);
        return;
      }

      // Local-first: carregar diretamente de experiencesData sem aguardar timeout de rede
      if (isDev || !isSupabaseConfigured) {
        const fallback = experiencesData.find(
          (e) =>
            (e.slug || e.title.toLowerCase().replace(/\s+/g, "-")) === id,
        );
        if (fallback) {
          setForm({
            slug:
              fallback.slug ||
              fallback.title.toLowerCase().replace(/\s+/g, "-"),
            title: fallback.title,
            location: fallback.location || "",
            period: fallback.period || "",
            role: fallback.role || "",
            summary: fallback.summary,
            skills_learned: stringifyCsv(fallback.skillsLearned ?? []),
            image_urls: stringifyLines(
              fallback.imageNames?.length
                ? fallback.imageNames.map(
                    (name) => `/images/experiences/${name}`,
                  )
                : fallback.imageName
                  ? [`/images/experiences/${fallback.imageName}`]
                  : [],
            ),
            intro_title: fallback.title,
            intro: fallback.summary,
            achievements: stringifyLines(fallback.achievements ?? []),
          });
          setIsLoading(false);
          return;
        }
      }

      const { data, error: queryError } = await supabase
        .from("experiences")
        .select("*")
        .eq("id", id)
        .single();

      if (queryError) {
        setError(queryError.message);
        setIsLoading(false);
        return;
      }

      setForm({
        slug: data.slug,
        title: data.title,
        location: data.location || "",
        period: data.period || "",
        role: data.role || "",
        summary: data.summary,
        skills_learned: stringifyCsv(data.skills_learned),
        image_urls: stringifyLines(data.image_urls),
        intro_title: data.intro_title || "",
        intro: data.intro || "",
        achievements: stringifyLines(data.achievements),
      });

      setIsLoading(false);
    }

    bootstrap();
  }, [id, isNew, router]);

  const payload = useMemo(
    () => ({
      slug: form.slug.trim(),
      title: form.title.trim(),
      location: form.location.trim() || null,
      period: form.period.trim() || null,
      role: form.role.trim() || null,
      summary: form.summary.trim(),
      skills_learned: parseCsv(form.skills_learned),
      image_urls: parseLines(form.image_urls),
      intro_title: form.intro_title.trim() || null,
      intro: form.intro.trim() || null,
      achievements: parseLines(form.achievements),
    }),
    [form],
  );

  async function handleSave() {
    setError("");
    const isDev = process.env.NODE_ENV === "development";

    if (isDev) {
      try {
        const imageNames = parseLines(form.image_urls)
          .map((url) => url.replace(/^\/images\/experiences\//, "").trim())
          .filter(Boolean);

        const updatedItem: ExperienceCardData = {
          slug: form.slug.trim(),
          title: form.title.trim(),
          location: form.location.trim() || undefined,
          period: form.period.trim() || undefined,
          role: form.role.trim() || undefined,
          summary: form.summary.trim(),
          skillsLearned: parseCsv(form.skills_learned),
          imageNames: imageNames.length ? imageNames : undefined,
          imageName: imageNames[0] || undefined,
          achievements: parseLines(form.achievements),
        };

        const existingIndex = experiencesData.findIndex(
          (e) =>
            (e.slug || e.title.toLowerCase().replace(/\s+/g, "-")) ===
            (isNew ? updatedItem.slug : id),
        );
        let nextExperiences = [...experiencesData];
        if (existingIndex >= 0) {
          nextExperiences[existingIndex] = updatedItem;
        } else {
          nextExperiences = [updatedItem, ...nextExperiences];
        }

        // Atualiza também experiencesDetailsData para a página detalhada
        const detailItem: ExperienceDetailPageData = {
          slug:
            updatedItem.slug ||
            updatedItem.title.toLowerCase().replace(/\s+/g, "-"),
          title: updatedItem.title,
          introTitle: form.intro_title.trim() || updatedItem.title,
          intro: form.intro.trim() || updatedItem.summary,
          sections: [updatedItem],
        };

        const existingDetailIndex = experiencesDetailsData.findIndex(
          (d) => d.slug === detailItem.slug,
        );
        let nextDetails = [...experiencesDetailsData];
        if (existingDetailIndex >= 0) {
          nextDetails[existingDetailIndex] = detailItem;
        } else {
          nextDetails = [...nextDetails, detailItem];
        }

        await fetch("/api/admin/save-local", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            experiencesData: nextExperiences,
            experiencesDetailsData: nextDetails,
          }),
        });

        setStatus(
          isNew
            ? "Experiência criada e salva em portfolioData.ts com sucesso!"
            : "Experiência atualizada e salva em portfolioData.ts com sucesso!",
        );
        if (isNew) {
          setTimeout(() => router.push("/admin"), 800);
        }
        return;
      } catch (err) {
        console.error("Erro ao salvar experiência localmente:", err);
        setError("Erro ao salvar dados localmente.");
        return;
      }
    }

    if (isNew) {
      const { error: createError } = await supabase
        .from("experiences")
        .insert(payload);
      if (createError) {
        setError(createError.message);
        return;
      }

      setStatus("Experiência criada com sucesso!");
      setTimeout(() => router.push("/admin"), 800);
      return;
    }

    const { error: updateError } = await supabase
      .from("experiences")
      .update(payload)
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setStatus("Experiência atualizada com sucesso!");
  }

  async function uploadExperienceImage(file: File) {
    setError("");
    setIsUploading(true);

    try {
      const isDev = process.env.NODE_ENV === "development";

      if (isDev) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", "experience");

        const res = await fetch("/api/admin/upload-file", {
          method: "POST",
          body: formData,
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || "Falha no upload local da imagem.");
        }

        setForm((prev) => {
          const existing = parseLines(prev.image_urls);
          return {
            ...prev,
            image_urls: [...existing, data.url].join("\n"),
          };
        });
        setStatus(`Upload salvo com sucesso em public/images/experiences/${data.filename}`);
        return;
      }

      // Em produção (Supabase Storage)
      const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
      const filePath = `experiences/${Date.now()}-${safeName}`;
      const { error: uploadError } = await supabase.storage
        .from("portfolio")
        .upload(filePath, file, {
          cacheControl: "3600",
          upsert: true,
        });

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      const { data } = supabase.storage
        .from("portfolio")
        .getPublicUrl(filePath);
      setForm((prev) => {
        const existing = parseLines(prev.image_urls);
        return {
          ...prev,
          image_urls: [...existing, data.publicUrl].join("\n"),
        };
      });
      setStatus("Upload concluído no Supabase.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro no upload da imagem.");
    } finally {
      setIsUploading(false);
    }
  }

  if (isLoading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Stack spacing={2.5}>
        <Button
          variant="outlined"
          startIcon={<ArrowBackRoundedIcon />}
          onClick={() => router.push("/admin")}
          sx={{ alignSelf: "flex-start" }}
        >
          Voltar ao Admin
        </Button>

        <Typography variant="h4">
          {isNew ? "Nova experiencia" : "Experiencia"} •{" "}
          {isReadOnly ? "Visualizar" : "Editar"}
        </Typography>

        {error ? <Alert severity="error">{error}</Alert> : null}
        {status ? <Alert severity="success">{status}</Alert> : null}

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Landing Page
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Slug"
                  value={form.slug}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, slug: event.target.value }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Titulo"
                  value={form.title}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, title: event.target.value }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Local"
                  value={form.location}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      location: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Periodo"
                  value={form.period}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, period: event.target.value }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Cargo"
                  value={form.role}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, role: event.target.value }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Skills (csv)"
                  value={form.skills_learned}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      skills_learned: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Resumo"
                  value={form.summary}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      summary: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Image URLs (1 por linha)"
                  value={form.image_urls}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      image_urls: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>

              {!isReadOnly ? (
                <Grid size={{ xs: 12 }}>
                  <Button
                    variant="outlined"
                    component="label"
                    disabled={isUploading}
                  >
                    {isUploading
                      ? "Enviando..."
                      : "Upload imagem (public/images/experiences)"}
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        await uploadExperienceImage(file);
                        event.currentTarget.value = "";
                      }}
                    />
                  </Button>
                </Grid>
              ) : null}
            </Grid>
          </CardContent>
        </Card>

        <Card>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Detail Page
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Intro title"
                  value={form.intro_title}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      intro_title: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={4}
                  label="Intro"
                  value={form.intro}
                  onChange={(event) =>
                    setForm((prev) => ({ ...prev, intro: event.target.value }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={5}
                  label="Achievements (1 por linha)"
                  value={form.achievements}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      achievements: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {!isReadOnly ? (
          <Stack direction="row" spacing={1}>
            <Button variant="contained" onClick={handleSave}>
              {isNew ? "Criar experiencia" : "Salvar alteracoes"}
            </Button>
            <Button variant="outlined" onClick={() => router.push("/admin")}>
              Cancelar
            </Button>
          </Stack>
        ) : null}
      </Stack>
    </Container>
  );
}

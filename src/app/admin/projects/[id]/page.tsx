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
import { supabase } from "@/lib/supabase/client";

type ProjectFormState = {
  slug: string;
  title: string;
  summary_line: string;
  period: string;
  technologies: string;
  description: string;
  image_url: string;
  production_link: string;
  repository_link: string;
  details_goal: string;
  details_highlights: string;
  details_impact: string;
};

const DEFAULTS: ProjectFormState = {
  slug: "",
  title: "",
  summary_line: "",
  period: "",
  technologies: "",
  description: "",
  image_url: "",
  production_link: "",
  repository_link: "",
  details_goal: "",
  details_highlights: "",
  details_impact: "",
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

export default function AdminProjectDetailPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const searchParams = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [form, setForm] = useState<ProjectFormState>(DEFAULTS);

  const id = params.id;
  const mode = searchParams.get("mode") === "view" ? "view" : "edit";
  const isNew = id === "new";
  const isReadOnly = mode === "view";

  useEffect(() => {
    async function bootstrap() {
      const { data: sessionData } = await supabase.auth.getSession();
      if (!sessionData.session) {
        router.push("/admin");
        return;
      }

      if (isNew) {
        setForm(DEFAULTS);
        setIsLoading(false);
        return;
      }

      const { data, error: queryError } = await supabase
        .from("projects")
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
        summary_line: data.summary_line || "",
        period: data.period || "",
        technologies: stringifyCsv(data.technologies),
        description: data.description,
        image_url: data.image_url || "",
        production_link: data.production_link || "",
        repository_link: data.repository_link || "",
        details_goal: data.details_goal || "",
        details_highlights: stringifyLines(data.details_highlights),
        details_impact: data.details_impact || "",
      });

      setIsLoading(false);
    }

    bootstrap();
  }, [id, isNew, router]);

  const payload = useMemo(
    () => ({
      slug: form.slug.trim(),
      title: form.title.trim(),
      summary_line: form.summary_line.trim() || null,
      period: form.period.trim() || null,
      technologies: parseCsv(form.technologies),
      description: form.description.trim(),
      image_url: form.image_url.trim() || null,
      production_link: form.production_link.trim() || null,
      repository_link: form.repository_link.trim() || null,
      details_goal: form.details_goal.trim() || null,
      details_highlights: parseLines(form.details_highlights),
      details_impact: form.details_impact.trim() || null,
    }),
    [form],
  );

  async function handleSave() {
    setError("");

    if (isNew) {
      const { error: createError } = await supabase
        .from("projects")
        .insert(payload);
      if (createError) {
        setError(createError.message);
        return;
      }

      setStatus("Projeto criado com sucesso.");
      router.push("/admin");
      return;
    }

    const { error: updateError } = await supabase
      .from("projects")
      .update(payload)
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setStatus("Projeto atualizado com sucesso.");
  }

  async function uploadProjectImage(file: File) {
    setError("");
    setIsUploading(true);

    try {
      const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
      const filePath = `projects/${Date.now()}-${safeName}`;
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
      setForm((prev) => ({ ...prev, image_url: data.publicUrl }));
      setStatus("Upload concluido.");
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
          {isNew ? "Novo projeto" : "Projeto"} •{" "}
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
                  label="Resumo curto"
                  value={form.summary_line}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      summary_line: event.target.value,
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
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Tecnologias (csv)"
                  value={form.technologies}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      technologies: event.target.value,
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
                  label="Descricao"
                  value={form.description}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  label="Image URL"
                  value={form.image_url}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      image_url: event.target.value,
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
                    {isUploading ? "Enviando..." : "Upload imagem (Supabase)"}
                    <input
                      hidden
                      type="file"
                      accept="image/*"
                      onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (!file) return;
                        await uploadProjectImage(file);
                        event.currentTarget.value = "";
                      }}
                    />
                  </Button>
                </Grid>
              ) : null}
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Link producao"
                  value={form.production_link}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      production_link: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                  fullWidth
                  label="Link repositorio"
                  value={form.repository_link}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      repository_link: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
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
                  multiline
                  minRows={3}
                  label="Objetivo"
                  value={form.details_goal}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      details_goal: event.target.value,
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
                  label="Destaques (1 por linha)"
                  value={form.details_highlights}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      details_highlights: event.target.value,
                    }))
                  }
                  disabled={isReadOnly}
                />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField
                  fullWidth
                  multiline
                  minRows={3}
                  label="Impacto"
                  value={form.details_impact}
                  onChange={(event) =>
                    setForm((prev) => ({
                      ...prev,
                      details_impact: event.target.value,
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
              {isNew ? "Criar projeto" : "Salvar alteracoes"}
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

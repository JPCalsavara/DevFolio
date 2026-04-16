"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";

type ManagedEntity = "projects" | "habilidades" | "experiences";

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
};

export default function AdminPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedTable, setSelectedTable] = useState<ManagedEntity>("projects");
  const [rows, setRows] = useState<EntityRow[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const [isTechnologyDialogOpen, setIsTechnologyDialogOpen] = useState(false);
  const [technologyDialogMode, setTechnologyDialogMode] = useState<
    "create" | "view" | "edit"
  >("create");
  const [selectedTechnologyId, setSelectedTechnologyId] = useState("");
  const [technologyForm, setTechnologyForm] =
    useState<TechnologyFormState>(TECHNOLOGY_DEFAULTS);
  const [isUploading, setIsUploading] = useState(false);

  const filteredRows = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) {
      return rows;
    }

    return rows.filter((row) => JSON.stringify(row).toLowerCase().includes(q));
  }, [rows, searchTerm]);

  function getRowId(row: EntityRow): string {
    return String((row as { id?: string }).id || "");
  }

  function getEntityLabel(entity: ManagedEntity): string {
    if (entity === "projects") return "Projetos";
    if (entity === "habilidades") return "Habilidades";
    return "Experiencias";
  }

  function getCardTitle(row: EntityRow): string {
    if (selectedTable === "projects") {
      return (row as ProjectRow).title;
    }

    if (selectedTable === "experiences") {
      return (row as ExperienceRow).title;
    }

    return (row as TechnologyRow).label;
  }

  function getCardSubtitle(row: EntityRow): string {
    if (selectedTable === "projects") {
      const project = row as ProjectRow;
      return `${project.slug} ${project.period ? `• ${project.period}` : ""}`;
    }

    if (selectedTable === "experiences") {
      const experience = row as ExperienceRow;
      return `${experience.slug} ${experience.period ? `• ${experience.period}` : ""}`;
    }

    const technology = row as TechnologyRow;
    const parsed = parseAdminTechnologyType(technology.type);
    return `${technology.name} • ${parsed.type} • ${parsed.isVisible ? "Mostrando" : "Escondido"}`;
  }

  function technologyRowToForm(row: TechnologyRow): TechnologyFormState {
    const parsed = parseAdminTechnologyType(row.type);

    return {
      name: row.name,
      label: row.label,
      type: parsed.type,
      isVisible: parsed.isVisible,
      link: row.link || "",
      icon_url: row.icon_url || "",
    };
  }

  async function loadRows(entity: ManagedEntity) {
    const { data, error: queryError } = await supabase
      .from(entity)
      .select("*")
      .order("created_at", { ascending: false });

    if (queryError) {
      setError(queryError.message);
      return;
    }

    setRows((data ?? []) as EntityRow[]);
  }

  async function refreshSession() {
    const { data } = await supabase.auth.getSession();
    setIsAuthenticated(Boolean(data.session));
  }

  useEffect(() => {
    refreshSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(Boolean(session));
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    loadRows(selectedTable);
    setSearchTerm("");
    setIsTechnologyDialogOpen(false);
    setStatus("");
    setError("");
  }, [isAuthenticated, selectedTable]);

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setStatus("Autenticando...");

    const { error: loginError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (loginError) {
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

  async function handleDelete(rowId: string) {
    setError("");
    const { error: deleteError } = await supabase
      .from(selectedTable)
      .delete()
      .eq("id", rowId);

    if (deleteError) {
      setError(deleteError.message);
      return;
    }

    setStatus("Registro removido com sucesso.");
    await loadRows(selectedTable);
  }

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
    setTechnologyForm(technologyRowToForm(technology));
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

    if (technologyDialogMode === "create") {
      const { error: createError } = await supabase
        .from("habilidades")
        .insert(payload);

      if (createError) {
        setError(createError.message);
        return;
      }

      setStatus("Habilidade criada com sucesso.");
    }

    if (technologyDialogMode === "edit") {
      const { error: updateError } = await supabase
        .from("habilidades")
        .update(payload)
        .eq("id", selectedTechnologyId);

      if (updateError) {
        setError(updateError.message);
        return;
      }

      setStatus("Habilidade atualizada com sucesso.");
    }

    setIsTechnologyDialogOpen(false);
    await loadRows("habilidades");
  }

  async function uploadTechnologyIcon(file: File) {
    setError("");
    setIsUploading(true);

    try {
      const safeName = file.name.replace(/\s+/g, "-").toLowerCase();
      const filePath = `technologies/${Date.now()}-${safeName}`;
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

      setTechnologyForm((prev) => ({
        ...prev,
        icon_url: data.publicUrl,
      }));

      setStatus("Upload concluido e URL preenchida.");
    } finally {
      setIsUploading(false);
    }
  }

  function goToEntityPage(
    entity: "projects" | "experiences",
    id: string,
    mode: "view" | "edit",
  ) {
    router.push(`/admin/${entity}/${id}?mode=${mode}`);
  }

  if (!isAuthenticated) {
    return (
      <Container maxWidth="sm" sx={{ py: 10 }}>
        <Card>
          <CardContent>
            <Typography variant="h4" sx={{ mb: 2 }}>
              Login Admin
            </Typography>
            <Typography sx={{ color: "text.secondary", mb: 3 }}>
              Login para gerenciar projetos, habilidades e experiencias.
            </Typography>

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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
              <TextField
                label="Senha"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <Button type="submit" variant="contained" color="primary">
                Entrar
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Box>
              <Typography variant="h4">Painel Admin</Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Projetos e experiencias em paginas proprias. Habilidades em
                overlay.
              </Typography>
            </Box>
            <Button variant="outlined" color="secondary" onClick={handleLogout}>
              Sair
            </Button>
          </Stack>

          <Tabs
            value={selectedTable}
            onChange={(_event, value: ManagedEntity) => setSelectedTable(value)}
            sx={{ mt: 2 }}
          >
            <Tab value="projects" label="Projetos" />
            <Tab value="habilidades" label="Habilidades" />
            <Tab value="experiences" label="Experiencias" />
          </Tabs>
        </CardContent>
      </Card>

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

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={1.5}
            sx={{
              alignItems: { md: "center" },
              justifyContent: "space-between",
            }}
          >
            <TextField
              fullWidth
              label={`Filtrar ${getEntityLabel(selectedTable).toLowerCase()}`}
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchRoundedIcon fontSize="small" />
                    </InputAdornment>
                  ),
                },
              }}
            />

            <Button
              variant="contained"
              startIcon={<AddRoundedIcon />}
              sx={{ minWidth: 170 }}
              onClick={() => {
                if (selectedTable === "habilidades") {
                  openTechnologyDialog("create");
                  return;
                }

                if (selectedTable === "projects") {
                  router.push("/admin/projects/new?mode=edit");
                  return;
                }

                router.push("/admin/experiences/new?mode=edit");
              }}
            >
              Adicionar
            </Button>
          </Stack>
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Lista de {getEntityLabel(selectedTable).toLowerCase()}
          </Typography>

          {filteredRows.length === 0 ? (
            <Typography sx={{ color: "text.secondary" }}>
              Nenhum item encontrado para o filtro atual.
            </Typography>
          ) : null}

          <Grid
            container
            spacing={2}
            columns={
              selectedTable === "habilidades"
                ? { xs: 12, sm: 10, md: 20 }
                : { xs: 12, sm: 12, md: 12 }
            }
          >
            {filteredRows.map((row) => {
              const rowId = getRowId(row);
              const technology =
                selectedTable === "habilidades" ? (row as TechnologyRow) : null;

              return (
                <Grid
                  key={rowId}
                  size={{
                    xs: 12,
                    sm: selectedTable === "habilidades" ? 5 : 12,
                    md: selectedTable === "habilidades" ? 4 : 6,
                  }}
                >
                  <Card
                    variant="outlined"
                    sx={{
                      borderColor: "rgba(148,163,184,0.26)",
                      backgroundColor: "rgba(10,15,27,0.65)",
                    }}
                  >
                    <CardContent>
                      <Stack spacing={1.2}>
                        {selectedTable === "habilidades" ? (
                          <Box
                            sx={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              mb: 0.5,
                            }}
                          >
                            <Box
                              component="img"
                              src={
                                technology?.icon_url ||
                                TECHNOLOGY_IMAGE_BY_NAME[
                                  (technology?.name || "").toLowerCase()
                                ] ||
                                "/images/icons/screen-svgrepo-com.svg"
                              }
                              alt={`Icone ${technology?.label || "habilidade"}`}
                              loading="lazy"
                              decoding="async"
                              sx={{
                                width: 56,
                                height: 56,
                                objectFit: "contain",
                                borderRadius: 1,
                              }}
                            />
                          </Box>
                        ) : null}

                        <Typography
                          variant="h6"
                          sx={{
                            textAlign:
                              selectedTable === "habilidades"
                                ? "center"
                                : "left",
                          }}
                        >
                          {getCardTitle(row)}
                        </Typography>
                        <Typography
                          sx={{
                            color: "text.secondary",
                            textAlign:
                              selectedTable === "habilidades"
                                ? "center"
                                : "left",
                          }}
                        >
                          {getCardSubtitle(row)}
                        </Typography>

                        <Stack
                          direction="row"
                          spacing={1}
                          sx={{
                            justifyContent:
                              selectedTable === "habilidades"
                                ? "center"
                                : "flex-start",
                          }}
                        >
                          <IconButton
                            aria-label="Editar"
                            onClick={() => {
                              if (selectedTable === "habilidades") {
                                openTechnologyDialog("edit", row);
                                return;
                              }

                              if (selectedTable === "projects") {
                                goToEntityPage("projects", rowId, "edit");
                                return;
                              }

                              goToEntityPage("experiences", rowId, "edit");
                            }}
                            sx={{
                              color: "#F59E0B",
                              backgroundColor: "rgba(245,158,11,0.12)",
                            }}
                          >
                            <EditOutlinedIcon />
                          </IconButton>

                          <IconButton
                            aria-label="Excluir"
                            onClick={async () => {
                              const ok = window.confirm(
                                "Tem certeza que deseja excluir este item?",
                              );
                              if (!ok) return;
                              await handleDelete(rowId);
                            }}
                            sx={{
                              color: "#EF4444",
                              backgroundColor: "rgba(239,68,68,0.12)",
                            }}
                          >
                            <DeleteOutlineRoundedIcon />
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

      <Dialog
        open={isTechnologyDialogOpen}
        onClose={() => setIsTechnologyDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          {technologyDialogMode === "create"
            ? "Nova habilidade"
            : technologyDialogMode === "view"
              ? "Visualizar habilidade"
              : "Editar habilidade"}
        </DialogTitle>

        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Nome técnico"
              value={technologyForm.name}
              onChange={(event) =>
                setTechnologyForm((prev) => ({
                  ...prev,
                  name: event.target.value,
                }))
              }
              disabled={technologyDialogMode === "view"}
              required
            />
            <TextField
              label="Rótulo"
              value={technologyForm.label}
              onChange={(event) =>
                setTechnologyForm((prev) => ({
                  ...prev,
                  label: event.target.value,
                }))
              }
              disabled={technologyDialogMode === "view"}
              required
            />
            <TextField
              label="Tipo"
              value={technologyForm.type}
              onChange={(event) =>
                setTechnologyForm((prev) => ({
                  ...prev,
                  type: event.target.value,
                }))
              }
              disabled={technologyDialogMode === "view"}
              required
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={technologyForm.isVisible}
                  onChange={(event) =>
                    setTechnologyForm((prev) => ({
                      ...prev,
                      isVisible: event.target.checked,
                    }))
                  }
                />
              }
              label={
                technologyForm.isVisible
                  ? "Mostrando na seção Habilidades"
                  : "Escondido na seção Habilidades"
              }
              disabled={technologyDialogMode === "view"}
            />
            <TextField
              label="Link"
              value={technologyForm.link}
              onChange={(event) =>
                setTechnologyForm((prev) => ({
                  ...prev,
                  link: event.target.value,
                }))
              }
              disabled={technologyDialogMode === "view"}
            />
            <TextField
              label="URL do ícone"
              value={technologyForm.icon_url}
              onChange={(event) =>
                setTechnologyForm((prev) => ({
                  ...prev,
                  icon_url: event.target.value,
                }))
              }
              disabled={technologyDialogMode === "view"}
            />

            {technologyDialogMode !== "view" ? (
              <Button
                variant="outlined"
                component="label"
                disabled={isUploading}
              >
                {isUploading ? "Enviando..." : "Upload ícone (Supabase)"}
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={async (event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    await uploadTechnologyIcon(file);
                    event.currentTarget.value = "";
                  }}
                />
              </Button>
            ) : null}
          </Stack>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setIsTechnologyDialogOpen(false)}>
            Fechar
          </Button>
          {technologyDialogMode !== "view" ? (
            <Button variant="contained" onClick={saveTechnology}>
              {technologyDialogMode === "create" ? "Criar" : "Salvar"}
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </Container>
  );
}

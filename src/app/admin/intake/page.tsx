"use client";

import { useState, useRef } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
  FormControlLabel,
  Switch,
  IconButton,
} from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import CloudUploadRoundedIcon from "@mui/icons-material/CloudUploadRounded";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import { supabase } from "@/lib/supabase/client";
import type { IntakeDraft, IntakeHabilidade, IntakeProject, IntakeExperience } from "@/lib/intake/schema";
import type { ValidationResult } from "@/lib/intake/schema";

type Step = "input" | "review" | "done";

export default function IntakePage() {
  // ── Inputs ────────────────────────────────────────────────
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [githubLinks, setGithubLinks] = useState("");
  const [projectLinks, setProjectLinks] = useState("");
  const [notes, setNotes] = useState("");
  const [tuneContent, setTuneContent] = useState(true);
  const [generateResume, setGenerateResume] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Estado da pipeline ────────────────────────────────────
  const [step, setStep] = useState<Step>("input");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [draft, setDraft] = useState<IntakeDraft | null>(null);
  const [validation, setValidation] = useState<ValidationResult | null>(null);
  const [applyReport, setApplyReport] = useState<{
    applied: { habilidades: number; projects: number; experiences: number };
    errors: string[];
  } | null>(null);
  const [apiError, setApiError] = useState("");

  // ── Handlers ──────────────────────────────────────────────
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCvFile(e.target.files[0]);
    }
  }

  function clearFile() {
    setCvFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  function downloadTex() {
    if (!draft?.resume_tex) return;
    const blob = new Blob([draft.resume_tex], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "resume.tex";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function handleParse() {
    setLoading(true);
    setApiError("");
    setValidation(null);
    setDraft(null);

    try {
      const formData = new FormData();
      if (cvFile) formData.append("cv_file", cvFile);
      formData.append("cv_text", cvText);
      formData.append("github_links", githubLinks);
      formData.append("project_links", projectLinks);
      formData.append("notes", notes);
      formData.append("tune_content", String(tuneContent));
      formData.append("generate_resume", String(generateResume));
      if (customApiKey) formData.append("custom_api_key", customApiKey);

      const res = await fetch("/api/intake/parse", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao analisar");

      setDraft(data.draft as IntakeDraft);
      setStep("review");
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  async function handleValidate() {
    if (!draft) return;
    setLoading(true);
    setApiError("");

    try {
      const res = await fetch("/api/intake/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ draft }),
      });
      const data = await res.json();
      setValidation(data as ValidationResult);
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  async function handleApply() {
    if (!draft || !validation?.valid) return;
    setLoading(true);
    setApiError("");

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setApiError("Você precisa estar logado como admin para aplicar.");
        return;
      }

      const res = await fetch("/api/intake/apply", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ draft }),
      });

      const data = await res.json();
      if (!res.ok && res.status !== 207) throw new Error(data.error ?? "Erro ao aplicar");

      setApplyReport(data);
      setStep("done");
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      {/* Header */}
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
          <AutoAwesomeRoundedIcon sx={{ color: "primary.main", fontSize: 32 }} />
          <Typography variant="h4" sx={{ fontWeight: 800 }}>
            Intake de Portfólio via IA
          </Typography>
        </Stack>
        <Typography sx={{ color: "text.secondary" }}>
          Faça upload do seu CV em PDF ou texto, adicione links e deixe a IA extrair tudo e até gerar um novo CV LaTeX usando o template open-source.
        </Typography>
      </Stack>

      {/* Stepper visual */}
      <Stack direction="row" spacing={2} sx={{ mb: 4 }}>
        {(["Entrada", "Revisão", "Concluído"] as const).map((label, i) => {
          const stepIdx = ["input", "review", "done"].indexOf(step);
          const active = i === stepIdx;
          const done = i < stepIdx;
          return (
            <Chip
              key={label}
              label={`${i + 1}. ${label}`}
              color={active ? "primary" : done ? "success" : "default"}
              variant={active ? "filled" : "outlined"}
              size="small"
            />
          );
        })}
      </Stack>

      {apiError && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setApiError("")}>
          {apiError}
        </Alert>
      )}

      {/* ── STEP: INPUT ──────────────────────────────────── */}
      {step === "input" && (
        <Card>
          <CardContent>
            <Stack spacing={3}>
              <Box sx={{ border: "1px dashed", borderColor: "divider", borderRadius: 2, p: 3, textAlign: "center" }}>
                <input
                  type="file"
                  accept="application/pdf"
                  style={{ display: "none" }}
                  ref={fileInputRef}
                  onChange={handleFileChange}
                />
                {!cvFile ? (
                  <Stack spacing={1} sx={{ alignItems: "center" }}>
                    <UploadFileRoundedIcon sx={{ fontSize: 48, color: "text.secondary" }} />
                    <Typography>Faça upload do seu CV em PDF</Typography>
                    <Button variant="outlined" size="small" onClick={() => fileInputRef.current?.click()}>
                      Escolher arquivo
                    </Button>
                  </Stack>
                ) : (
                  <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center" }}>
                    <Typography sx={{ fontWeight: 700 }} color="primary">{cvFile.name}</Typography>
                    <IconButton size="small" onClick={clearFile} color="error"><CloseRoundedIcon /></IconButton>
                  </Stack>
                )}
              </Box>

              <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center" }}>
                OU
              </Typography>

              <TextField
                label="Texto do CV (txt na mão mesmo)"
                multiline
                rows={6}
                fullWidth
                placeholder="Cole aqui o conteúdo do seu currículo em texto plano ou Markdown..."
                value={cvText}
                onChange={(e) => setCvText(e.target.value)}
                disabled={!!cvFile}
              />

              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <TextField
                  label="Links do GitHub (um por linha)"
                  multiline
                  rows={2}
                  fullWidth
                  placeholder={"https://github.com/user/repo-1"}
                  value={githubLinks}
                  onChange={(e) => setGithubLinks(e.target.value)}
                />
                <TextField
                  label="Projetos em produção (um por linha)"
                  multiline
                  rows={2}
                  fullWidth
                  placeholder="https://meu-projeto.vercel.app"
                  value={projectLinks}
                  onChange={(e) => setProjectLinks(e.target.value)}
                />
              </Stack>
              
              <TextField
                label="Observações adicionais (opcional)"
                fullWidth
                placeholder="Ex: Foco em backend, omitir projetos antigos..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />

              <TextField
                label="Chave da API do Gemini (Opcional)"
                type="password"
                fullWidth
                placeholder="Se em branco, usará a do servidor"
                value={customApiKey}
                onChange={(e) => setCustomApiKey(e.target.value)}
              />

              <Divider />
              
              <Stack direction="column" spacing={1}>
                <FormControlLabel
                  control={<Switch checked={tuneContent} onChange={(e) => setTuneContent(e.target.checked)} color="primary" />}
                  label="Tunar com IA: Melhorar verbos de ação e impacto usando método STAR (Recomendado)"
                />
                <FormControlLabel
                  control={<Switch checked={generateResume} onChange={(e) => setGenerateResume(e.target.checked)} color="secondary" />}
                  label="Gerar arquivo LaTeX (curriculo.tex) com base no open-source resume-template"
                />
              </Stack>

              <Button
                variant="contained"
                size="large"
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <AutoAwesomeRoundedIcon />}
                onClick={handleParse}
                disabled={loading || (!cvFile && !cvText.trim() && !githubLinks.trim() && !projectLinks.trim())}
              >
                {loading ? "Analisando..." : "Analisar com IA"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}

      {/* ── STEP: REVIEW ─────────────────────────────────── */}
      {step === "review" && draft && (
        <Stack spacing={3}>
          {draft.warnings?.length > 0 && (
            <Alert severity="warning" icon={<WarningAmberRoundedIcon />}>
              <Typography sx={{ fontWeight: 700, mb: 0.5 }}>Avisos da IA:</Typography>
              {draft.warnings.map((w, i) => <Typography key={i} variant="body2">• {w}</Typography>)}
            </Alert>
          )}

          {validation && (
            <Alert severity={validation.valid ? "success" : "error"}>
              <Typography sx={{ fontWeight: 700 }}>
                {validation.valid ? "✅ Draft válido — pronto para aplicar" : `❌ ${validation.errors.length} erro(s) encontrado(s)`}
              </Typography>
              {validation.errors.map((e, i) => (
                <Typography key={i} variant="body2">• {e}</Typography>
              ))}
              {validation.warnings.map((w, i) => (
                <Typography key={i} variant="body2" sx={{ color: "warning.main" }}>⚠ {w}</Typography>
              ))}
            </Alert>
          )}

          {draft.resume_tex && (
            <Card sx={{ bgcolor: "rgba(125, 211, 252, 0.05)", borderColor: "secondary.main" }}>
              <CardContent>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography sx={{ fontWeight: 700 }} color="secondary.light">Seu currículo LaTeX está pronto!</Typography>
                    <Typography variant="body2" color="text.secondary">Código gerado preservando direitos autorais do resume-template.</Typography>
                  </Box>
                  <Button variant="contained" color="secondary" startIcon={<DownloadRoundedIcon />} onClick={downloadTex}>
                    Baixar .tex
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardContent>
              <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 2 }}>
                <Tab label={`Habilidades (${draft.habilidades.length})`} />
                <Tab label={`Projetos (${draft.projects.length})`} />
                <Tab label={`Experiências (${draft.experiences.length})`} />
              </Tabs>

              {activeTab === 0 && (
                <Stack spacing={1}>
                  {draft.habilidades.map((h: IntakeHabilidade, i) => (
                    <Box key={i} sx={{ p: 1.5, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                        <Chip label={h.type} size="small" />
                        <Typography sx={{ fontWeight: 700 }}>{h.label}</Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary" }}>({h.name})</Typography>
                        {h.link && <Typography variant="caption" sx={{ color: "primary.main" }}>{h.link}</Typography>}
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              )}

              {activeTab === 1 && (
                <Stack spacing={2}>
                  {draft.projects.map((p: IntakeProject, i) => (
                    <Box key={i} sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                      <Typography sx={{ fontWeight: 700 }}>{p.title}</Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                        {p.slug} {p.period ? `• ${p.period}` : ""}
                      </Typography>
                      <Typography variant="body2">{p.description}</Typography>
                      {p.technologies.length > 0 && (
                        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {p.technologies.map((t) => <Chip key={t} label={t} size="small" variant="outlined" />)}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Stack>
              )}

              {activeTab === 2 && (
                <Stack spacing={2}>
                  {draft.experiences.map((e: IntakeExperience, i) => (
                    <Box key={i} sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                      <Typography sx={{ fontWeight: 700 }}>{e.title}</Typography>
                      <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>
                        {e.role} {e.period ? `• ${e.period}` : ""} {e.location ? `— ${e.location}` : ""}
                      </Typography>
                      <Typography variant="body2">{e.summary}</Typography>
                      {e.achievements.length > 0 && (
                        <Box sx={{ mt: 1 }}>
                          {e.achievements.map((a, ai) => (
                            <Typography key={ai} variant="body2">• {a}</Typography>
                          ))}
                        </Box>
                      )}
                    </Box>
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>

          <Divider />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <Button variant="outlined" onClick={() => setStep("input")}>
              ← Voltar e editar entrada
            </Button>
            <Button
              variant="outlined"
              color="warning"
              startIcon={<WarningAmberRoundedIcon />}
              onClick={handleValidate}
              disabled={loading}
            >
              {loading ? <CircularProgress size={18} /> : "Validar draft"}
            </Button>
            <Button
              variant="contained"
              color="success"
              startIcon={<CloudUploadRoundedIcon />}
              onClick={handleApply}
              disabled={loading || !validation?.valid}
            >
              {loading ? <CircularProgress size={18} color="inherit" /> : "Aplicar no Supabase"}
            </Button>
          </Stack>
        </Stack>
      )}

      {/* ── STEP: DONE ───────────────────────────────────── */}
      {step === "done" && applyReport && (
        <Card>
          <CardContent>
            <Stack spacing={2} sx={{ alignItems: "center", py: 4 }}>
              <CheckCircleOutlineRoundedIcon sx={{ fontSize: 64, color: "success.main" }} />
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Dados aplicados com sucesso!
              </Typography>

              <Stack direction="row" spacing={2}>
                <Chip label={`${applyReport.applied.habilidades} habilidades`} color="primary" />
                <Chip label={`${applyReport.applied.experiences} experiências`} color="secondary" />
                <Chip label={`${applyReport.applied.projects} projetos`} color="info" />
              </Stack>

              {applyReport.errors.length > 0 && (
                <Alert severity="warning" sx={{ width: "100%" }}>
                  <Typography sx={{ fontWeight: 700 }}>Erros parciais:</Typography>
                  {applyReport.errors.map((e, i) => (
                    <Typography key={i} variant="body2">• {e}</Typography>
                  ))}
                </Alert>
              )}

              <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                <Button variant="outlined" onClick={() => { setStep("input"); setDraft(null); setValidation(null); setApplyReport(null); }}>
                  Novo intake
                </Button>
                <Button variant="contained" component="a" href="/">
                  Ver portfólio
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}

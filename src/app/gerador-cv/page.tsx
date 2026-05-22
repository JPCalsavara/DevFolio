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
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import TerminalRoundedIcon from "@mui/icons-material/TerminalRounded";
import type { IntakeDraft, IntakeHabilidade, IntakeProject, IntakeExperience } from "@/lib/intake/schema";

type Step = "input" | "review";

export default function GeradorCVPage() {
  // ── Inputs ────────────────────────────────────────────────
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [cvText, setCvText] = useState("");
  const [githubLinks, setGithubLinks] = useState("");
  const [projectLinks, setProjectLinks] = useState("");
  const [tuneContent, setTuneContent] = useState(true);
  
  // Como essa página é focada em CV, forçamos a geração de LaTeX
  const generateResume = true;
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ── Estado da pipeline ────────────────────────────────────
  const [step, setStep] = useState<Step>("input");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const [draft, setDraft] = useState<IntakeDraft | null>(null);
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
    a.download = "curriculo_tunado.tex";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  async function handleParse() {
    setLoading(true);
    setApiError("");
    setDraft(null);

    try {
      const formData = new FormData();
      if (cvFile) formData.append("cv_file", cvFile);
      formData.append("cv_text", cvText);
      formData.append("github_links", githubLinks);
      formData.append("project_links", projectLinks);
      formData.append("tune_content", String(tuneContent));
      formData.append("generate_resume", String(generateResume));

      // Reutiliza a rota aberta de parse (protegida apenas por limitação de CORS/rate limit se necessário)
      const res = await fetch("/api/intake/parse", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Erro ao analisar seu currículo");

      setDraft(data.draft as IntakeDraft);
      setStep("review");
    } catch (e) {
      setApiError(e instanceof Error ? e.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  // ── Render ────────────────────────────────────────────────
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pt: 10, pb: 8 }}>
      <Container maxWidth="md">
        {/* Header Landing Page */}
        <Stack spacing={2} sx={{ alignItems: "center", textAlign: "center", mb: 6 }}>
          <Chip label="Versão de Demonstração (Sem Banco de Dados)" color="secondary" variant="outlined" />
          <Typography variant="h3" sx={{ fontWeight: 900, background: "linear-gradient(90deg, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Gerador de CV IA
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600 }}>
            Transforme seu PDF bagunçado em um currículo LaTeX impecável usando o método STAR e estruturado para aprovação em vagas Sênior. Tudo de forma automática e sem necessidade de login.
          </Typography>
        </Stack>

        {apiError && (
          <Alert severity="error" sx={{ mb: 3 }} onClose={() => setApiError("")}>
            {apiError}
          </Alert>
        )}

        {/* ── STEP: INPUT ──────────────────────────────────── */}
        {step === "input" && (
          <Card elevation={12} sx={{ borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
            <CardContent sx={{ p: 4 }}>
              <Stack spacing={4}>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 700 }} gutterBottom>1. Envie seu currículo base</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Nossa IA vai extrair e organizar suas informações (PDF ou Texto).
                  </Typography>
                  <Box sx={{ border: "2px dashed", borderColor: "primary.main", borderRadius: 3, p: 4, textAlign: "center", bgcolor: "background.paper" }}>
                    <input
                      type="file"
                      accept="application/pdf"
                      style={{ display: "none" }}
                      ref={fileInputRef}
                      onChange={handleFileChange}
                    />
                    {!cvFile ? (
                      <Stack spacing={2} sx={{ alignItems: "center" }}>
                        <UploadFileRoundedIcon sx={{ fontSize: 56, color: "primary.main" }} />
                        <Typography sx={{ fontWeight: 600 }}>Faça upload do seu CV em PDF</Typography>
                        <Button variant="contained" onClick={() => fileInputRef.current?.click()}>
                          Selecionar Arquivo
                        </Button>
                      </Stack>
                    ) : (
                      <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "center" }}>
                        <UploadFileRoundedIcon sx={{ fontSize: 32, color: "success.main" }} />
                        <Typography sx={{ fontWeight: 700 }} color="text.primary" variant="h6">{cvFile.name}</Typography>
                        <IconButton onClick={clearFile} color="error"><CloseRoundedIcon /></IconButton>
                      </Stack>
                    )}
                  </Box>
                </Box>

                <Box sx={{ position: "relative" }}>
                  <Divider><Chip label="OU" size="small" /></Divider>
                </Box>

                <TextField
                  label="Cole o texto do seu CV (Opcional se enviou PDF)"
                  multiline
                  rows={4}
                  fullWidth
                  placeholder="Texto puro..."
                  value={cvText}
                  onChange={(e) => setCvText(e.target.value)}
                  disabled={!!cvFile}
                />

                <Box>
                        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>2. Enriqueça com seus projetos (Opcional)</Typography>
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
                      label="Projetos no Ar (um por linha)"
                      multiline
                      rows={2}
                      fullWidth
                      placeholder="https://meu-projeto.vercel.app"
                      value={projectLinks}
                      onChange={(e) => setProjectLinks(e.target.value)}
                    />
                  </Stack>
                </Box>
                
                <Box sx={{ p: 2, bgcolor: "rgba(125, 211, 252, 0.05)", borderRadius: 2, border: "1px solid", borderColor: "primary.dark" }}>
                  <FormControlLabel
                    control={<Switch checked={tuneContent} onChange={(e) => setTuneContent(e.target.checked)} color="primary" />}
                    label={
                      <Box>
                        <Typography sx={{ fontWeight: 700 }}>Tunar descrições com IA (Recomendado)</Typography>
                        <Typography variant="body2" color="text.secondary">O agente vai usar verbos de impacto e transformar suas entregas usando o formato Ação + Resultado.</Typography>
                      </Box>
                    }
                  />
                </Box>

                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  sx={{ py: 1.5, fontSize: "1.1rem", borderRadius: 2 }}
                  startIcon={loading ? <CircularProgress size={24} color="inherit" /> : <AutoAwesomeRoundedIcon />}
                  onClick={handleParse}
                  disabled={loading || (!cvFile && !cvText.trim() && !githubLinks.trim() && !projectLinks.trim())}
                >
                  {loading ? "Gerando a mágica..." : "Gerar meu CV LaTeX"}
                </Button>
              </Stack>
            </CardContent>
          </Card>
        )}

        {/* ── STEP: REVIEW ─────────────────────────────────── */}
        {step === "review" && draft && (
          <Stack spacing={4}>
            {draft.resume_tex ? (
              <Card elevation={8} sx={{ borderRadius: 4, background: "linear-gradient(135deg, rgba(56, 189, 248, 0.1), rgba(129, 140, 248, 0.1))", border: "1px solid", borderColor: "primary.main" }}>
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <AutoAwesomeRoundedIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                  <Typography variant="h4" sx={{ fontWeight: 900 }} gutterBottom>
                    Seu Currículo LaTeX está pronto!
                  </Typography>
                  <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                    Nós extraímos seus dados, usamos verbos de ação focados em engenharia e preparamos um arquivo `.tex` baseado no formato open-source premium.
                  </Typography>
                  
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "center" }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      size="large" 
                      startIcon={<DownloadRoundedIcon />} 
                      onClick={downloadTex}
                      sx={{ borderRadius: 2, px: 4 }}
                    >
                      Baixar Arquivo .tex
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="secondary" 
                      size="large" 
                      startIcon={<TerminalRoundedIcon />} 
                      href="https://www.overleaf.com/docs?snip_uri=https://raw.githubusercontent.com/celiobjunior/resume-template/main/resumes/pt-br/curriculo.tex" 
                      target="_blank"
                      sx={{ borderRadius: 2 }}
                    >
                      Abrir no Overleaf
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ) : (
              <Alert severity="error">Falha ao gerar o código LaTeX. Tente novamente.</Alert>
            )}

            <Card sx={{ borderRadius: 4 }}>
              <CardContent>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>O que a IA extraiu de você:</Typography>
                <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} sx={{ mb: 3 }}>
                  <Tab label={`Habilidades (${draft.habilidades.length})`} />
                  <Tab label={`Experiências (${draft.experiences.length})`} />
                  <Tab label={`Projetos (${draft.projects.length})`} />
                </Tabs>

                {activeTab === 0 && (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {draft.habilidades.map((h: IntakeHabilidade, i) => (
                      <Chip key={i} label={h.label} color={h.type === "frontend" ? "primary" : h.type === "backend" ? "secondary" : "default"} variant="outlined" />
                    ))}
                  </Box>
                )}

                {activeTab === 1 && (
                  <Stack spacing={2}>
                    {draft.experiences.map((e: IntakeExperience, i) => (
                      <Box key={i} sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700 }}>{e.title} - {e.role}</Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>{e.period}</Typography>
                        {e.achievements.map((a, ai) => (
                          <Typography key={ai} variant="body2">• {a}</Typography>
                        ))}
                      </Box>
                    ))}
                  </Stack>
                )}

                {activeTab === 2 && (
                  <Stack spacing={2}>
                    {draft.projects.map((p: IntakeProject, i) => (
                      <Box key={i} sx={{ p: 2, border: "1px solid", borderColor: "divider", borderRadius: 2 }}>
                        <Typography sx={{ fontWeight: 700 }}>{p.title}</Typography>
                        <Typography variant="body2" sx={{ color: "text.secondary", mb: 1 }}>{p.description}</Typography>
                        <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                          {p.technologies.map(t => <Chip key={t} label={t} size="small" />)}
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                )}
              </CardContent>
            </Card>

            <Button variant="text" onClick={() => setStep("input")} sx={{ alignSelf: "center" }}>
              ← Gerar outro currículo
            </Button>
          </Stack>
        )}
      </Container>
    </Box>
  );
}

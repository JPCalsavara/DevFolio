"use client";

import { Box, Button, Card, CardContent, Chip, Container, Divider, Grid, Stack, Typography, Paper } from "@mui/material";
import AutoAwesomeRoundedIcon from "@mui/icons-material/AutoAwesomeRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";
import CodeRoundedIcon from "@mui/icons-material/CodeRounded";
import PlayCircleOutlineRoundedIcon from "@mui/icons-material/PlayCircleOutlineRounded";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import RocketLaunchRoundedIcon from "@mui/icons-material/RocketLaunchRounded";

export default function IntroPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pt: 8, pb: 12 }}>
      {/* ── HERO SECTION ──────────────────────────────────────────────────────── */}
      <Box sx={{ background: "linear-gradient(135deg, rgba(56, 189, 248, 0.05), rgba(129, 140, 248, 0.1))", pt: 6, pb: 10, mb: 8, borderBottom: "1px solid", borderColor: "divider" }}>
        <Container maxWidth="lg" sx={{ textAlign: "center" }}>
          <Chip label="Template Onboarding" color="primary" variant="outlined" sx={{ mb: 3 }} />
          <Typography variant="h2" sx={{ fontWeight: 900, mb: 2, background: "linear-gradient(90deg, #38bdf8, #818cf8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            AI Portfolio Template
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 800, mx: "auto", mb: 4, lineHeight: 1.6 }}>
            Um portfólio para pessoas de backend, dados ou desenvolvedores que não têm paciência com frontend, mas querem um site premium, rápido e que se preenche sozinho usando Inteligência Artificial.
          </Typography>
          
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ justifyContent: "center" }}>
            <Button variant="contained" size="large" endIcon={<ArrowForwardRoundedIcon />} href="#o-fluxo">
              Entender o Fluxo
            </Button>
            <Button variant="outlined" size="large" startIcon={<PlayCircleOutlineRoundedIcon />} href="/">
              Ver o Portfólio Live
            </Button>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg">
        {/* ── OBJETIVO DO PROJETO ─────────────────────────────────────────────── */}
        <Grid container spacing={6} sx={{ mb: 12, alignItems: "center" }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
              Por que este template existe?
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Manter um portfólio atualizado é chato. Ficar alinhando divs no React, migrando dados do LinkedIn e atualizando PDF de currículo é um trabalho repetitivo.
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
              Este projeto resolve isso dividindo o problema em três pilares:
            </Typography>
            <Stack spacing={2} sx={{ mt: 3 }}>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <AutoAwesomeRoundedIcon color="primary" />
                <Typography><strong>IA Nativa:</strong> Você joga seu PDF antigo e o Gemini extrai tudo estruturado via painel Admin.</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <StorageRoundedIcon color="secondary" />
                <Typography><strong>Supabase:</strong> Os dados (Habilidades, Projetos, Experiência) ficam salvos no banco. Mudou no banco, muda no site.</Typography>
              </Box>
              <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                <CodeRoundedIcon color="info" />
                <Typography><strong>Visual Premium:</strong> Next.js App Router com Glassmorphism e gradientes que impressionam recrutadores.</Typography>
              </Box>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={12} sx={{ p: 2, borderRadius: 4, bgcolor: "background.paper", border: "1px solid", borderColor: "divider" }}>
              <Box sx={{ width: "100%", height: 300, bgcolor: "rgba(0,0,0,0.2)", borderRadius: 2, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Typography color="text.disabled">[ Placeholder: GIF ou Imagem do Portfólio rodando ]</Typography>
              </Box>
            </Paper>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 12 }} />

        {/* ── O FLUXO (STEP BY STEP) ───────────────────────────────────────────── */}
        <Box id="o-fluxo" sx={{ mb: 12 }}>
          <Typography variant="h3" sx={{ fontWeight: 900, mb: 6, textAlign: "center" }}>
            O Fluxo de Configuração
          </Typography>

          <Grid container spacing={4}>
            {/* Step 1 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: "100%", borderRadius: 4, borderTop: "4px solid", borderColor: "primary.main" }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h1" color="primary.light" sx={{ opacity: 0.3, fontWeight: 900, mt: -2, mb: 2 }}>01</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Subir no Next.js e Supabase</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Crie um projeto no Supabase e pegue as chaves (URL e ANON_KEY). Crie uma conta de usuário lá no Supabase Auth para você ser o Admin.
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    No arquivo <code>.env</code> do projeto, cole suas credenciais do Supabase e a sua <code>GEMINI_API_KEY</code> (gratuita no Google AI Studio).
                  </Typography>
                </CardContent>
              </Card>
            </Grid>

            {/* Step 2 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: "100%", borderRadius: 4, borderTop: "4px solid", borderColor: "secondary.main" }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h1" color="secondary.light" sx={{ opacity: 0.3, fontWeight: 900, mt: -2, mb: 2 }}>02</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>A Mágica da IA (Intake)</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Acesse a rota <code>/admin/intake</code>. Faça upload do seu currículo em PDF antigo. 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    O Gemini vai ler, extrair as linguagens, criar resumos de impacto (método STAR) e montar um JSON gigante. Ele preenche e injeta isso sozinho direto nas tabelas do Supabase!
                  </Typography>
                  <Box sx={{ mt: 3 }}>
                    <Button variant="outlined" size="small" href="/admin/intake">Acessar Intake Pipeline</Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>

            {/* Step 3 */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Card sx={{ height: "100%", borderRadius: 4, borderTop: "4px solid", borderColor: "info.main" }}>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h1" color="info.light" sx={{ opacity: 0.3, fontWeight: 900, mt: -2, mb: 2 }}>03</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 800, mb: 2 }}>Personalize e Faça o Deploy</Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Com os dados no banco, o site já vai estar populado com seus projetos, logo e textos. 
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Ajuste as cores principais no arquivo <code>src/theme/theme.ts</code>. Quando estiver feliz, suba o repositório no GitHub e conecte na Vercel para deploy automático.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* ── BOTÃO DE AÇÃO ────────────────────────────────────────────────────── */}
        <Box sx={{ textAlign: "center", bgcolor: "background.paper", p: 6, borderRadius: 4, border: "1px solid", borderColor: "divider" }}>
          <RocketLaunchRoundedIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>Pronto para começar?</Typography>
          <Typography color="text.secondary" sx={{ mb: 4 }}>
            Siga o README para rodar as migrações do Supabase e depois caia pro abraço no painel Admin.
          </Typography>
          <Button variant="contained" size="large" href="/admin">
            Ir para o Painel Admin
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

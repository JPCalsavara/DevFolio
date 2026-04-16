import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Contact from "@/components/Contact";
import NavBar from "@/components/NavBar";
import SkillsTags from "@/components/SkillsTags";
import {
  buildTechnologyTagMap,
  getPortfolioProjectBySlug,
  getPortfolioProjects,
  getPortfolioTechnologies,
} from "@/lib/portfolio";

export async function generateStaticParams() {
  const projects = await getPortfolioProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getPortfolioProjectBySlug(slug);

  if (!project) {
    return {
      title: "Projeto não encontrado | Portfólio",
    };
  }

  return {
    title: `${project.title} | Portfólio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [project, technologies] = await Promise.all([
    getPortfolioProjectBySlug(slug),
    getPortfolioTechnologies(),
  ]);

  if (!project) {
    notFound();
  }

  const tagsMap = buildTechnologyTagMap(technologies);
  const projectImagePath = project.imageUrl || "/images/projects/default.jpg";

  const starSituation =
    project.summaryLine ||
    "Contexto do projeto e cenário de negócio em que ele foi desenvolvido.";
  const starTask =
    project.detailsGoal ||
    "Entregar uma solução funcional com foco em qualidade técnica e resultado.";
  const starAction =
    project.detailsHighlights.length > 0
      ? project.detailsHighlights.join(" ")
      : "Implementação full stack com foco em arquitetura, usabilidade e manutenção.";
  const starResult =
    project.detailsImpact ||
    "Projeto entregue com evolução contínua e impacto prático para o objetivo proposto.";

  const ensureSentence = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return "";
    return /[.!?]$/.test(trimmed) ? trimmed : `${trimmed}.`;
  };

  const implicitStarSummary = [
    ensureSentence(starSituation),
    `Nesse contexto, o foco foi ${starTask.trim()}.`,
    `Para isso, ${starAction.trim()}.`,
    `Como resultado, ${starResult.trim()}`,
  ]
    .filter(Boolean)
    .join(" ");

  const featureItems =
    project.detailsHighlights.length > 0
      ? project.detailsHighlights
      : [project.description];

  return (
    <Box>
      <NavBar />

      <Box
        sx={{
          pt: { xs: 12, md: 14 },
          pb: { xs: 7, md: 9 },
          minHeight: "100svh",
          background:
            "radial-gradient(circle at 15% 20%, rgba(92,156,255,0.2), transparent 28%), radial-gradient(circle at 80% 20%, rgba(125,211,252,0.16), transparent 26%), linear-gradient(180deg, rgba(7,17,31,0.98) 0%, rgba(10,20,36,0.96) 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3.5}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button
                component="span"
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackRoundedIcon />}
                sx={{ alignSelf: "flex-start" }}
              >
                Voltar para página principal
              </Button>
            </Link>

            <Stack spacing={1.2}>
              <Typography
                variant="overline"
                sx={{
                  color: "secondary.main",
                  letterSpacing: 3,
                  fontWeight: 700,
                }}
              >
                Detalhes do projeto
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4.3rem" },
                  lineHeight: 0.98,
                }}
              >
                {project.title}
              </Typography>
              <Typography
                sx={{ color: "text.secondary", maxWidth: 900, lineHeight: 1.9 }}
              >
                {project.description}
              </Typography>
              {project.period ? (
                <Typography
                  sx={{ color: "text.secondary", fontStyle: "italic" }}
                >
                  {project.period}
                </Typography>
              ) : null}
            </Stack>

            <Box
              sx={{
                width: "100%",
                maxWidth: 980,
                aspectRatio: "16 / 9",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(125, 211, 252, 0.2)",
              }}
            >
              <Image
                src={projectImagePath}
                alt={`Imagem do projeto ${project.title}`}
                fill
                sizes="(max-width: 900px) 100vw, 980px"
                quality={76}
                style={{ objectFit: "cover" }}
              />
            </Box>

            <Stack spacing={2}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Tecnologias
              </Typography>
              <SkillsTags tecnosUsed={project.tecnosUsed} tagsMap={tagsMap} />
            </Stack>

            <Stack
              spacing={2.5}
              sx={{
                p: { xs: 2.2, md: 3 },
                borderRadius: 3,
                backgroundColor: "rgba(13, 27, 45, 0.92)",
                border: "1px solid rgba(125, 211, 252, 0.14)",
              }}
            >
              <Box>
                <Typography
                  variant="h5"
                  sx={{ mb: 1, fontWeight: 800, color: "primary.main" }}
                >
                  Resumo do projeto
                </Typography>

                <Typography sx={{ color: "text.primary", lineHeight: 1.8 }}>
                  {implicitStarSummary}
                </Typography>
              </Box>

              <Box>
                <Typography
                  variant="h5"
                  sx={{ mb: 1, fontWeight: 800, color: "primary.main" }}
                >
                  Funcionalidades
                </Typography>

                <Stack component="ul" spacing={1.2} sx={{ pl: 2.5, m: 0 }}>
                  {featureItems.map((item) => (
                    <Typography
                      component="li"
                      key={item}
                      sx={{ lineHeight: 1.7 }}
                    >
                      {item}
                    </Typography>
                  ))}
                </Stack>
              </Box>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2}>
              {project.produtionLink ? (
                <Button
                  component="a"
                  href={project.produtionLink}
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  color="primary"
                >
                  Ver produção
                </Button>
              ) : null}
              {project.repositoryLink ? (
                <Button
                  component="a"
                  href={project.repositoryLink}
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  color="secondary"
                >
                  Ver repositório
                </Button>
              ) : null}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Contact />
    </Box>
  );
}

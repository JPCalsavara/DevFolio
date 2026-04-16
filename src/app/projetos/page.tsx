import type { Metadata } from "next";
import Link from "next/link";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Contact from "@/components/Contact";
import NavBar from "@/components/NavBar";
import ProjectsCatalog from "@/components/ProjectsCatalog";
import {
  buildLegendItems,
  buildTechnologyTagMap,
  getPortfolioProjects,
  getPortfolioTechnologies,
} from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Projetos | Joao Calsavara",
  description:
    "Catalogo completo de projetos com filtros por stack e tecnologia, com paginacao.",
};

export default async function ProjectsPage() {
  const [projects, technologies] = await Promise.all([
    getPortfolioProjects(),
    getPortfolioTechnologies(),
  ]);
  const tagsMap = buildTechnologyTagMap(technologies);
  const legendItems = buildLegendItems(technologies);

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
          <Stack spacing={3}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button
                component="span"
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackRoundedIcon />}
                sx={{ alignSelf: "flex-start" }}
              >
                Voltar para pagina principal
              </Button>
            </Link>

            <Stack spacing={1}>
              <Typography
                variant="overline"
                sx={{
                  color: "secondary.main",
                  letterSpacing: 3,
                  fontWeight: 700,
                }}
              >
                Catalogo
              </Typography>
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: "2.3rem", md: "3.9rem" }, lineHeight: 1 }}
              >
                Todos os projetos
              </Typography>
              <Typography sx={{ color: "text.secondary", maxWidth: 820 }}>
                Explore os projetos com filtros por stack e tecnologias. A lista
                mostra 6 projetos por pagina e 2 cards por linha no desktop.
              </Typography>
            </Stack>

            <ProjectsCatalog
              projects={projects}
              tagsMap={tagsMap}
              legendItems={legendItems}
            />
          </Stack>
        </Container>
      </Box>

      <Contact />
    </Box>
  );
}

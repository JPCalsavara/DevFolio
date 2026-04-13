import type { Metadata } from "next";
import Link from "next/link";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CardExperience from "@/components/CardExperience";
import Contact from "@/components/Contact";
import NavBar from "@/components/NavBar";
import { experiencesData } from "@/data/portfolioData";

export const metadata: Metadata = {
  title: "Experiências | Joao Calsavara",
  description:
    "Página com experiências detalhadas, resumo de impacto e fotos dos projetos e estágios.",
};

export default function ExperiencesPage() {
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
                Voltar para página principal
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
                Experiências
              </Typography>
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: "2.3rem", md: "3.9rem" }, lineHeight: 1 }}
              >
                Trajetória detalhada
              </Typography>
              <Typography sx={{ color: "text.secondary", maxWidth: 860 }}>
                Resumos das experiências com acesso às páginas detalhadas de
                cada organização.
              </Typography>
            </Stack>

            <Stack spacing={2}>
              {experiencesData.map((experience) => (
                <CardExperience key={experience.slug} {...experience} />
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Contact />
    </Box>
  );
}

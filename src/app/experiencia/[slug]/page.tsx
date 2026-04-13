import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CardExperience from "@/components/CardExperience";
import Contact from "@/components/Contact";
import NavBar from "@/components/NavBar";
import { experiencesDetailsData } from "@/data/portfolioData";

export function generateStaticParams() {
  return experiencesDetailsData.map((experience) => ({
    slug: experience.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const experience = experiencesDetailsData.find((item) => item.slug === slug);

  if (!experience) {
    return { title: "Experiência não encontrada | Portfólio" };
  }

  return {
    title: `${experience.title} | Portfólio`,
    description: experience.intro,
  };
}

export default async function ExperienceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const experience = experiencesDetailsData.find((item) => item.slug === slug);

  if (!experience) {
    notFound();
  }

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
            <Link href="/experiencias" style={{ textDecoration: "none" }}>
              <Button
                component="span"
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackRoundedIcon />}
                sx={{ alignSelf: "flex-start" }}
              >
                Voltar para experiências
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
                {experience.introTitle}
              </Typography>
              <Typography
                variant="h1"
                sx={{ fontSize: { xs: "2.3rem", md: "3.9rem" }, lineHeight: 1 }}
              >
                {experience.title}
              </Typography>
              <Typography sx={{ color: "text.secondary", maxWidth: 900 }}>
                {experience.intro}
              </Typography>
            </Stack>

            <Stack spacing={2.2}>
              {experience.sections.map((section) => (
                <Stack
                  key={`${experience.slug}-${section.title}`}
                  spacing={1.5}
                >
                  <Typography variant="h4" sx={{ fontWeight: 800 }}>
                    {section.title}
                  </Typography>
                  <CardExperience {...section} />
                </Stack>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Contact />
    </Box>
  );
}

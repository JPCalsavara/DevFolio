
import type { Metadata } from "next";
import Link from "next/link";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CardExperience from "@/components/CardExperience";
import Contact from "@/components/Contact";
import NavBar from "@/components/NavBar";
import { experiencesDetailsData } from "@/data/portfolioData";
import {
  buildTechnologyTagMap,
  getPortfolioExperiences,
  getPortfolioTechnologies,
} from "@/lib/portfolio";

export const revalidate = 3600;

const MONTH_INDEX: Record<string, number> = {
  jan: 1,
  fev: 2,
  mar: 3,
  abr: 4,
  mai: 5,
  jun: 6,
  jul: 7,
  ago: 8,
  set: 9,
  out: 10,
  nov: 11,
  dez: 12,
};

function parseEndPeriodScore(period?: string | null): number {
  if (!period) {
    return -1;
  }

  const currentYear = new Date().getFullYear();

  const normalized = period
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalized.includes("atual")) {
    return currentYear * 100 + 12;
  }

  const endChunk = normalized.includes("-")
    ? normalized.split("-").at(-1)?.trim() || normalized
    : normalized;

  const yearMatch = endChunk.match(/(19|20)\d{2}/);
  const year = yearMatch ? Number(yearMatch[0]) : 0;

  const month = Object.entries(MONTH_INDEX).find(([key]) =>
    endChunk.includes(key),
  )?.[1];

  return year * 100 + (month || 1);
}

function parseEndPeriodYear(period?: string | null): string {
  if (!period) {
    return "Sem ano";
  }

  const normalized = period
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

  if (normalized.includes("atual")) {
    return String(new Date().getFullYear());
  }

  const endChunk = normalized.includes("-")
    ? normalized.split("-").at(-1)?.trim() || normalized
    : normalized;

  const yearMatch = endChunk.match(/(19|20)\d{2}/);
  return yearMatch ? yearMatch[0] : "Sem ano";
}

export const metadata: Metadata = {
  title: "Experiências | Joao Calsavara",
  description:
    "Página com experiências detalhadas, resumo de impacto e fotos dos projetos e estágios.",
};

export default async function ExperiencesPage() {
  const [experiences, technologies] = await Promise.all([
    getPortfolioExperiences(),
    getPortfolioTechnologies(),
  ]);
  const tagsMap = buildTechnologyTagMap(technologies);

  const detailedCards = experiencesDetailsData
    .flatMap((entry) =>
      entry.sections.map((section) => {
        const imageUrls = section.imageNames?.length
          ? section.imageNames.map(
              (imageName) => `/images/experiences/${imageName}`,
            )
          : section.imageName
            ? [`/images/experiences/${section.imageName}`]
            : [];

        return {
          key: `${entry.slug}-${section.title}`,
          endScore: parseEndPeriodScore(section.period),
          year: parseEndPeriodYear(section.period),
          card: (
            <CardExperience
              key={`${entry.slug}-${section.title}`}
              {...section}
              title={`${entry.title} · ${section.title}`}
              imageUrl={imageUrls[0]}
              imageUrls={imageUrls}
              showExploreButton={false}
              tagsMap={tagsMap}
            />
          ),
        };
      }),
    )
    .sort((a, b) => b.endScore - a.endScore);

  const fallbackCards = [...experiences]
    .sort(
      (a, b) => parseEndPeriodScore(b.period) - parseEndPeriodScore(a.period),
    )
    .map((experience) => ({
      key: experience.id,
      endScore: parseEndPeriodScore(experience.period),
      year: parseEndPeriodYear(experience.period),
      card: (
        <CardExperience
          key={experience.id}
          {...experience}
          imageUrl={experience.imageUrls[0]}
          imageUrls={experience.imageUrls}
          showExploreButton={false}
          tagsMap={tagsMap}
        />
      ),
    }));

  const timelineItems =
    detailedCards.length > 0 ? detailedCards : fallbackCards;

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
                Todos os detalhes das experiências em uma única linha do tempo,
                da mais recente para a mais antiga.
              </Typography>
            </Stack>

            <Stack spacing={0.4}>
              {timelineItems.map((item, index) => {
                const isLast = index === timelineItems.length - 1;
                const previousYear =
                  index > 0 ? timelineItems[index - 1].year : null;
                const showYearDivider =
                  index === 0 || item.year !== previousYear;

                return (
                  <Stack key={item.key} spacing={showYearDivider ? 1.2 : 0.4}>
                    {showYearDivider ? (
                      <Stack
                        direction="row"
                        spacing={1.2}
                        sx={{ alignItems: "center", py: index === 0 ? 0 : 1.2 }}
                      >
                        <Box
                          sx={{
                            px: 1.2,
                            py: 0.45,
                            borderRadius: 999,
                            border: "1px solid rgba(125,211,252,0.35)",
                            backgroundColor: "rgba(125,211,252,0.12)",
                          }}
                        >
                          <Typography
                            variant="overline"
                            sx={{ color: "secondary.main", fontWeight: 700 }}
                          >
                            {item.year}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            flex: 1,
                            height: "1px",
                            background:
                              "linear-gradient(90deg, rgba(125,211,252,0.45), rgba(125,211,252,0.05))",
                          }}
                        />
                      </Stack>
                    ) : null}

                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", md: "24px 1fr" },
                        columnGap: 2,
                        pb: isLast ? 0 : 2,
                      }}
                    >
                      <Box
                        sx={{
                          position: "relative",
                          display: { xs: "none", md: "flex" },
                          justifyContent: "center",
                        }}
                      >
                        {!isLast ? (
                          <Box
                            sx={{
                              position: "absolute",
                              top: 12,
                              bottom: -18,
                              width: "2px",
                              background:
                                "linear-gradient(180deg, rgba(45,212,191,0.75) 0%, rgba(125,211,252,0.25) 100%)",
                            }}
                          />
                        ) : null}

                        <Box
                          sx={{
                            mt: 0.5,
                            width: 12,
                            height: 12,
                            borderRadius: "50%",
                            backgroundColor: "secondary.main",
                            boxShadow: "0 0 0 4px rgba(125,211,252,0.18)",
                          }}
                        />
                      </Box>

                      <Box>{item.card}</Box>
                    </Box>
                  </Stack>
                );
              })}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Contact />
    </Box>
  );
}

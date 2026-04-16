import { Box, Container, Stack, Typography } from "@mui/material";
import CardExperience from "@/components/CardExperience";
import type { PortfolioExperience, TechnologyTagMap } from "@/lib/portfolio";

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

type ExperienceProps = {
  experiences: PortfolioExperience[];
  tagsMap: TechnologyTagMap;
};

export default function Experience({ experiences, tagsMap }: ExperienceProps) {
  const uniqueExperiences = [...experiences].sort(
    (a, b) => parseEndPeriodScore(b.period) - parseEndPeriodScore(a.period),
  );

  return (
    <Box
      id="experiencias"
      sx={{ py: { xs: 6, md: 8 }, scrollMarginTop: "92px" }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: "2.1rem", md: "3.4rem" }, mb: 4 }}
        >
          Experiências
        </Typography>
        <Stack spacing={2}>
          {uniqueExperiences.map((experience) => (
            <CardExperience
              key={experience.id}
              {...experience}
              imageUrl={experience.imageUrls[0]}
              imageUrls={experience.imageUrls}
              tagsMap={tagsMap}
            />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

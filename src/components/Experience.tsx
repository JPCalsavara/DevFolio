import Link from "next/link";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import CardExperience from "@/components/CardExperience";
import { experiencesData } from "@/data/portfolioData";

export default function Experience() {
  const uniqueExperiences = experiencesData.filter(
    (experience, index, list) =>
      index === list.findIndex((item) => item.title === experience.title),
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
            <CardExperience key={experience.title} {...experience} />
          ))}
        </Stack>

        <Stack direction="row" sx={{ justifyContent: "center", pt: 3 }}>
          <Link href="/experiencias" style={{ textDecoration: "none" }}>
            <Button component="span" variant="outlined" color="secondary">
              Ver experiências em detalhes
            </Button>
          </Link>
        </Stack>
      </Container>
    </Box>
  );
}

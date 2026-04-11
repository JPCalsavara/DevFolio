import { Box, Container, Stack, Typography } from "@mui/material";
import CardExperience from "@/components/CardExperience";
import { experiencesData } from "@/data/portfolioData";

export default function Experience() {
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
          {experiencesData.map((experience) => (
            <CardExperience key={experience.title} {...experience} />
          ))}
        </Stack>
      </Container>
    </Box>
  );
}

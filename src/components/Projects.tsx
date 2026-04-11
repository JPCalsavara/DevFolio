import { Box, Container, Grid, Typography } from "@mui/material";
import CardProject from "@/components/CardProject";
import { projectsData } from "@/data/portfolioData";

export default function Projects() {
  return (
    <Box
      id="projetos"
      sx={{
        py: { xs: 6, md: 8 },
        backgroundColor: "rgba(17,25,40,0.52)",
        scrollMarginTop: "92px",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{ fontSize: { xs: "2.1rem", md: "3.4rem" }, mb: 4 }}
        >
          Projetos
        </Typography>
        <Grid container spacing={2.2}>
          {projectsData.map((project) => (
            <Grid key={project.title} size={{ xs: 12, md: 6 }}>
              <CardProject {...project} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

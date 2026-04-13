"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CardProject from "@/components/CardProject";
import { projectsData } from "@/data/portfolioData";

export default function Projects() {
  const featuredProjects = projectsData.slice(0, 4);
  const [activeSlide, setActiveSlide] = useState(0);

  const slideGroups = useMemo(() => {
    const groups = [];
    for (let index = 0; index < featuredProjects.length; index += 2) {
      groups.push(featuredProjects.slice(index, index + 2));
    }
    return groups;
  }, [featuredProjects]);

  const canSlide = slideGroups.length > 1;
  const currentSlideProjects = slideGroups[activeSlide] || [];

  const handleNext = () => {
    if (!canSlide) return;
    setActiveSlide((prev) => (prev + 1) % slideGroups.length);
  };

  const handlePrevious = () => {
    if (!canSlide) return;
    setActiveSlide((prev) => (prev === 0 ? slideGroups.length - 1 : prev - 1));
  };

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

        <Stack spacing={2.2} sx={{ mb: 5 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Typography
              variant="h4"
              sx={{ fontWeight: 800, fontSize: "1.5rem" }}
            >
              Destaques
            </Typography>

            <Stack direction="row" spacing={1}>
              <Button
                onClick={handlePrevious}
                disabled={!canSlide}
                variant="outlined"
                size="small"
                startIcon={<ArrowBackIosNewRoundedIcon />}
              >
                Anterior
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canSlide}
                variant="contained"
                size="small"
                endIcon={<ArrowForwardIosRoundedIcon />}
              >
                Proximo
              </Button>
            </Stack>
          </Stack>

          <Grid container spacing={1.3}>
            {currentSlideProjects.map((project) => (
              <Grid key={project.slug} size={{ xs: 12, md: 6 }}>
                <CardProject {...project} />
              </Grid>
            ))}
          </Grid>

          <Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
            {slideGroups.map((slide, index) => (
              <Chip
                key={slide.map((project) => project.slug).join("-")}
                label={`${index + 1}`}
                onClick={() => setActiveSlide(index)}
                color={index === activeSlide ? "secondary" : "default"}
                variant={index === activeSlide ? "filled" : "outlined"}
                size="small"
              />
            ))}
          </Stack>

          <Stack direction="row" sx={{ justifyContent: "center", pt: 1 }}>
            <Button
              href="/projetos"
              component={Link}
              variant="outlined"
              color="secondary"
            >
              Ver todos os projetos
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}

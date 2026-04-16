"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Stack,
  Typography,
} from "@mui/material";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import CardProject from "@/components/CardProject";
import type { PortfolioProject, TechnologyTagMap } from "@/lib/portfolio";

type ProjectsProps = {
  projects: PortfolioProject[];
  tagsMap: TechnologyTagMap;
};

export default function Projects({ projects, tagsMap }: ProjectsProps) {
  const featuredProjects = projects.slice(0, 4);
  const carouselRef = useRef<HTMLDivElement | null>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselItems = useMemo(() => {
    return [
      ...featuredProjects.map((project) => ({
        type: "project" as const,
        key: project.slug,
        project,
      })),
      {
        type: "more" as const,
        key: "more-projects",
      },
    ];
  }, [featuredProjects]);

  const canSlide = carouselItems.length > 1;

  const scrollToSlide = (targetIndex: number) => {
    const container = carouselRef.current;
    if (!container || carouselItems.length === 0) return;

    const boundedIndex =
      ((targetIndex % carouselItems.length) + carouselItems.length) %
      carouselItems.length;
    const targetElement = container.children.item(
      boundedIndex,
    ) as HTMLElement | null;

    if (!targetElement) return;

    targetElement.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "start",
    });
    setActiveSlide(boundedIndex);
  };

  const handleNext = () => {
    if (!canSlide) return;
    scrollToSlide(activeSlide + 1);
  };

  const handlePrevious = () => {
    if (!canSlide) return;
    scrollToSlide(activeSlide - 1);
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
            ></Typography>

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

          <Box
            ref={carouselRef}
            onScroll={(event) => {
              const container = event.currentTarget;
              const children = Array.from(container.children) as HTMLElement[];
              if (children.length === 0) return;

              const currentScroll = container.scrollLeft;
              let nearestIndex = 0;
              let nearestDistance = Number.POSITIVE_INFINITY;

              children.forEach((child, index) => {
                const distance = Math.abs(child.offsetLeft - currentScroll);
                if (distance < nearestDistance) {
                  nearestDistance = distance;
                  nearestIndex = index;
                }
              });

              if (nearestIndex !== activeSlide) {
                setActiveSlide(nearestIndex);
              }
            }}
            sx={{
              display: "grid",
              gridAutoFlow: "column",
              gridAutoColumns: {
                xs: "100%",
                sm: "calc((100% - 16px) / 2)",
                md: "calc((100% - 16px) / 2)",
              },
              gap: 2,
              overflowX: "auto",
              scrollSnapType: "x mandatory",
              pb: 0.8,
              "&::-webkit-scrollbar": { height: 8 },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "rgba(148,163,184,.38)",
                borderRadius: 999,
              },
            }}
          >
            {carouselItems.map((item) => (
              <Box key={item.key} sx={{ scrollSnapAlign: "start" }}>
                {item.type === "project" ? (
                  <CardProject {...item.project} tagsMap={tagsMap} />
                ) : (
                  <Card
                    sx={{
                      p: 1,
                      height: "100%",
                      borderRadius: 3,
                      border: "1px dashed rgba(125,211,252,0.32)",
                      backgroundColor: "rgba(18,23,34,0.65)",
                    }}
                  >
                    <CardContent
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 1.6,
                        textAlign: "center",
                      }}
                    >
                      <Typography variant="h5" sx={{ fontWeight: 800 }}>
                        Mais projetos
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        Ver catalogo completo com filtros por stack e
                        tecnologias.
                      </Typography>
                      <Button
                        href="/projetos"
                        component={Link}
                        variant="contained"
                        color="secondary"
                      >
                        Abrir catalogo
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </Box>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}

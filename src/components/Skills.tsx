"use client";

import { useState } from "react";
import { Box, Container, Grid, Stack, Typography } from "@mui/material";
import CardSkills from "@/components/CardSkills";
import { legendItems, skillsData } from "@/data/portfolioData";

export default function Skills() {
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  return (
    <Box
      id="habilidades"
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
          Habilidades
        </Typography>

        <Grid container spacing={2} columns={{ xs: 12, md: 16 }}>
          {skillsData.map((skill) => (
            <Grid key={skill.name} size={{ xs: 6, md: 2 }}>
              <CardSkills
                name={skill.name}
                link={skill.link}
                type={skill.type}
                label={skill.label}
                isHovered={hoveredType === skill.type}
              />
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ mb: 1.2 }}>
            Legenda
          </Typography>
          <Stack direction={{ xs: "column", md: "row" }} spacing={1.2}>
            {legendItems.map((item) => (
              <Stack
                key={item.type}
                direction="row"
                sx={{
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: "rgba(255,255,255,0.06)",
                  minWidth: 220,
                  cursor: "default",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
                onMouseEnter={() => setHoveredType(item.type)}
                onMouseLeave={() => setHoveredType(null)}
              >
                <Typography>{item.label}</Typography>
                <Box
                  sx={{
                    width: 14,
                    height: 14,
                    borderRadius: 999,
                    backgroundColor: item.color,
                    px: 0.5,
                  }}
                />
              </Stack>
            ))}
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}

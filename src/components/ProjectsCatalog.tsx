"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Chip,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CardProject from "@/components/CardProject";
import {
  projectsData,
  tagsData,
  type ProjectCardData,
} from "@/data/portfolioData";

const stackOptions = [
  "all",
  "frontend",
  "backend",
  "database",
  "devops",
  "softskill",
] as const;

const PAGE_SIZE = 6;

function getProjectStacks(project: ProjectCardData) {
  const categories = (project.tecnosUsed || [])
    .map((tech) => tagsData[tech]?.category)
    .filter((category): category is string => Boolean(category));

  return Array.from(new Set(categories));
}

export default function ProjectsCatalog() {
  const [selectedStack, setSelectedStack] =
    useState<(typeof stackOptions)[number]>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const availableTechs = useMemo(() => {
    const techSet = new Set<string>();
    projectsData.forEach((project) => {
      (project.tecnosUsed || []).forEach((tech) => techSet.add(tech));
    });

    return Array.from(techSet).sort((a, b) => {
      const labelA = tagsData[a]?.realName || a;
      const labelB = tagsData[b]?.realName || b;
      return labelA.localeCompare(labelB);
    });
  }, []);

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const stacks = getProjectStacks(project);
      const matchesStack =
        selectedStack === "all" ||
        stacks.includes(selectedStack) ||
        (selectedStack === "softskill" && stacks.includes("default"));
      const matchesTech =
        selectedTech === "all" ||
        Boolean(project.tecnosUsed?.includes(selectedTech));
      const haystack = [
        project.title,
        project.summaryLine || "",
        project.description,
      ]
        .join(" ")
        .toLowerCase();
      const matchesText =
        normalizedSearch.length === 0 || haystack.includes(normalizedSearch);

      return matchesStack && matchesTech && matchesText;
    });
  }, [searchTerm, selectedStack, selectedTech]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / PAGE_SIZE),
  );
  const effectivePage = Math.min(currentPage, totalPages);

  const paginatedProjects = useMemo(() => {
    const start = (effectivePage - 1) * PAGE_SIZE;
    return filteredProjects.slice(start, start + PAGE_SIZE);
  }, [effectivePage, filteredProjects]);

  return (
    <Stack spacing={2.4}>
      <TextField
        label="Buscar por titulo, resumo ou descricao"
        size="small"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          setCurrentPage(1);
        }}
      />

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
        {stackOptions.map((stack) => (
          <Chip
            key={stack}
            label={stack === "all" ? "Todas stacks" : stack}
            onClick={() => {
              setSelectedStack(stack);
              setCurrentPage(1);
            }}
            color={selectedStack === stack ? "secondary" : "default"}
            variant={selectedStack === stack ? "filled" : "outlined"}
          />
        ))}
      </Stack>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
        <Chip
          label="Todas tecnologias"
          onClick={() => {
            setSelectedTech("all");
            setCurrentPage(1);
          }}
          color={selectedTech === "all" ? "secondary" : "default"}
          variant={selectedTech === "all" ? "filled" : "outlined"}
        />
        {availableTechs.map((tech) => (
          <Chip
            key={tech}
            label={tagsData[tech]?.realName || tech}
            onClick={() => {
              setSelectedTech(tech);
              setCurrentPage(1);
            }}
            color={selectedTech === tech ? "secondary" : "default"}
            variant={selectedTech === tech ? "filled" : "outlined"}
          />
        ))}
      </Stack>

      <Typography sx={{ color: "text.secondary" }}>
        {filteredProjects.length} projeto(s) encontrado(s)
      </Typography>

      {paginatedProjects.length > 0 ? (
        <Grid container spacing={1.3}>
          {paginatedProjects.map((project) => (
            <Grid key={project.slug} size={{ xs: 12, md: 6 }}>
              <CardProject {...project} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            p: 2.5,
            borderRadius: 3,
            border: "1px dashed rgba(125,211,252,0.28)",
            backgroundColor: "rgba(255,255,255,0.02)",
          }}
        >
          <Typography sx={{ color: "text.secondary" }}>
            Nenhum projeto encontrado com os filtros atuais.
          </Typography>
        </Box>
      )}

      {filteredProjects.length > 0 ? (
        <Stack direction="row" sx={{ justifyContent: "center", pt: 1 }}>
          <Pagination
            count={totalPages}
            page={effectivePage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Stack>
      ) : null}
    </Stack>
  );
}

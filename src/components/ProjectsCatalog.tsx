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
  legendItems,
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

const colorByCategory: Record<string, string> = {
  ...Object.fromEntries(legendItems.map((item) => [item.type, item.color])),
  softskill: "#22D3EE",
  default: "#64748B",
};

const stackLabelByOption: Record<(typeof stackOptions)[number], string> = {
  all: "TODAS STACKS",
  frontend: "FRONT-END",
  backend: "BACK-END",
  database: "DATABASE",
  devops: "DEVOPS",
  softskill: "SOFTSKILL",
};

function chipSx(isSelected: boolean, color: string) {
  return {
    borderColor: isSelected ? color : `${color}AA`,
    backgroundColor: isSelected ? color : "transparent",
    color: isSelected ? "#0B1020" : "text.primary",
    fontWeight: 800,
    "& .MuiChip-label": {
      display: "flex",
      alignItems: "center",
      gap: 0.8,
    },
  };
}

function chipLabel(label: string, color: string, isSelected: boolean) {
  const upperLabel = label.toUpperCase();

  if (isSelected) {
    return upperLabel;
  }

  return (
    <>
      <Box
        component="span"
        sx={{
          width: 8,
          height: 8,
          borderRadius: 999,
          backgroundColor: color,
          display: "inline-block",
        }}
      />
      {upperLabel}
    </>
  );
}

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
        {stackOptions.map((stack) =>
          (() => {
            const isSelected = selectedStack === stack;
            const categoryColor =
              stack === "all"
                ? colorByCategory.default
                : colorByCategory[stack] || colorByCategory.default;

            return (
              <Chip
                key={stack}
                label={chipLabel(
                  stackLabelByOption[stack],
                  categoryColor,
                  isSelected,
                )}
                onClick={() => {
                  setSelectedStack(stack);
                  setCurrentPage(1);
                }}
                variant={isSelected ? "filled" : "outlined"}
                sx={chipSx(isSelected, categoryColor)}
              />
            );
          })(),
        )}
      </Stack>

      <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap", gap: 1 }}>
        <Chip
          label={chipLabel(
            "TODAS TECNOLOGIAS",
            colorByCategory.default,
            selectedTech === "all",
          )}
          onClick={() => {
            setSelectedTech("all");
            setCurrentPage(1);
          }}
          variant={selectedTech === "all" ? "filled" : "outlined"}
          sx={chipSx(selectedTech === "all", colorByCategory.default)}
        />
        {availableTechs.map((tech) =>
          (() => {
            const isSelected = selectedTech === tech;
            const category = tagsData[tech]?.category || "default";
            const categoryColor =
              colorByCategory[category] || colorByCategory.default;
            const label = tagsData[tech]?.realName || tech;

            return (
              <Chip
                key={tech}
                label={chipLabel(label, categoryColor, isSelected)}
                onClick={() => {
                  setSelectedTech(tech);
                  setCurrentPage(1);
                }}
                variant={isSelected ? "filled" : "outlined"}
                sx={chipSx(isSelected, categoryColor)}
              />
            );
          })(),
        )}
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

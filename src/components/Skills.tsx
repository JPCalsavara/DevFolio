"use client";

import { useState } from "react";
import { Container, Grid } from "@mui/material";
import CardSkills from "@/components/CardSkills";
import {
  legendItems as defaultLegendItems,
  skillsData,
} from "@/data/portfolioData";
import type { LegendItem } from "@/lib/portfolio";
import styles from "./Skills.module.scss";

type SkillsProps = {
  legendItems?: LegendItem[];
};

export default function Skills({
  legendItems = defaultLegendItems,
}: SkillsProps = {}) {
  const [hoveredType, setHoveredType] = useState<string | null>(null);

  return (
    <section id="habilidades" className={styles.skillsSection}>
      <Container maxWidth="lg">
        <h2 className={styles.title}>Habilidades</h2>

        <Grid container spacing={2} columns={{ xs: 12, md: 16 }}>
          {skillsData.map((skill) => (
            <Grid key={skill.name} size={{ xs: 6, md: 2 }}>
              <CardSkills
                name={skill.name}
                link={skill.link}
                type={skill.type}
                label={skill.label}
                iconUrl={skill.iconUrl}
                isHovered={hoveredType === skill.type}
              />
            </Grid>
          ))}
        </Grid>

        <div className={styles.legendContainer}>
          <h3 className={styles.legendTitle}>Legenda</h3>
          <div className={styles.legendList}>
            {legendItems.map((item) => (
              <div
                key={item.type}
                className={styles.legendItem}
                onMouseEnter={() => setHoveredType(item.type)}
                onMouseLeave={() => setHoveredType(null)}
                onClick={() =>
                  setHoveredType((prev) => (prev === item.type ? null : item.type))
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setHoveredType((prev) =>
                      prev === item.type ? null : item.type
                    );
                  }
                }}
              >
                <span className={styles.legendLabel}>{item.label}</span>
                <span
                  className={styles.legendDot}
                  style={{ backgroundColor: item.color }}
                  aria-hidden="true"
                />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

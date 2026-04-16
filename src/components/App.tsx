import { Box } from "@mui/material";
import Presentation from "@/components/Presentation";
import NavBar from "@/components/NavBar";
import Hero from "@/components/Hero";
import College from "@/components/College";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import type {
  LegendItem,
  PortfolioExperience,
  PortfolioProject,
  PortfolioTechnology,
  TechnologyTagMap,
} from "@/lib/portfolio";

type AppProps = {
  projects: PortfolioProject[];
  experiences: PortfolioExperience[];
  technologies: PortfolioTechnology[];
  legendItems: LegendItem[];
  tagsMap: TechnologyTagMap;
};

export default function App({
  projects,
  experiences,
  technologies,
  legendItems,
  tagsMap,
}: AppProps) {
  return (
    <Box>
      <Presentation />
      <NavBar />
      <Experience experiences={experiences} tagsMap={tagsMap} />
      <Hero />
      <College />
      <Projects projects={projects} tagsMap={tagsMap} />
      <Skills technologies={technologies} legendItems={legendItems} />
      <Contact />
    </Box>
  );
}

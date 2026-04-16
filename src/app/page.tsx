import App from "@/components/App";
import {
  buildLegendItems,
  buildTechnologyTagMap,
  filterVisiblePortfolioTechnologies,
  getPortfolioExperiences,
  getPortfolioProjects,
  getPortfolioTechnologies,
} from "@/lib/portfolio";

export default async function HomePage() {
  const [projects, experiences, technologies] = await Promise.all([
    getPortfolioProjects(),
    getPortfolioExperiences(),
    getPortfolioTechnologies(),
  ]);

  const visibleTechnologies = filterVisiblePortfolioTechnologies(technologies);

  const legendItems = buildLegendItems(visibleTechnologies);
  const tagsMap = buildTechnologyTagMap(technologies);

  return (
    <App
      projects={projects}
      experiences={experiences}
      technologies={visibleTechnologies}
      legendItems={legendItems}
      tagsMap={tagsMap}
    />
  );
}

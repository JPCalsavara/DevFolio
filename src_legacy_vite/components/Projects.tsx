import CardProject from "./CardProject";
import { ProjectsData } from "../services/inMemoryData";

const Projects = () => {
  const projects = ProjectsData.projects;

  return (
    <div
      id="projetos"
      className="w-full h-auto flex flex-col scroll-m-16 items-center bg-indigo-700 px-0 py-7 md:p-10 sm:mt-90 md:mt-5 lg:mt-10"
    >
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold pb-10 text-white text-shadow-violet-500">
        Projetos
      </h1>
      <div
        className="
      w-full flex justify-start items-start bg-indigo-900
    text-white p-7 md:p-10  
      md:rounded-2xl gap-5 lg:gap-10 
      overflow-x-auto snap-x snap-mandatory scroll-smooth"
      >
        {projects.map((project, index) => (
          <div key={index} className="snap-center flex-shrink-0 ">
            <CardProject
              key={index}
              title={project.title}
              description={project.description}
              tecnosUsed={project.tecnosUsed}
              urlName={project.urlName}
              produtionLink={project.produtionLink}
              repositoryLink={project.repositoryLink}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;

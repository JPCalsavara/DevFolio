import CardExperience from "./CardExperience";
import { ExperiencesData } from "../services/inMemoryData";

const Experience = () => {
  const experiences = ExperiencesData.experiencies;

  return (
    <div
      id="experiencias"
      className="w-full h-auto scroll-m-16 flex flex-col items-center bg-indigo-700 py-7 md:py-10 md:mt-5 lg:mt-0"
    >
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold pb-10 text-white text-shadow-violet-500">
        Experiências
      </h1>
      <div
        className="
        w-full flex flex-col bg-indigo-900
        text-white py-7 md:p-10 justify-start items-start 
        md:rounded-2xl gap-5 lg:gap-10 scroll-smooth"
      >
        {experiences.map((experience, index) => (
          <div
            key={index}
            className={`snap-center flex-shrink-0 w-full px-5
            }`}
          >
            <CardExperience
              title={experience.title}
              imageName={experience.imageName}
              description={experience.description}
              skillsLearned={experience.skillsLearned}
              link={experience.link}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Experience;

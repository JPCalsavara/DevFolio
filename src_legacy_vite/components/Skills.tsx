import { useState } from "react";
import CardSkills from "./CardSkills"; // Importa o componente correto
import { SkillsData } from "../services/inMemoryData";

const Skills = () => {
  const [hoveredType, setHoveredType] = useState<string | null>(null); // Estado para rastrear o tipo em foco

  const skillsAll = SkillsData.skillsAll;

  const legendItems = SkillsData.legendItems;

  return (
    <div
      id="habilidades"
      className="w-full h-auto scroll-m-16 flex flex-col justify-center items-center p-10"
    >
      <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold pb-10 text-white text-shadow-violet-500">
        Habilidades
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-6 lg:gap-10 bg-indigo-400 rounded-t-2xl pt-10 px-10 lg:px-30 text-indigo-900">
        {skillsAll.map((skill, index) => (
          <CardSkills
            key={index}
            name={skill.name}
            link={skill.link}
            type={skill.type}
            label={skill.label}
            isHovered={hoveredType === skill.type} // Passa o estado de hover para o CardSkills
          />
        ))}
      </div>
      <div className="w-full flex justify-end pr-5 pt-2 text-white text-xl bg-indigo-400 rounded-b-2xl pb-2">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl text-end pb-2">Legenda</h1>
          <div className="w-full md:px-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:text-lg ">
            {legendItems.map((item, index) => (
              <div
                key={index}
                className={`w-full flex justify-between items-center gap-2 bg-indigo-800 hover:${item.color} py-1 px-3 rounded-2xl
                transition delay-150 duration-300 ease-in-out cursor-default`}
                onMouseEnter={() => setHoveredType(item.type)} // Define o tipo em foco
                onMouseLeave={() => setHoveredType(null)} // Remove o tipo em foco
              >
                <p>{item.label}</p>
                <div className={`h-4 w-4 rounded-full ${item.color}`}></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Skills;

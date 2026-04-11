import React from "react";
import SkillsTags from "./SkillsTags";

interface cardExperienceProps {
  title: string;
  imageName: string;
  description: string;
  skillsLearned: string[];
  link?: string;
}

const pathImageDefault = "/images/experiences/";

const CardExperience: React.FC<cardExperienceProps> = ({
  title,
  description,
  skillsLearned,
  link,
  imageName,
}) => {
  const pathImageReal = `${pathImageDefault}${imageName}.jpeg`;

  const getColor = (category: string) => {
    switch (category) {
      case "semeacode":
        return "bg-amber-500 hover:bg-amber-600";
      case "atria":
        return "bg-purple-500 hover:bg-purple-600";
      case "unicamp":
        return "bg-rose-500 hover:bg-rose-600";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  const colorClass = getColor(imageName); // Calcula a classe dinamicamente

  return (
    <div
      className={`
      lg:w-full
      hover:${colorClass} 
      flex flex-col lg:flex-row gap-5 bg-indigo-800 text-white rounded-2xl shadow-2xl
      flex-shrink-0 w-auto
      hover:scale-103 transition delay-150 duration-300 ease-in-out
      `}
    >
      {imageName && (
        <img
          src={pathImageReal}
          alt={title}
          className="w-full flex-1/3 h-20 lg:h-150 lg:w-80 object-cover rounded-t-lg"
        />
      )}
      <div className="p-5 flex flex-2/3 flex-col justify-between items-center gap-10">
        <h1 className="text-4xl md:text-6xl xl:text-7xl md font-bold">
          {title}
        </h1>
        <div className="flex flex-col gap-10">
          <p className="text-xl mt-2 whitespace-pre-line">{description}</p>
          <div>
            <SkillsTags tecnosUsed={skillsLearned} />
          </div>
        </div>
        {link && (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-indigo-600 hover:bg-indigo-700 
            p-2 md:p-5 xl:p-7 text-center rounded-2xl mt-4  text-2xl font-semibold
            hover:scale-100 transition delay-150 duration-300 ease-in-out"
          >
            Explorar
          </a>
        )}
      </div>
    </div>
  );
};

export default CardExperience;

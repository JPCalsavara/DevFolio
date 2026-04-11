import { TagsData } from "../services/inMemoryData";

interface SkillsTagsProps {
  tecnosUsed: string[];
}

const SkillsTags = ({ tecnosUsed }: SkillsTagsProps) => {
  const tecnologies = TagsData.tecnologies;

  const getColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-rose-500 hover:bg-rose-600";
      case "backend":
        return "bg-lime-500 hover:bg-lime-600";
      case "database":
        return "bg-amber-500 hover:bg-amber-600";
      case "all":
        return "bg-purple-600 hover:bg-purple-700";
      case "softskill":
          return "bg-cyan-600 hover:bg-cyan-700";
      default:
        return "bg-gray-500 hover:bg-gray-600";
    }
  };

  return (
    <div className="flex flex-wrap gap-2 justify-start px-2 md:px-7">
      {tecnosUsed.map((tecno, index) => {
        const techInfo = tecnologies[tecno] || { category: "unknown", link: "#", realName: tecno };
        const colorClass = getColor(techInfo.category);

        return (
          <div
            key={index}
            className={`w-auto h-auto p-1 px-4 rounded-lg text-white text-sm md:text-base font-semibold ${colorClass} transition delay-150 duration-300 ease-in-out`}
          >
            <a href={techInfo.link} target="_blank" rel="noopener noreferrer">
              {techInfo.realName}
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default SkillsTags;
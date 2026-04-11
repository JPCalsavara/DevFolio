
interface CardSkillProps {
  name: string;
  link?: string;
  type: string;
  isHovered: boolean; // Nova propriedade
  label:string;
}

const pathImageDefault = "/images/tecnologies/";

const CardSkills = ({ name, link, type, label, isHovered }: CardSkillProps) => {

  const getColor = (category: string) => {
    switch (category) {
      case "frontend":
        return "bg-rose-500 ";
      case "backend":
        return "bg-lime-500 ";
      case "database":
        return "bg-amber-500";
      case "all":
        return "bg-purple-600 ";
      default:
        return "bg-gray-500 ";
    }
  };


  return (
    <div
      className={`flex flex-col items-center w-full p-4 rounded-lg  delay-150 duration-300 ease-in-out
        ${isHovered ? `scale-105 ${getColor(type)} text-white` : "bg-indigo-300"
      }`}
    >
      <a href={link} target="_blank" rel="noopener noreferrer">
        <div className='flex flex-col items-center'>
          <img
            src={`${pathImageDefault}${name}.png`}
            alt={`${name} logo`}
            className="w-16 h-16 object-contain"
            />
          <h1 className="text-center text-lg font-semibold mt-2 capitalize">
            {label}
          </h1>
        </div>
      </a>
    </div>
  );
};

export default CardSkills;
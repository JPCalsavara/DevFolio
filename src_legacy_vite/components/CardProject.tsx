import SkillsTags from "./SkillsTags";

interface cardProjectProps {
  title: string;
  tecnosUsed?: string[];
  description: string;
  urlName: string;
  produtionLink?: string;
  repositoryLink?: string;
}

const CardProject = ({
  title,
  description,
  tecnosUsed,
  urlName,
  produtionLink,
  repositoryLink,
}: cardProjectProps) => {
  const pathImageReal =
    urlName !== ""
      ? `/images/projects/${urlName}.jpeg`
      : `/images/projects/default.jpg`;

  const renderLinkButton = (label: string, url?: string) => {
    const isAvailable = !!url;
    const bgColor = isAvailable
      ? `bg-indigo-300 hover:bg-indigo-500`
      : `bg-red-300 hover:bg-red-500`;

    return (
      <a
        className={`flex w-[90%] flex-1/2 justify-center gap-3 ${bgColor} p-3 rounded-2xl 
        transition delay-150 duration-300 ease-in-out hover:text-white hover:scale-105 cursor-pointer`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>{label}</p>
        <span className="text-white">
          <img
            className="w-6"
            src="/images/icons/arrow-up-right-from-square-svgrepo-com.svg"
            alt={`Abrir ${label.toLowerCase()}`}
          />
        </span>
      </a>
    );
  };

  return (
    <div
      className="w-60 sm:w-auto md:w-150 h-full flex flex-col justify-center items-center 
    gap-3 lg:gap-5 bg-indigo-400 pb-3 rounded-2xl text-lg sm:text-xl
    snap-start lg:scroll-ml-6 
    hover:scale-103 transition delay-150 duration-300 ease-in-out
    overflow-x-auto snap-x snap-mandatory scroll-smooth scroll-ml-32"
    >
      <img
        className="w-auto h-auto max-h-54 sm:max-h-64 md:max-h-105 rounded-t-2xl"
        src={pathImageReal}
        alt={`Imagem do projeto ${title}`}
      />
      <h1 className="text-3xl sm:text-4xl font-bold text-center">{title}</h1>
      <SkillsTags tecnosUsed={tecnosUsed || []} />
      <p className="text-xl text-start px-5 md:px-8 whitespace-pre-line">
        {description}
      </p>
      <div className="flex flex-col lg:flex-row w-full justify-center items-center gap-5 font-semibold text-indigo-900 lg:px-5">
        {renderLinkButton("Produção", produtionLink)}
        {renderLinkButton("Repositório", repositoryLink)}
      </div>
    </div>
  );
};

export default CardProject;

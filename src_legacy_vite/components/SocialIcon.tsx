// Define o tipo de socialMedia como as chaves do objeto linksSocial
export interface socialIconProps {
  // Garante que socialMedia seja uma chave válida
  size?: number;
}

const pathImagesDefault = "/images/social/"; // Ajustado para um caminho relativo ao servidor

const linksSocial: { [key: string]: string } = {
  github: "https://github.com/JPCalsavara",
  linkedin:
    "https://www.linkedin.com/in/jo%C3%A3o-pedro-leite-calsavara-b951b6230/",
  youtube: "https://youtube.com",
  instagram: "https://www.instagram.com/calsacoms.dev/",
};

export const SocialIcon = () => {
  return (
    <div className="flex justify-around items-center gap-3 flex-wrap py-2 ">
      {Object.keys(linksSocial).map((key) => {
        const pathImageReal = `${pathImagesDefault}${key}-icon.svg`;
        const link = linksSocial[key];
        return (
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="
                    p-2 rounded-xl 
                    transition delay-150 duration-300 ease-in-out 
                    hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500"
          >
            <img
              src={pathImageReal}
              alt={`${key} icon`}
              className={`w-8 md:w-12 rounded-md`}
            />
          </a>
        );
      })}
      <a
        className="
            p-2 rounded-xl font-semibold text-2xl w-full text-center
            transition delay-150 duration-300 ease-in-out 
            hover:-translate-y-1 hover:scale-110 bg-indigo-400 hover:bg-indigo-500"
        href="/files/curriculo.pdf"
        download="Curriculo_Joao_Calsavara.pdf"
      >
        Clique para CV
      </a>
    </div>
  );
};

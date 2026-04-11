import { SocialIcon } from "./SocialIcon";

function Hero() {
  return (
    <div className="w-screen text-white mt-10 lg:mt-30 md:items-center">
      <div className="w-full h-auto flex flex-col lg:flex-row lg:justify-between">
        <div className="w-auto h-auto flex flex-col justify-center items-center flex-2 pt-15 xl:pt-0 px-5">
          <img
            src="/images/hero-img.jpg"
            alt="Hero Image"
            className="h-auto md:max-w-100 rounded-full"
          />
          <div className="flex space-x-4">
            <SocialIcon />
          </div>
        </div>
        <div className="flex flex-col md:pb-4 px-10 xl:pb-5 pt-10 text-2xl lg:text-3xl text-center lg:text-right w-auto h-fit justify-center items-center lg:flex-3">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold pb-3 lg:pb-10">
            Quem eu sou?
          </h1>
          <p className="xl:mr-30">
            Meu nome é{" "}
            <span className="font-bold text-indigo-400">
              João Pedro Calsavara
            </span>
            , tenho 19 anos e sou estudante de{" "}
            <span className="font-bold text-indigo-400">
              Análise e Desenvolvimento de Sistemas na Unicamp
            </span>
            .
            <br />
            <br />
            Meu propósito é impactar a sociedade por meio da criatividade e
            inovação na programação.
            <br />
            <br />
            Minhas principais experiências incluem a{" "}
            <span className="font-bold text-indigo-400">Atria Jr</span>, empresa
            júnior da Unicamp,
            <span className="font-bold text-indigo-400">
              {" "}
              co-fundador do Semea Code
            </span>
            , projeto de extensão que oferece aulas de programação em escolas
            públicas.
            <br />
            <br />
            As tecnologias que tenho experiência são{" "}
            <span className="font-bold text-indigo-400">
              TypeScript, Python, C++ e C
            </span>
            .
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center text-white text-6xl w-full h-auto py-2 pt-5 lg:p-0 px-3 ">
        <a
          href="#projetos"
          className="
            p-3 line align-middle animate-bounce
            transition-all duration-500 ease-in-out 
            hover:scale-110 hover:bg-indigo-500 rounded-full"
        >
          <img
            className="w-15"
            src="/images/icons/arrow-down-svgrepo-com.svg"
          />
        </a>
      </div>
    </div>
  );
}

export default Hero;

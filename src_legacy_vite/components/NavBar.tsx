import { useState } from "react";

const NavBar = () => {
  const navTopic: [string, string][] = [
    ["Início", "#"],
    ["Projetos", "#projetos"],
    ["Habilidades", "#habilidades"],
    ["Experiências", "#experiencias"],
    ["Contato", "#contato"],
  ];

  const [open, setOpen] = useState(false);
  const iconName = open ? "close" : "menu";
  const iconPath = `/images/icons/${iconName}-svgrepo-com.svg`; // Caminho correto a partir da pasta "public"

  return (
    <div className="shadow-lg w-full fixed top-0 left-0 z-[9999] bg-gray-200">
      <div className="lg:flex items-center justify-between py-4 lg:px-10 px-7">
        {/* Logo */}
        <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
          <img
            className="w-10 h-10 text-indigo-600 mr-2"
            src="/images/icons/screen-svgrepo-com.svg"
            alt="logo"
          />
          João Calsavara
        </div>

        {/* Botão menu mobile */}
        <div
          onClick={() => setOpen(!open)}
          className="
          text-3xl absolute right-3 top-3 md:right-4 md:top-4 cursor-pointer lg:hidden"
        >
          <img
            className="w-10 h-10 text-indigo-600"
            src={iconPath}
            alt="menu icon"
          />
        </div>

        {/* Itens do menu */}
        <ul
          className={`lg:flex lg:items-center lg:pb-0 pb-12 absolute lg:static bg-gray-200 lg:z-auto z-[-1] left-0 lg:w-auto w-full lg:pl-0 pl-9 transition-all duration-500 ease-in ${
            open ? "top-20 opacity-100" : "top-[-490px] opacity-0"
          } lg:opacity-100`}
        >
          {navTopic.map(([label, href]) => (
            <li key={href} className="lg:ml-8 text-xl lg:my-0 my-7">
              <a
                href={href}
                className="text-gray-800 hover:text-indigo-600 duration-300"
                onClick={() => setOpen(false)} // Fecha menu após clique
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NavBar;

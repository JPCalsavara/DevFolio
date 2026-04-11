// Interfaces para os dados
interface ProjectCardData {
  title: string;
  tecnosUsed?: string[];
  description: string;
  urlName: string;
  produtionLink?: string;
  repositoryLink?: string;
}

interface SkillCardData {
  name: string;
  link?: string;
  type: string;
  label: string;
}

interface ExperienceCardData {
  title: string;
  imageName: string;
  description: string;
  skillsLearned: string[];
  link?: string;
}

interface LegendItem {
  label: string;
  color: string;
  type: string;
}

// Classe para armazenar os dados de tecnologias
export class TagsData {
  public static tecnologies: {
    [key: string]: { category: string; link?: string; realName?: string };
  } = {
    react: {
      category: "frontend",
      link: "https://reactjs.org",
      realName: "React",
    },
    tailwind: {
      category: "frontend",
      link: "https://tailwindcss.com/",
      realName: "Tailwind",
    },
    html: {
      category: "frontend",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      realName: "HTML5",
    },
    css: {
      category: "frontend",
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      realName: "CSS3",
    },
    node: {
      category: "backend",
      link: "https://nodejs.org",
      realName: "Node",
    },
    express: {
      category: "backend",
      link: "https://expressjs.com",
      realName: "Express",
    },
    typescript: {
      category: "all",
      link: "https://www.typescriptlang.org",
      realName: "TypeScript",
    },
    javascript: {
      category: "all",
      link: "https://pt.wikipedia.org/wiki/JavaScript",
      realName: "JavaScript",
    },
    mongodb: {
      category: "database",
      link: "https://www.mongodb.com",
      realName: "MongoDB",
    },
    prisma: {
      category: "database",
      link: "https://www.prisma.io",
      realName: "Prisma",
    },
    uml: {
      category: "default",
      link: "https://en.wikipedia.org/wiki/Unified_Modeling_Language",
      realName: "UML",
    },
    c: {
      category: "backend",
      link: "https://en.wikipedia.org/wiki/C_(programming_language)",
      realName: "C",
    },
    "c++": {
      category: "backend",
      link: "https://en.wikipedia.org/wiki/C%2B%2B",
      realName: "C++",
    },
    comunicacao: { category: "softskill", realName: "Comunicação" },
    oratoria: { category: "softskill", realName: "Oratória" },
    lideranca: { category: "softskill", realName: "Liderança" },
    design: { category: "softskill", realName: "Design" },
  };
}

// Classe para armazenar os dados de projetos
export class ProjectsData {
  public static projects: ProjectCardData[] = [
    {
      title: "Laranjada",
      tecnosUsed: [
        "typescript",
        "react",
        "tailwind",
        "node",
        "prisma",
        "express",
        "mongodb",
      ],
      description: `Rede social e plataforma de gerenciamento de encontros universitários. \n Entre as funcionalidades principais, estão: criação e validação de login de usuários, contagem de laranjas e armazenamento de ingredientes utilizados nos eventos. \n As novas funcionalidades incluem a criação de um método de pagamento integrado e um sistema inteligente que localiza e sugere receitas com base nos ingredientes disponíveis, utilizando inteligência artificial para otimizar o aproveitamento dos recursos.
`,
      urlName: "",
      // produtionLink: "",
      repositoryLink: "https://github.com/hitalloazevedo/laranjada-project",
    },
    {
      title: "Gerenciador de Credenciais",
      tecnosUsed: ["c"],
      description:
        "Gerenciador de credenciais pessoais, onde é possível cadastrar senhas, e-mails e os sites correspondentes de maneira simples e intuitiva. \nA principal funcionalidade do sistema é proporcionar um local seguro e organizado para armazenar suas informações de login, eliminando a necessidade de memorizar diversas senhas ou, pior ainda, utilizar a mesma senha para diferentes serviços.",
      urlName: "",
      produtionLink: "",
      repositoryLink: "https://github.com/JPCalsavara/gerenciador-credenciais",
    },
    {
      title: "Ordenador Merge Sorte com Threads",
      tecnosUsed: ["c", "Thread", "Merge Sort"],
      description:
        "Programa que em C processa múltiplos arquivos de entrada, cada um contendo uma lista de inteiros desordenados (um em cada linha), utilizando threads. \n Ele realiza a leitura e ordenação simultânea dos arquivos, armazenando o resultado em um arquivo de saída. A implementação visa medir o impacto do aumento de threads no tempo de execução.",
      urlName: "",
      // produtionLink: "",
      repositoryLink: "https://github.com/JPCalsavara/mergesort",
    },
    {
      title: "Portifolio HTML-CSS-JS",
      tecnosUsed: ["html", "css", "javascript"],
      description:
        "Programa que em C processa múltiplos arquivos de entrada, cada um contendo uma lista de inteiros desordenados (um em cada linha), utilizando threads. \n Ele realiza a leitura e ordenação simultânea dos arquivos, armazenando o resultado em um arquivo de saída. A implementação visa medir o impacto do aumento de threads no tempo de execução.",
      urlName: "",
      produtionLink: "",
      repositoryLink: "https://github.com/JPCalsavara/mergesort",
    },
  ];
}

// Classe para armazenar os dados de habilidades
export class SkillsData {
  public static skillsAll: SkillCardData[] = [
    {
      name: "react",
      link: "https://reactjs.org",
      type: "frontend",
      label: "React",
    },
    {
      name: "node",
      link: "https://nodejs.org",
      type: "backend",
      label: "Node",
    },
    {
      name: "typescript",
      link: "https://www.typescriptlang.org",
      type: "all",
      label: "TypeScript",
    },
    {
      name: "prisma",
      link: "https://www.prisma.io",
      type: "backend",
      label: "Prisma",
    },
    {
      name: "tailwind",
      link: "https://tailwindcss.com",
      type: "frontend",
      label: "Tailwind CSS",
    },
    {
      name: "c",
      link: "https://en.wikipedia.org/wiki/C_(programming_language)",
      type: "backend",
      label: "C",
    },
    {
      name: "c++",
      link: "https://en.wikipedia.org/wiki/C%2B%2B",
      type: "backend",
      label: "C++",
    },
    {
      name: "mongodb",
      link: "https://www.mongodb.com",
      type: "database",
      label: "MongoDB",
    },
    {
      name: "html",
      link: "https://developer.mozilla.org/en-US/docs/Web/HTML",
      type: "frontend",
      label: "HTML",
    },
    {
      name: "css",
      link: "https://developer.mozilla.org/en-US/docs/Web/CSS",
      type: "frontend",
      label: "CSS",
    },
    {
      name: "express",
      link: "https://expressjs.com",
      type: "backend",
      label: "Express",
    },
  ];

  public static legendItems: LegendItem[] = [
    { label: "Back-end", color: "bg-lime-600", type: "backend" },
    { label: "Front-end", color: "bg-rose-600", type: "frontend" },
    { label: "Data Base", color: "bg-amber-600", type: "database" },
    { label: "Front/Back-end", color: "bg-purple-700", type: "all" },
  ];
}

// Classe para armazenar os dados de experiências
export class ExperiencesData {
  public static experiencies: ExperienceCardData[] = [
    {
      title: "Semea Code",
      imageName: "semeacode",
      description: `Co-fundador com meu professor lidando com documentação, contato com as escolas, recrutamento de membros, organização e realização das aulas e planejamento estratégico futuro.
        No primeiro semestre de 2025, impactamos a vida de 13 alunos ensinando Python para alunos do ensino médio.
        Temos a missão de impactar 50 estudantes semestralmente em 2026.`,
      skillsLearned: ["comunicacao", "lideranca", "typescript", "react"],
      link: "https://www.instagram.com/semeacode.unicamp/",
    },
    {
      title: "Atria Jr",
      imageName: "atria",
      description: `Na Atria Jr., entendi como funciona uma empresa de verdade na prática atuando no TI, Marketing e Comercial.
        Na área de projeto, atuei com WordPress e HTML/CSS em um site front-end e também com Node.js, Express, Prisma ORM e MongoDB, aplicando arquitetura DDD (Domain-Driven Design) e princípios SOLID.`,
      skillsLearned: ["node", "express", "mongodb", "typescript", "wordpress"],
      link: "https://www.atriajr.com.br/",
    },
    {
      title: "Unicamp",
      imageName: "unicamp",
      description: `Durante minha formação na Unicamp, desenvolvi habilidades em análise de sistemas, programação e trabalho em equipe, aplicando conceitos de engenharia de software e POO.`,
      skillsLearned: [
        "typescript",
        "prisma",
        "c",
        "c++",
        "Java",
        "UML",
        "Ágil",
        "POO",
        "Modelagem de BD",
        "SQL",
      ],
      link: "https://www3.ft.unicamp.br/pt-br/graduacao/cursos/tads",
    },
  ];
}

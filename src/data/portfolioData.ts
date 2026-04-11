export type ProjectCardData = {
  slug: string;
  title: string;
  summaryLine?: string;
  period?: string;
  tecnosUsed?: string[];
  description: string;
  urlName: string;
  produtionLink?: string;
  repositoryLink?: string;
};

export type SkillCardData = {
  name: string;
  link?: string;
  type: string;
  label: string;
};

export type ExperienceCardData = {
  title: string;
  imageName?: string;
  location?: string;
  period?: string;
  role?: string;
  summary: string;
  achievements?: string[];
  skillsLearned: string[];
  link?: string;
};

export type LegendItem = {
  label: string;
  color: string;
  type: string;
};

export type CollegeDetailData = {
  institution: string;
  course: string;
  period: string;
  status: string;
  location: string;
  summary: string;
  pillars: string[];
  subjects: string[];
};

export const tagsData: Record<
  string,
  { category: string; link?: string; realName?: string }
> = {
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
  node: { category: "backend", link: "https://nodejs.org", realName: "Node" },
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
  comunicacao: { category: "softskill", realName: "Comunicacao" },
  oratoria: { category: "softskill", realName: "Oratoria" },
  lideranca: { category: "softskill", realName: "Lideranca" },
  design: { category: "softskill", realName: "Design" },
  csharp: {
    category: "backend",
    link: "https://learn.microsoft.com/dotnet/csharp/",
    realName: "C#",
  },
  dotnet: {
    category: "backend",
    link: "https://dotnet.microsoft.com/",
    realName: ".NET",
  },
  postgres: {
    category: "database",
    link: "https://www.postgresql.org/",
    realName: "PostgreSQL",
  },
  sqlserver: {
    category: "database",
    link: "https://www.microsoft.com/sql-server",
    realName: "SQL Server",
  },
  rabbitmq: {
    category: "backend",
    link: "https://www.rabbitmq.com/",
    realName: "RabbitMQ",
  },
  pubsub: {
    category: "backend",
    link: "https://cloud.google.com/pubsub",
    realName: "Pub/Sub",
  },
  docker: {
    category: "devops",
    link: "https://www.docker.com/",
    realName: "Docker",
  },
  kubernetes: {
    category: "devops",
    link: "https://kubernetes.io/",
    realName: "Kubernetes",
  },
  linux: {
    category: "devops",
    link: "https://www.linux.org/",
    realName: "Linux",
  },
  nginx: {
    category: "devops",
    link: "https://nginx.org/",
    realName: "NGINX",
  },
  aws: {
    category: "devops",
    link: "https://aws.amazon.com/",
    realName: "AWS",
  },
  gcp: {
    category: "all",
    link: "https://cloud.google.com/",
    realName: "GCP",
  },
  datadog: {
    category: "devops",
    link: "https://www.datadoghq.com/",
    realName: "Datadog",
  },
  xunit: {
    category: "backend",
    link: "https://xunit.net/",
    realName: "xUnit",
  },
  moq: {
    category: "backend",
    link: "https://github.com/moq/moq",
    realName: "Moq",
  },
  ddd: {
    category: "backend",
    link: "https://en.wikipedia.org/wiki/Domain-driven_design",
    realName: "DDD",
  },
  cleanarchitecture: {
    category: "backend",
    link: "https://8thlight.com/insights/a-color-coded-guide-to-clean-architecture",
    realName: "Clean Architecture",
  },
  angular: {
    category: "frontend",
    link: "https://angular.dev/",
    realName: "Angular",
  },
  nextjs: {
    category: "frontend",
    link: "https://nextjs.org/",
    realName: "Next.js",
  },
  llm: {
    category: "all",
    link: "https://en.wikipedia.org/wiki/Large_language_model",
    realName: "LLM",
  },
  prompt: {
    category: "all",
    link: "https://en.wikipedia.org/wiki/Prompt_engineering",
    realName: "Prompt Engineering",
  },
  entityframework: {
    category: "backend",
    link: "https://learn.microsoft.com/ef/",
    realName: "Entity Framework",
  },
  dockercompose: {
    category: "backend",
    link: "https://docs.docker.com/compose/",
    realName: "Docker Compose",
  },
  git: {
    category: "all",
    link: "https://git-scm.com/",
    realName: "Git",
  },
};

export const projectsData: ProjectCardData[] = [
  {
    slug: "interceptorsystem",
    title: "InterceptorSystem",
    summaryLine: "Plataforma de Gestão em Segurança",
    period: "Novembro 2024 - Atual",
    tecnosUsed: [
      "dotnet",
      "csharp",
      "angular",
      "cleanarchitecture",
      "ddd",
      "postgres",
      "docker",
      "kubernetes",
      "xunit",
      "moq",
      "aws",
    ],
    description:
      "Projeto full stack para gestão patrimonial. Estruturado em .NET 8 com Clean Architecture e DDD (monólito modular), com foco em escalabilidade, confiabilidade das regras de negócio e cobertura de testes unitários/integração.",
    urlName: "",
    produtionLink: "https://d1wq60pm5w8m2y.cloudfront.net/",
    repositoryLink: "https://github.com/JPCalsavara/InterceptorSystem",
  },
  {
    slug: "semeia-code",
    title: "Semeia Code",
    summaryLine: "Projeto de extensão em educação ",
    period: "Julho 2024 - Fev 2026",
    tecnosUsed: ["lideranca", "comunicacao", "oratoria", "design"],
    description:
      "Projeto de extensão criado do zero para ampliar o acesso à educação tecnológica no ensino médio. Coordenação executiva, estruturação da metodologia e liderança de equipe multidisciplinar com impacto direto em mais de 20 estudantes.",
    urlName: "",
    repositoryLink: "",
  },
  {
    slug: "ju-decoracao-de-natal",
    title: "Ju Decoração de Natal",
    summaryLine: "Plataforma digital com foco em SEO e leads",
    period: "Julho 2025 - Agosto 2025",
    tecnosUsed: ["nextjs", "typescript", "tailwind", "node"],
    description:
      "Projeto freelance full stack voltado para captação de leads e performance digital. Plataforma desenvolvida com Next.js e TypeScript, com ganhos concretos de SEO e crescimento de faturamento do cliente.",
    urlName: "",
    produtionLink: "https://www.ju-decoracao-de-natal.com.br/",
    repositoryLink:
      "https://github.com/JPCalsavara/ju-decoradoracao-de-natal-site",
  },
  {
    slug: "portfolio-pessoal",
    title: "Portfólio Pessoal",
    summaryLine: "Vitrine profissional para projetos e experiência",
    period: "2026 - Atual",
    tecnosUsed: ["nextjs", "typescript", "react", "tailwind"],
    description:
      "Portfólio para consolidar minha apresentação profissional em engenharia de software, com foco em backend, projetos de impacto e experiências em cloud e observabilidade.",
    urlName: "",
    produtionLink: "",
    repositoryLink: "https://github.com/JPCalsavara/portifolioReact",
  },
];

export const skillsData: SkillCardData[] = [
  {
    name: "csharp",
    link: "https://learn.microsoft.com/dotnet/csharp/",
    type: "backend",
    label: "C#",
  },
  {
    name: "dotnet",
    link: "https://dotnet.microsoft.com/",
    type: "backend",
    label: ".NET",
  },
  {
    name: "postgres",
    link: "https://www.postgresql.org/",
    type: "database",
    label: "PostgreSQL",
  },
  {
    name: "kubernetes",
    link: "https://kubernetes.io/",
    type: "devops",
    label: "Kubernetes",
  },
  {
    name: "linux",
    link: "https://www.linux.org/",
    type: "devops",
    label: "Linux",
  },
  {
    name: "nginx",
    link: "https://nginx.org/",
    type: "devops",
    label: "NGINX",
  },
  {
    name: "git",
    link: "https://git-scm.com/",
    type: "all",
    label: "Git",
  },
  {
    name: "aws",
    link: "https://aws.amazon.com/",
    type: "devops",
    label: "AWS",
  },
  {
    name: "datadog",
    link: "https://www.datadoghq.com/",
    type: "devops",
    label: "Datadog",
  },
  {
    name: "typescript",
    link: "https://www.typescriptlang.org",
    type: "all",
    label: "TypeScript",
  },
  {
    name: "node",
    link: "https://nodejs.org",
    type: "backend",
    label: "Node",
  },
  {
    name: "react",
    link: "https://reactjs.org",
    type: "frontend",
    label: "React",
  },
  {
    name: "express",
    link: "https://expressjs.com",
    type: "backend",
    label: "Express",
  },
  {
    name: "prisma",
    link: "https://www.prisma.io",
    type: "backend",
    label: "Prisma",
  },
  {
    name: "c",
    link: "https://en.wikipedia.org/wiki/C_(programming_language)",
    type: "backend",
    label: "C",
  },
  {
    name: "tailwind",
    link: "https://tailwindcss.com",
    type: "frontend",
    label: "Tailwind CSS",
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
    name: "c++",
    link: "https://en.wikipedia.org/wiki/C%2B%2B",
    type: "backend",
    label: "C++",
  },
];

export const legendItems: LegendItem[] = [
  { label: "Back-end", color: "#A3E635", type: "backend" },
  { label: "Front-end", color: "#FB7185", type: "frontend" },
  { label: "Data Base", color: "#F59E0B", type: "database" },
  { label: "Observability/DevOps", color: "#22D3EE", type: "devops" },
  { label: "Front/Back-end", color: "#A78BFA", type: "all" },
];

export const experiencesData: ExperienceCardData[] = [
  {
    title: "Mottu",
    imageName: "mottu",
    location: "São Paulo, SP",
    period: "Setembro 2025 - Atual",
    role: "Desenvolvedor Backend (Estagiário)",
    summary:
      "Unicórnio brasileiro de mobilidade. Atuação no Squad de Infrações e Multas focada em redundância e dados estratégicos.",
    achievements: [
      "Arquitetura Orientada a Eventos & Core Business: assegurei a consistência de dados operacionais e a retenção de repasses financeiros sem falhas de concorrência, ao desenvolver e orquestrar microsserviços seguros em .NET 8 utilizando mensageria (Pub/Sub), Docker e Kubernetes para lidar com complexidades espaciais (lat/long) e temporais (UTC).",
      "Inovação (IA) & Redução de Custos: eliminei 2 horas de trabalho manual diário da operação logística, triando e processando com sucesso mais de 1.200 notificações/mês, ao arquitetar um CronJob em Kubernetes integrado a um LLM (Engenharia de Prompt / Few-Shot), salvando no PostgreSQL e mitigando multas NICs.",
      "Sustentação & Observabilidade: evitei a perda de dezenas de milhares de reais semanais em penalidades, reduzindo drasticamente o tempo de resolução de incidentes de produção, ao criar painéis de monitorização analítica e alertas em tempo real no Datadog para um ecossistema híbrido (VMs e K8s).",
    ],
    skillsLearned: [
      "dotnet",
      "csharp",
      "postgres",
      "rabbitmq",
      "pubsub",
      "kubernetes",
      "docker",
      "datadog",
      "llm",
    ],
    link: "https://mottu.com.br/",
  },
];

export const socialLinks: Record<string, string> = {
  github: "https://github.com/JPCalsavara",
  linkedin: "https://www.linkedin.com/in/joaopedrocalsavara/",
  email: "mailto:jpcalsavara@gmail.com",
};

export const collegeData: CollegeDetailData = {
  institution: "Unicamp",
  course: "Análise e Desenvolvimento de Sistemas",
  period: "2024 - 2026",
  status: "Em formação",
  location: "Limeira, SP",
  summary:
    "Minha formação combina base acadêmica e aplicação prática em engenharia de software, com foco em backend, dados e arquitetura para sistemas de alta confiabilidade.",
  pillars: [
    "Fundamentos sólidos de estruturas de dados, banco de dados e engenharia de software.",
    "Projetos aplicados em C, C++, Node.js e desenvolvimento web moderno.",
    "Evolução constante em arquitetura, modelagem e qualidade de código.",
  ],
  subjects: [
    "Estruturas de Dados",
    "Banco de Dados",
    "Engenharia de Software",
    "Programação Orientada a Objetos",
    "Arquitetura de Software",
    "Sistemas Operacionais",
  ],
};

export const navTopics: Array<{ label: string; href: string }> = [
  { label: "Início", href: "#" },
  { label: "Faculdade", href: "#faculdade" },
  { label: "Projetos", href: "#projetos" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Experiências", href: "#experiencias" },
  { label: "Contato", href: "#contato" },
];

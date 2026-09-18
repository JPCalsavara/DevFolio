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
  detailsGoal?: string;
  detailsHighlights?: string[];
  detailsImpact?: string;
};

export type SkillCardData = {
  name: string;
  link?: string;
  type: string;
  label: string;
};

export type ExperienceCardData = {
  slug?: string;
  title: string;
  imageName?: string;
  imageNames?: string[];
  location?: string;
  period?: string;
  role?: string;
  summary: string;
  achievements?: string[];
  skillsLearned: string[];
  link?: string;
  exploreHref?: string;
  exploreLabel?: string;
};

export type ExperienceDetailPageData = {
  slug: string;
  title: string;
  introTitle: string;
  intro: string;
  sections: ExperienceCardData[];
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
  javascript: {
    category: "all",
    link: "https://pt.wikipedia.org/wiki/JavaScript",
    realName: "JavaScript",
  },
  php: {
    category: "backend",
    link: "https://www.php.net/",
    realName: "PHP",
  },
  mysql: {
    category: "database",
    link: "https://www.mysql.com/",
    realName: "MySQL",
  },
  supabase: {
    category: "database",
    link: "https://supabase.com/",
    realName: "Supabase",
  },
  lamp: {
    category: "devops",
    link: "https://en.wikipedia.org/wiki/LAMP_(software_bundle)",
    realName: "LAMP",
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
  python: {
    category: "backend",
    link: "https://www.python.org/",
    realName: "Python",
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
  argocd: {
    category: "devops",
    link: "https://argo-cd.readthedocs.io/",
    realName: "Argo CD",
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
  framermotion: {
    category: "frontend",
    link: "https://www.framer.com/motion/",
    realName: "Framer Motion",
  },
  vercel: {
    category: "devops",
    link: "https://vercel.com/",
    realName: "Vercel",
  },
  materialui: {
    category: "frontend",
    link: "https://mui.com/material-ui/",
    realName: "Material UI",
  },
  typescript: {
    category: "frontend",
    link: "https://www.typescriptlang.org/",
    realName: "TypeScript",
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
  rancher: {
    category: "devops",
    link: "https://www.rancher.com/",
    realName: "Rancher",
  },
  swagger: {
    category: "backend",
    link: "https://swagger.io/",
    realName: "Swagger",
  },
  insomnia: {
    category: "all",
    link: "https://insomnia.rest/",
    realName: "Insomnia",
  },
  rider: {
    category: "all",
    link: "https://www.jetbrains.com/rider/",
    realName: "Rider",
  },
  git: {
    category: "all",
    link: "https://git-scm.com/",
    realName: "Git",
  },
  nifi: {
    category: "database",
    link: "https://nifi.apache.org/",
    realName: "Apache NiFi",
  },
  bigquery: {
    category: "database",
    link: "https://cloud.google.com/bigquery",
    realName: "Google BigQuery",
  },
  cypress: {
    category: "frontend",
    link: "https://www.cypress.io/",
    realName: "Cypress",
  },
  java: {
    category: "backend",
    link: "https://www.java.com/",
    realName: "Java",
  },
  springboot: {
    category: "backend",
    link: "https://spring.io/projects/spring-boot",
    realName: "Spring Boot",
  },
  fastapi: {
    category: "backend",
    link: "https://fastapi.tiangolo.com/",
    realName: "FastAPI",
  },
  agents: {
    category: "all",
    link: "https://en.wikipedia.org/wiki/Intelligent_agent",
    realName: "Agentic AI",
  },
};

export const projectsData: ProjectCardData[] = [
  {
    slug: "interceptorsystem",
    title: "InterceptorSystem",
    summaryLine: "Plataforma de Gestão em Segurança Corporativa",
    period: "Nov 2024 - Atual",
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
      "cypress",
      "agents",
    ],
    description:
      "Plataforma SaaS de gestão de segurança patrimonial com backend em .NET 8 (Clean Architecture e DDD) e frontend em Angular 18, acelerada por fluxos de agentes de IA e testes automatizados de ponta a ponta.",
    urlName: "InterceptorSystem.png",
    produtionLink: "https://d1wq60pm5w8m2y.cloudfront.net/",
    repositoryLink: "https://github.com/JPCalsavara/InterceptorSystem",
    detailsGoal:
      "Plataforma SaaS de gestão de segurança patrimonial para clientes corporativos, com backend em .NET 8 e frontend em Angular.",
    detailsHighlights: [
      "Domínio estruturado com Clean Architecture e DDD para modular regras de negócio complexas e esteiras de CI/CD (GitHub Actions) na nuvem AWS (EC2, S3, redes).",
      "Aceleração do desenvolvimento através da integração de fluxos autônomos de agentes de IA baseados em LLMs para construção de funcionalidades e debugging.",
      "Qualidade de ponta a ponta com testes automatizados utilizando Cypress (E2E e componentes no frontend Angular 18) e testes unitários/integração no backend (xUnit, Moq).",
    ],
    detailsImpact:
      "Projeto orientado a escalar operações críticas com segurança, alta qualidade de código com zero regressões lógicas e arquitetura sustentável.",
  },
  {
    slug: "ju-decoracao-de-natal",
    title: "Ju Decoração de Natal",
    summaryLine: "Plataforma full-stack para captação qualificada de leads",
    period: "Jul - Ago 2025",
    tecnosUsed: [
      "nextjs",
      "typescript",
      "tailwind",
      "supabase",
      "vercel",
      "postgres",
    ],
    description:
      "Aplicação web full-stack criada para transformar o portfólio de uma decoradora de Natal em uma ferramenta de negócio, com galeria interativa, filtros avançados e automação de captação de leads.",
    urlName: "JuDecoracaoDeNatal.png",
    produtionLink: "https://www.ju-decoracao-de-natal.com.br/",
    repositoryLink:
      "https://github.com/JPCalsavara/ju-decoradoracao-de-natal-site",
    detailsGoal:
      "Digitalizar o portfólio e o atendimento de uma decoradora para gerar credibilidade e captação de leads.",
    detailsHighlights: [
      "Galeria dinâmica com filtros avançados e experiência orientada à conversão.",
      "Fluxo de orçamento com persistência de dados e integração de contato via WhatsApp.",
      "Entrega full-stack com Next.js e Supabase, pronta para evolução de negócio.",
    ],
    detailsImpact:
      "Transformou atendimento artesanal em operação digital com melhor apresentação comercial.",
  },
  {
    slug: "semeia-code",
    title: "Semeia Code",
    summaryLine: "Iniciativa de extensão em educação tecnológica",
    period: "Jul 2024 - Fev 2026",
    tecnosUsed: ["lideranca", "comunicacao", "oratoria", "design", "python"],
    description:
      "Projeto de extensão criado do zero para ampliar o acesso à educação tecnológica no ensino médio. Coordenação executiva, estruturação pedagógica e liderança de equipe multidisciplinar.",
    urlName: "SemeiaCode.jpeg",
    repositoryLink: "",
    detailsGoal:
      "Criar uma iniciativa de extensão para democratizar o ensino de tecnologia e programação no ensino médio.",
    detailsHighlights: [
      "Coordenação executiva e educacional da iniciativa com organização de equipe multidisciplinar sob princípios ágeis.",
      "Estruturação de metodologia de ensino, processos seletivos e trilhas práticas de aula em Python.",
      "Impacto direto em dezenas de estudantes e continuidade sustentável após transição de liderança.",
    ],
    detailsImpact:
      "Projeto com forte componente social e de liderança comunitária, conectando a universidade e escolas públicas.",
  },
  {
    slug: "portfolio-pessoal",
    title: "Portfólio Pessoal",
    summaryLine: "Vitrine profissional para projetos e experiência",
    period: "Jan 2026 - Atual",
    tecnosUsed: [
      "nextjs",
      "typescript",
      "react",
      "tailwind",
      "materialui",
      "supabase",
      "postgres",
    ],
    description:
      "Portfólio para consolidar minha apresentação profissional em engenharia de software, com arquitetura Local-First resiliente, foco em backend, cloud, observabilidade e pipeline de IA nativa.",
    urlName: "Portifolio.png",
    produtionLink: "https://joaocalsavara.vercel.app/",
    repositoryLink: "https://github.com/JPCalsavara/portifolioReact",
    detailsGoal:
      "Centralizar minha apresentação profissional em uma vitrine moderna, objetiva e fácil de atualizar.",
    detailsHighlights: [
      "Estrutura para destacar projetos, experiências e habilidades com narrativa técnica clara.",
      "Interface em Next.js e MUI com arquitetura Local-First e fallback resiliente.",
      "Área administrativa com suporte para pipeline de IA com Gemini e gestão de conteúdo.",
    ],
    detailsImpact:
      "Portfólio como peça de posicionamento profissional e demonstração de capacidade técnica.",
  },
  {
    slug: "projeto-web-faculdade",
    title: "Jogo da Memória",
    summaryLine: "Jogo da Memória do Mario para disciplina de Web",
    period: "Mar - Jun 2025",
    tecnosUsed: ["html", "css", "javascript", "php", "mysql", "lamp"],
    description:
      "Jogo da Memória interativo desenvolvido na disciplina SI401 para estimular memória visual e atenção. O objetivo é encontrar todos os pares em um tabuleiro embaralhado, com registro de movimentos e tempo de conclusão.",
    urlName: "JogoDaMemoriaMario.png",
    repositoryLink: "https://github.com/JPCalsavara/SI401-JogoDaMemoria",
    detailsGoal:
      "Desenvolver um jogo da memória web para exercitar atenção e memória visual em ambiente acadêmico.",
    detailsHighlights: [
      "Tabuleiro dinâmico com pares embaralhados e feedback visual de progresso.",
      "Registro de tempo e movimentos para aumentar o desafio e medir desempenho.",
      "Implementação web com HTML, CSS, JavaScript, PHP e MySQL em ambiente LAMP.",
    ],
    detailsImpact:
      "Consolidou fundamentos de desenvolvimento web completo e integração com backend e banco de dados.",
  },
  {
    slug: "projeto-threads-faculdade",
    title: "Projeto Threads",
    summaryLine: "Processamento paralelo com comparação de desempenho",
    period: "Ago - Nov 2024",
    tecnosUsed: ["c", "linux"],
    description:
      "Projeto da faculdade voltado a concorrência e paralelismo com merge sort em C, avaliando ganho de performance com diferentes quantidades de threads.",
    urlName: "default.jpg",
    repositoryLink: "https://github.com/JPCalsavara/mergesort",
    detailsGoal:
      "Comparar desempenho de processamento sequencial e paralelo em cenários de ordenação.",
    detailsHighlights: [
      "Implementação de merge sort em C com variações de paralelismo por threads.",
      "Medição e comparação quantitativa de ganho de performance por configuração.",
      "Estudo de concorrência, sincronização e limites práticos de escala.",
    ],
    detailsImpact:
      "Fortaleceu fundamentos de sistemas operacionais e performance com abordagem experimental.",
  },
  {
    slug: "projeto-analise-faculdade",
    title: "Projeto de Análise",
    summaryLine: "Análise e modelagem de solução de software",
    period: "Set - Dez 2024",
    tecnosUsed: ["c", "uml"],
    description:
      "Projeto acadêmico focado em análise de requisitos, modelagem de domínio e estruturação de solução de software com documentação técnica.",
    urlName: "default.jpg",
    repositoryLink: "https://github.com/JPCalsavara/gerenciador-credenciais",
    detailsGoal:
      "Transformar requisitos em uma solução de software bem modelada e documentada.",
    detailsHighlights: [
      "Levantamento e priorização de requisitos funcionais e não funcionais.",
      "Modelagem de domínio e documentação técnica para orientar implementação.",
      "Definição de escopo com foco em viabilidade e qualidade de entrega.",
    ],
    detailsImpact:
      "Aprimorou a visão de engenharia de software da análise até a definição de arquitetura.",
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
    name: "docker",
    link: "https://www.docker.com/",
    type: "devops",
    label: "Docker",
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
    name: "angular",
    link: "https://angular.dev/",
    type: "frontend",
    label: "Angular",
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
    label: "Tailwind",
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
  {
    name: "python",
    link: "https://www.python.org/",
    type: "backend",
    label: "Python",
  },
  {
    name: "nextjs",
    link: "https://nextjs.org/",
    type: "frontend",
    label: "Next.js",
  },
  {
    name: "rabbitmq",
    link: "https://www.rabbitmq.com/",
    type: "backend",
    label: "RabbitMQ",
  },
  {
    name: "xunit",
    link: "https://xunit.net/",
    type: "backend",
    label: "xUnit",
  },
  {
    name: "swagger",
    link: "https://swagger.io/",
    type: "backend",
    label: "Swagger",
  },
  {
    name: "insomnia",
    link: "https://insomnia.rest/",
    type: "all",
    label: "Insomnia",
  },
  {
    name: "argocd",
    link: "https://argo-cd.readthedocs.io/",
    type: "devops",
    label: "Argo CD",
  },
  {
    name: "rancher",
    link: "https://www.rancher.com/",
    type: "devops",
    label: "Rancher",
  },
  {
    name: "supabase",
    link: "https://supabase.com/",
    type: "database",
    label: "Supabase",
  },
  {
    name: "vercel",
    link: "https://vercel.com/",
    type: "devops",
    label: "Vercel",
  },
  {
    name: "javascript",
    link: "https://pt.wikipedia.org/wiki/JavaScript",
    type: "all",
    label: "JavaScript",
  },
  {
    name: "mysql",
    link: "https://www.mysql.com/",
    type: "database",
    label: "MySQL",
  },
  {
    name: "php",
    link: "https://www.php.net/",
    type: "backend",
    label: "PHP",
  },
  {
    name: "pubsub",
    link: "https://cloud.google.com/pubsub",
    type: "backend",
    label: "Pub/Sub",
  },
  {
    name: "cypress",
    link: "https://www.cypress.io/",
    type: "frontend",
    label: "Cypress",
  },
  {
    name: "nifi",
    link: "https://nifi.apache.org/",
    type: "database",
    label: "Apache NiFi",
  },
  {
    name: "bigquery",
    link: "https://cloud.google.com/bigquery",
    type: "database",
    label: "BigQuery",
  },
  {
    name: "java",
    link: "https://www.java.com/",
    type: "backend",
    label: "Java",
  },
  {
    name: "springboot",
    link: "https://spring.io/projects/spring-boot",
    type: "backend",
    label: "Spring Boot",
  },
  {
    name: "fastapi",
    link: "https://fastapi.tiangolo.com/",
    type: "backend",
    label: "FastAPI",
  },
  {
    name: "uml",
    link: "https://en.wikipedia.org/wiki/Unified_Modeling_Language",
    type: "all",
    label: "UML",
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
    slug: "mottu",
    title: "Mottu",
    imageName: "Mottu.jpg",
    location: "São Paulo, SP (Remoto)",
    period: "Set 2025 - Abr 2026",
    role: "Desenvolvedor Backend",
    summary:
      "Unicórnio de mobilidade urbana. Atuação no Squad de Infrações focada em dados estratégicos, telemetria e resiliência financeira.",
    achievements: [
      "Inovação com IA & Eficiência Operacional: eliminei 2 horas diárias de trabalho manual da operação logística ao projetar e implementar uma rotina agendada (Kubernetes CronJob) integrada a um modelo de linguagem (LLM via Few-Shot Prompt Engineering) para processar e estruturar mais de 1.200 notificações mensais caóticas no PostgreSQL.",
      "Observabilidade Estratégica (Datadog): contornei a ausência de logs detalhados em sistemas legados ao configurar a telemetria nativa de Máquinas Virtuais (VMs) e estruturar dashboards analíticos no Datadog, estabelecendo visibilidade macro em tempo real sobre volumetria de dados e taxas de sucesso.",
      "Integração de Dados & Solução de Falhas: garanti a estabilidade de fluxos logísticos cruciais e volumosos realizando o troubleshooting de integrações e a manutenção contínua de pipelines de produção através de ferramentas como Apache NiFi e Google BigQuery.",
      "Análise de Gargalos & Redução de MTTR: evitei perdas financeiras semanais recorrentes em multas operacionais através do cruzamento de métricas em tempo real para isolar padrões de instabilidade sistêmica, reduzindo drasticamente o tempo médio de resolução (MTTR) de incidentes.",
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
      "rancher",
      "argocd",
      "llm",
      "nifi",
      "bigquery",
    ],
    exploreHref: "/experiencia/mottu",
    exploreLabel: "Explorar melhor",
  },
  {
    slug: "semeia-code",
    title: "Semeia Code",
    imageName: "PrimeiraTurmaSemeia.jpg",
    location: "Limeira, São Paulo, Brasil",
    period: "Jul 2024 - Fev 2026",
    role: "Fundador e Coordenador Executivo",
    summary:
      "Co-fundei o Semeia Code para levar aulas de programação a escolas públicas e aproximar talentos do ensino médio da universidade.",
    achievements: [
      "Capacitação e engajamento ativo de dezenas de estudantes do ensino médio da comunidade local sem acesso à educação tecnológica.",
      "Fundação do projeto do zero e liderança de equipe multidisciplinar de mais de 10 membros sob os princípios do desenvolvimento ágil.",
      "Estruturação de metodologia de ensino, processos seletivos e trilhas práticas de aula em Python com sustentabilidade após transição de liderança.",
    ],
    skillsLearned: ["lideranca", "comunicacao", "oratoria", "design", "python"],
    exploreHref: "/experiencia/semeia-code",
    exploreLabel: "Explorar melhor",
  },
  {
    slug: "atria",
    title: "Atria Jr.",
    imageName: "atria.jpeg",
    location: "Limeira, São Paulo, Brasil · Híbrido",
    period: "Mai 2024 - Set 2025",
    role: "Assessor Comercial e Desenvolvedor Backend · Estágio",
    summary:
      "Na Empresa Júnior atuei em duas frentes: marketing e comercial em 2024, e backend em 2025, com evolução da prospecção e requisitos até arquitetura e infraestrutura de software.",
    achievements: [
      "2024: reestruturei o blog com foco em SEO, ultrapassando 1.000 usuários orgânicos/mês e apoiando pré-vendas e requisitos técnicos.",
      "2025: desenvolvi backend em TypeScript com DDD/Clean Architecture, PostgreSQL/Prisma, Docker e AWS para deploy e staging.",
    ],
    skillsLearned: [
      "comunicacao",
      "lideranca",
      "oratoria",
      "html",
      "css",
      "design",
      "typescript",
      "node",
      "docker",
      "dockercompose",
      "aws",
      "postgres",
      "prisma",
      "ddd",
      "cleanarchitecture",
    ],
    exploreHref: "/experiencia/atria",
    exploreLabel: "Explorar melhor",
  },
];

export const experiencesDetailsData: ExperienceDetailPageData[] = [
  {
    slug: "mottu",
    title: "Mottu",
    introTitle: "Mottu",
    intro:
      "Unicórnio brasileiro de mobilidade com forte cultura de operação, tecnologia e escala. No Squad de Infrações, atuei em soluções orientadas a eventos, telemetria e observabilidade para processos críticos de negócio.",
    sections: [
      {
        slug: "mottu",
        title: "Desenvolvedor Backend",
        imageName: "Mottu.jpg",
        location: "São Paulo, SP (Remoto)",
        period: "Set 2025 - Abr 2026",
        role: "Desenvolvedor Backend",
        summary:
          "Atuação no Squad de Infrações focada em redundância, consistência de dados, telemetria analítica e entrega confiável em produção.",
        achievements: [
          "Inovação com IA & Eficiência Operacional: eliminei 2 horas diárias de trabalho manual da operação logística ao projetar e implementar uma rotina agendada (Kubernetes CronJob) integrada a um modelo de linguagem (LLM via Few-Shot Prompt Engineering) para processar e estruturar mais de 1.200 notificações mensais caóticas no PostgreSQL.",
          "Observabilidade Estratégica (Datadog): contornei a ausência de logs detalhados em sistemas legados ao configurar a telemetria nativa de Máquinas Virtuais (VMs) e estruturar dashboards analíticos no Datadog, estabelecendo visibilidade macro em tempo real sobre volumetria de dados e taxas de sucesso.",
          "Integração de Dados & Solução de Falhas: garanti a estabilidade de fluxos logísticos cruciais e volumosos realizando o troubleshooting de integrações e a manutenção contínua de pipelines de produção através de ferramentas como Apache NiFi e Google BigQuery.",
          "Análise de Gargalos & Redução de MTTR: evitei perdas financeiras semanais recorrentes em multas operacionais através do cruzamento de métricas em tempo real para isolar padrões de instabilidade sistêmica, reduzindo drasticamente o tempo médio de resolução (MTTR) de incidentes.",
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
          "rancher",
          "argocd",
          "llm",
          "nifi",
          "bigquery",
        ],
      },
    ],
  },
  {
    slug: "atria",
    title: "Atria Jr.",
    introTitle: "Atria Jr.",
    intro:
      "Empresa júnior da Unicamp em Limeira que une formação empresarial, tecnologia e impacto prático. Ao longo da jornada, a atuação passou por marketing/comercial em 2024 e por backend/infraestrutura em 2025.",
    sections: [
      {
        slug: "atria",
        title: "2024 · Marketing, Comercial e Pré-vendas",
        imageNames: ["Epej2024Atria.jpg", "Enej2024Atria.jpg"],
        location: "Limeira, São Paulo, Brasil",
        period: "Mai - Nov 2024",
        role: "Assessor Comercial · Estágio",
        summary:
          "Atuei na frente comercial e de pré-vendas, com foco em marketing, outbound e qualificação técnica para fortalecer o funil de novos projetos.",
        achievements: [
          "Geração de Demanda (Marketing): liderei a reestruturação estratégica do blog da Atria Jr. com foco em SEO, gerando mais de 1.000 usuários orgânicos mensais.",
          "Prospecção Ativa (Outbound): realizei prospecção B2B de novos clientes por abordagens digitais e presenciais.",
          "Pré-Vendas e Requisitos: conduzi reuniões diagnósticas para qualificação de leads, atuando como ponte técnica entre cliente e time de desenvolvimento.",
          "Elicitação de requisitos e apoio à precificação de soluções de software.",
        ],
        skillsLearned: [
          "comunicacao",
          "lideranca",
          "oratoria",
          "html",
          "css",
          "design",
        ],
      },
      {
        slug: "atria",
        title: "2025 · Backend, Arquitetura e Infraestrutura",
        imageNames: ["AgiBankAtria.jpg", "GloboAtria.jpg", "Epej2025Atria.jpg"],
        location: "Limeira, São Paulo, Brasil · Híbrido",
        period: "Fev - Set 2025",
        role: "Desenvolvedor Backend · Estágio",
        summary:
          "Participei ativamente do desenvolvimento backend de uma aplicação web robusta em TypeScript, colaborando em todo o ciclo de projeto, desde a definição de requisitos até a implementação.",
        achievements: [
          "Contribuí para a implementação da arquitetura do sistema, aplicando conceitos de Clean Architecture e Domain-Driven Design (DDD) sob mentoria.",
          "Adquiri experiência prática na configuração e gerenciamento da infraestrutura de deploy e staging, utilizando Docker, Docker Compose e serviços da AWS (EC2 e S3).",
          "Auxiliei na estruturação e gerenciamento do banco de dados PostgreSQL e na utilização do ORM Prisma.",
          "Colaborei na modelagem técnica do sistema e na aplicação de boas práticas de desenvolvimento para garantir a qualidade e manutenibilidade do código.",
        ],
        skillsLearned: [
          "typescript",
          "node",
          "docker",
          "dockercompose",
          "aws",
          "postgres",
          "prisma",
          "ddd",
          "cleanarchitecture",
        ],
      },
    ],
  },
  {
    slug: "semeia-code",
    title: "Semeia Code",
    introTitle: "Semeia Code",
    intro:
      "Projeto de aulas de programação em escolas públicas criado para aproximar alunos do ensino médio da universidade e da tecnologia, com forte papel social, pedagógico e de organização de comunidade.",
    sections: [
      {
        slug: "semeia-code",
        title: "Começo do projeto",
        imageName: "ComecoSemeiaCode.jpg",
        location: "Limeira, São Paulo, Brasil",
        period: "Jul 2024 - Fev 2025",
        role: "Fundador e Coordenador Executivo/Educacional",
        summary:
          "A etapa inicial foi dedicada à escrita científica para estruturar o projeto, buscar os primeiros membros e validar as ideias do Semeia Code.",
        achievements: [
          "Escrita científica para estruturar a proposta do projeto inicial.",
          "Busca e engajamento dos primeiros membros da Unicamp para compor a equipe.",
          "Validação das ideias e do formato pedagógico do Semeia Code.",
        ],
        skillsLearned: ["lideranca", "comunicacao", "oratoria", "design"],
      },
      {
        slug: "semeia-code",
        title: "Segunda turma e reestruturação",
        imageName: "SegundaTurmaSemeia.jpg",
        location: "Limeira, São Paulo, Brasil",
        period: "Jul 2025 - Fev 2026",
        role: "Coordenador Executivo e Educacional",
        summary:
          "Reestruturei cargos, processo seletivo, reuniões e modelos de aula; ministrei aulas na E. E. Ely e na Nexus (crianças superdotadas), além de apoiar os novos coordenadores.",
        achievements: [
          "Reestruturação total dos cargos, processo seletivo e modelos de aula.",
          "Aulas noturnas na escola estadual Ely e workshop na organização Nexus.",
          "Condução do processo seletivo e atuação como conselho consultivo para a nova gestão.",
        ],
        skillsLearned: [
          "lideranca",
          "comunicacao",
          "oratoria",
          "design",
          "python",
        ],
      },
      {
        slug: "semeia-code",
        title: "Primeira turma na E. E. Ely",
        imageName: "PrimeiraTurmaSemeia.jpg",
        location: "E. E. Ely · Limeira, São Paulo",
        period: "Mar 2025 - Jun 2025",
        role: "Professor e Coordenador do Projeto",
        summary:
          "Primeira turma prática na E. E. Ely com 13 alunos, ministrando 8 aulas de lógica e programação em Python.",
        achievements: [
          "Turma com 13 alunos na escola estadual parceira.",
          "Ministração de 8 aulas práticas de introdução à programação com Python.",
          "Atuação direta na docência e coordenação geral da equipe em sala.",
        ],
        skillsLearned: [
          "lideranca",
          "comunicacao",
          "oratoria",
          "design",
          "python",
        ],
      },
    ],
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
  period: "2024 - 2027",
  status: "Em formação (Previsão: Dez 2027)",
  location: "Limeira, SP",
  summary:
    "Minha formação na Faculdade de Tecnologia da Unicamp combina base acadêmica rigorosa e aplicação prática em engenharia de software, com foco em backend, sistemas distribuídos, dados e arquitetura para soluções de alta confiabilidade.",
  pillars: [
    "Fundamentos sólidos de estruturas de dados, banco de dados e engenharia de software.",
    "Projetos aplicados em C, C++, C# (.NET), Python e desenvolvimento web moderno.",
    "Evolução constante em arquitetura distribuída, modelagem de domínio e qualidade de código.",
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
  { label: "Início", href: "/" },
  { label: "Experiências", href: "/experiencias" },
  { label: "Faculdade", href: "/faculdade" },
  { label: "Projetos", href: "/projetos" },
  { label: "Habilidades", href: "/#habilidades" },
  { label: "Contato", href: "/#contato" },
];

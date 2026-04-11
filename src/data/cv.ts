export type Stat = {
  label: string;
  value: string;
};

export type Experience = {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  description: string;
  stack: string[];
  link?: string;
};

export const profile = {
  name: "João Calsavara",
  title: "UI/UX Designer & Developer",
  intro:
    "Profissional com 10+ anos de experiência em design e desenvolvimento, com foco em criar produtos digitais claros, modernos e orientados a resultados.",
};

export const stats: Stat[] = [
  { label: "Projetos Entregues", value: "12K" },
  { label: "Clientes Satisfeitos", value: "10K" },
  { label: "Anos de Experiência", value: "10+" },
  { label: "Especialidades", value: "4" },
];

export const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Figma",
  "Material UI",
  "Prisma",
  "PostgreSQL",
  "Supabase",
];

export const projects: Project[] = [
  {
    id: "laranjada",
    title: "Laranjada",
    description:
      "Rede social para encontros universitários com login, pagamentos e recomendação inteligente de receitas.",
    stack: ["React", "TypeScript", "Node.js", "Prisma", "MongoDB"],
    link: "https://github.com/hitalloazevedo/laranjada-project",
  },
  {
    id: "credenciais",
    title: "Gerenciador de Credenciais",
    description:
      "Aplicação para armazenamento seguro de senhas, e-mails e sites com foco em simplicidade de uso.",
    stack: ["C", "Segurança"],
    link: "https://github.com/JPCalsavara/gerenciador-credenciais",
  },
  {
    id: "mergesort",
    title: "Merge Sort com Threads",
    description:
      "Processamento paralelo de arquivos com métricas de desempenho para diferentes quantidades de threads.",
    stack: ["C", "Threads", "Performance"],
    link: "https://github.com/JPCalsavara/mergesort",
  },
];

export const experiences: Experience[] = [
  {
    id: "semea",
    company: "Semea Code",
    role: "Co-fundador",
    period: "2025 - Atual",
    description:
      "Liderança de operação, recrutamento e planejamento de aulas. Impacto direto em alunos do ensino médio com ensino de programação.",
  },
  {
    id: "atria",
    company: "Atria Jr",
    role: "Projetos e Tecnologia",
    period: "2024 - 2025",
    description:
      "Atuação em front-end e back-end com Node.js, Express, Prisma e MongoDB, aplicando DDD e princípios SOLID.",
  },
  {
    id: "unicamp",
    company: "Unicamp",
    role: "Análise e Desenvolvimento de Sistemas",
    period: "Formação",
    description:
      "Base sólida em engenharia de software, POO, modelagem de dados e desenvolvimento colaborativo.",
  },
];

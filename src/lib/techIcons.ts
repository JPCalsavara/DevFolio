export const LOCAL_TECH_ICONS: Record<string, string> = {
  aws: "/images/tecnologies/AWS.png",
  angular: "/images/tecnologies/Angular.png",
  c: "/images/tecnologies/C.png",
  "c++": "/images/tecnologies/C++.png",
  csharp: "/images/tecnologies/CSharp.png",
  css: "/images/tecnologies/CSS.png",
  datadog: "/images/tecnologies/Datadog.png",
  docker: "/images/tecnologies/Docker.png",
  express: "/images/tecnologies/Express.png",
  git: "/images/tecnologies/Git.png",
  html: "/images/tecnologies/HTML.png",
  insomnia: "/images/tecnologies/Insomnia.png",
  kubernetes: "/images/tecnologies/Kubernetes.png",
  linux: "/images/tecnologies/Linux.png",
  mongodb: "/images/tecnologies/mongodb.png",
  nginx: "/images/tecnologies/NGINX.png",
  nextjs: "/images/tecnologies/Next.js.png",
  node: "/images/tecnologies/Node.png",
  postgres: "/images/tecnologies/PostgresSQL.png",
  prisma: "/images/tecnologies/Prisma.png",
  python: "/images/tecnologies/Python.png",
  rabbitmq: "/images/tecnologies/RabbitMQ.png",
  rancher: "/images/tecnologies/Rancher.png",
  react: "/images/tecnologies/React.png",
  rider: "/images/tecnologies/Rider.png",
  sqlserver: "/images/tecnologies/sqlserver.svg",
  supabase: "/images/tecnologies/SupaBase.png",
  swagger: "/images/tecnologies/Swagger.png",
  tailwind: "/images/tecnologies/Tailwind.png",
  typescript: "/images/tecnologies/TypeScript.png",
  uml: "/images/tecnologies/Unified Modelling Language (UML).png",
  xunit: "/images/tecnologies/xUnit.png",
  argocd: "/images/tecnologies/Argo CD.png",
  dotnet: "/images/tecnologies/NET.png",
  vercel: "/images/tecnologies/vercel.png",
  javascript: "/images/tecnologies/JavaScript.png",
  mysql: "/images/tecnologies/MySQL.png",
  php: "/images/tecnologies/PHP.png",
  pubsub: "/images/tecnologies/PubSub.png",
};

/**
 * Mapeamentos conhecidos para o Devicon ou SimpleIcons CDN
 * quando o nome chave da tecnologia difere do nome do pacote no repositório.
 */
export const DEVICON_SPECIAL_CASES: Record<string, string> = {
  cypress: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cypressio/cypressio-original.svg",
  springboot: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  spring: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg",
  fastapi: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  bigquery: "https://cdn.simpleicons.org/googlebigquery",
  googlebigquery: "https://cdn.simpleicons.org/googlebigquery",
  csharp: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg",
  "c++": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg",
  dotnet: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg",
  sqlserver: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg",
  pubsub: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg",
  tailwind: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  postgres: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
  nextjs: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  node: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
};

/**
 * Retorna a URL padrão do Devicon CDN para uma determinada tecnologia.
 */
export function getDeviconUrl(techName: string): string {
  const normalized = techName.trim().toLowerCase();
  if (DEVICON_SPECIAL_CASES[normalized]) {
    return DEVICON_SPECIAL_CASES[normalized];
  }
  // Padrão Devicon no jsDelivr
  return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${normalized}/${normalized}-original.svg`;
}

/**
 * Estratégia Híbrida:
 * 1. Se foi informada uma URL customizada (salva no banco/portfolioData), usa ela.
 * 2. Se existe o arquivo baixado localmente em public/images/tecnologies/, usa o arquivo local.
 * 3. Se não existe localmente, faz o fallback automático para a CDN do Devicon/SimpleIcons.
 * 4. Fallback final: ícone genérico SVG.
 */
export function resolveTechIcon(name: string, customIconUrl?: string | null): string {
  if (customIconUrl && customIconUrl.trim()) {
    return customIconUrl.trim();
  }

  const normalized = (name || "").trim().toLowerCase();

  // 1. Arquivo local em public/images/tecnologies/
  if (LOCAL_TECH_ICONS[normalized]) {
    return LOCAL_TECH_ICONS[normalized];
  }

  // 2. Mapeamento Devicon / SimpleIcons CDN
  return getDeviconUrl(normalized);
}

/**
 * Verifica se a URL é externa (CDN) ou local (public/)
 */
export function isExternalIcon(url?: string | null): boolean {
  if (!url) return false;
  return url.startsWith("http://") || url.startsWith("https://");
}

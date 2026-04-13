import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

type CardSkillProps = {
  name: string;
  link?: string;
  type: string;
  isHovered: boolean;
  label: string;
};

const colorByCategory: Record<string, string> = {
  frontend: "rgba(251, 113, 133, 0.2)",
  backend: "rgba(163, 230, 53, 0.2)",
  database: "rgba(245, 158, 11, 0.2)",
  all: "rgba(167, 139, 250, 0.2)",
  devops: "rgba(34, 211, 238, 0.2)",
  default: "rgba(100, 116, 139, 0.2)",
};

export default function CardSkills({
  name,
  link,
  type,
  label,
  isHovered,
}: CardSkillProps) {
  const imageByTech: Record<string, string> = {
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
  };
  const imagePath = imageByTech[name] || "/images/icons/screen-svgrepo-com.svg";
  const bgColor = isHovered
    ? colorByCategory[type] || colorByCategory.default
    : "rgba(255,255,255,0.02)";

  return (
    <Card
      sx={{
        backgroundColor: bgColor,
        border: "1px solid rgba(255,255,255,0.12)",
        transition: "all .2s ease",
        transform: isHovered ? "scale(1.03)" : "scale(1)",
      }}
    >
      <CardActionArea
        component={link ? "a" : "div"}
        href={link || undefined}
        target={link ? "_blank" : undefined}
      >
        <CardContent sx={{ display: "grid", placeItems: "center", gap: 1 }}>
          <Box
            component="img"
            src={imagePath}
            alt={`${name} logo`}
            loading="lazy"
            decoding="async"
            sx={{ width: 64, height: 64, objectFit: "contain" }}
          />
          <Typography
            variant="subtitle1"
            sx={{ textAlign: "center", fontWeight: 700 }}
          >
            {label}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

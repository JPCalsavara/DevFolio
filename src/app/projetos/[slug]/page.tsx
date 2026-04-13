import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Contact from "@/components/Contact";
import NavBar from "@/components/NavBar";
import SkillsTags from "@/components/SkillsTags";
import { legendItems, projectsData } from "@/data/portfolioData";

const projectInsights: Record<
  string,
  { goal: string; highlights: string[]; impact: string }
> = {
  interceptorsystem: {
    goal: "Estruturar uma plataforma robusta para gestão patrimonial com base em arquitetura limpa, testes e escalabilidade.",
    highlights: [
      "Monólito modular em .NET 8 com foco em separação clara de responsabilidades.",
      "Modelagem voltada para regras de negócio críticas, com DDD e Clean Architecture.",
      "Ambiente orientado a entrega confiável com cobertura de testes e integração contínua.",
    ],
    impact:
      "Projeto pensado para reduzir acoplamento, facilitar evolução do produto e sustentar crescimento técnico do domínio.",
  },
  "semeia-code": {
    goal: "Criar uma iniciativa de extensão universitária para democratizar ensino de tecnologia no ensino médio.",
    highlights: [
      "Coordenação executiva e organização de uma equipe multidisciplinar.",
      "Estruturação da metodologia de ensino e da operação do projeto do zero.",
      "Mais de 20 estudantes impactados diretamente pela iniciativa.",
    ],
    impact:
      "Projeto com forte componente social, liderança e formação de base para estudantes em início de jornada na tecnologia.",
  },
  "ju-decoracao-de-natal": {
    goal: "Desenvolver uma presença digital voltada a captação de leads e performance comercial.",
    highlights: [
      "Implementação com Next.js e TypeScript.",
      "Foco em SEO, performance e experiência da marca.",
      "Contribuição direta para crescimento de faturamento do cliente.",
    ],
    impact:
      "Projeto comercial com resultado mensurável e foco em conversão digital.",
  },
  "portfolio-pessoal": {
    goal: "Centralizar minha apresentação profissional em uma vitrine moderna, coerente e objetiva.",
    highlights: [
      "Construído com Next.js, MUI e tema azul premium.",
      "Estrutura pensada para destacar projetos, habilidades e experiências reais.",
      "Base preparada para evoluir com dados dinâmicos e página de detalhes.",
    ],
    impact:
      "Portfólio pensado como peça de posicionamento técnico e narrativa profissional.",
  },
  "projeto-web-faculdade": {
    goal: "Desenvolver um Jogo da Memória interativo para melhorar memória visual e atenção, registrando tempo e movimentos para tornar a experiência mais desafiadora e divertida.",
    highlights: [
      "Tabuleiro dinâmico com pares embaralhados a cada nova partida.",
      "Temporizador e contador de movimentos para medir a performance do jogador.",
      "Feedback visual ao virar cartas e ao encontrar pares, com mensagem de vitória ao concluir o tabuleiro.",
      "Interface amigável e responsiva para diferentes resoluções de tela.",
      "Implementação com HTML5, CSS3 e JavaScript (Vanilla) para estrutura, estilo e lógica do jogo no navegador.",
      "Execução do projeto em ambiente LAMP, com backend em PHP e persistência em MySQL.",
    ],
    impact:
      "Consolidou fundamentos de front-end e lógica interativa, além da integração com backend e banco de dados em um cenário web completo.",
  },
  "projeto-threads-faculdade": {
    goal: "Comparar desempenho de processamento sequencial e paralelo em algoritmos de ordenação.",
    highlights: [
      "Implementação de merge sort em C com variações de paralelismo.",
      "Medição de tempos e análise de ganho de performance por cenário.",
      "Estudo de concorrência, sincronização e limites práticos de escala.",
    ],
    impact:
      "Fortaleceu fundamentos de sistemas e performance com abordagem quantitativa.",
  },
  "projeto-analise-faculdade": {
    goal: "Transformar requisitos em uma solução de software modelada de forma clara e implementável.",
    highlights: [
      "Levantamento e organização de requisitos funcionais e não funcionais.",
      "Modelagem de domínio e documentação técnica para orientar implementação.",
      "Priorização de escopo com foco em viabilidade e qualidade da entrega.",
    ],
    impact:
      "Aprimorou visão de engenharia de software desde a análise até a definição da arquitetura.",
  },
};

export function generateStaticParams() {
  return projectsData.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);

  if (!project) {
    return {
      title: "Projeto não encontrado | Portfólio",
    };
  }

  return {
    title: `${project.title} | Portfólio`,
    description: project.description,
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData.find((item) => item.slug === slug);

  if (!project) {
    notFound();
  }

  const insight = projectInsights[project.slug];

  return (
    <Box>
      <NavBar />

      <Box
        sx={{
          pt: { xs: 12, md: 14 },
          pb: { xs: 7, md: 9 },
          minHeight: "100svh",
          background:
            "radial-gradient(circle at 15% 20%, rgba(92,156,255,0.2), transparent 28%), radial-gradient(circle at 80% 20%, rgba(125,211,252,0.16), transparent 26%), linear-gradient(180deg, rgba(7,17,31,0.98) 0%, rgba(10,20,36,0.96) 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3.5}>
            <Link href="/" style={{ textDecoration: "none" }}>
              <Button
                component="span"
                variant="outlined"
                color="secondary"
                startIcon={<ArrowBackRoundedIcon />}
                sx={{ alignSelf: "flex-start" }}
              >
                Voltar para página principal
              </Button>
            </Link>

            <Stack spacing={1.2}>
              <Typography
                variant="overline"
                sx={{
                  color: "secondary.main",
                  letterSpacing: 3,
                  fontWeight: 700,
                }}
              >
                Detalhes do projeto
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.5rem", md: "4.3rem" },
                  lineHeight: 0.98,
                }}
              >
                {project.title}
              </Typography>
              <Typography
                sx={{ color: "text.secondary", maxWidth: 900, lineHeight: 1.9 }}
              >
                {project.description}
              </Typography>
            </Stack>

            {insight ? (
              <Stack
                spacing={2.5}
                sx={{
                  p: { xs: 2.2, md: 3 },
                  borderRadius: 3,
                  backgroundColor: "rgba(13, 27, 45, 0.92)",
                  border: "1px solid rgba(125, 211, 252, 0.14)",
                }}
              >
                <Box>
                  <Typography
                    variant="h5"
                    sx={{ mb: 1, fontWeight: 800, color: "primary.main" }}
                  >
                    Objetivo
                  </Typography>
                  <Typography sx={{ color: "text.primary", lineHeight: 1.8 }}>
                    {insight.goal}
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    sx={{ mb: 1, fontWeight: 800, color: "primary.main" }}
                  >
                    Destaques
                  </Typography>
                  <Stack component="ul" spacing={1.2} sx={{ pl: 2.5, m: 0 }}>
                    {insight.highlights.map((item) => (
                      <Typography
                        component="li"
                        key={item}
                        sx={{ lineHeight: 1.7 }}
                      >
                        {item}
                      </Typography>
                    ))}
                  </Stack>
                </Box>

                <Box>
                  <Typography
                    variant="h5"
                    sx={{ mb: 1, fontWeight: 800, color: "primary.main" }}
                  >
                    Impacto
                  </Typography>
                  <Typography sx={{ color: "text.primary", lineHeight: 1.8 }}>
                    {insight.impact}
                  </Typography>
                </Box>
              </Stack>
            ) : null}

            <Stack spacing={1.2}>
              <Typography variant="h5" sx={{ fontWeight: 800 }}>
                Tecnologias
              </Typography>
              <SkillsTags tecnosUsed={project.tecnosUsed || []} />

              <Stack direction={{ xs: "column", md: "row" }} spacing={1.2}>
                {legendItems.map((item) => (
                  <Stack
                    key={item.type}
                    direction="row"
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: 2,
                      backgroundColor: "rgba(255,255,255,0.06)",
                      minWidth: 180,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography>{item.label}</Typography>
                    <Box
                      sx={{
                        width: 14,
                        height: 14,
                        borderRadius: 999,
                        backgroundColor: item.color,
                      }}
                    />
                  </Stack>
                ))}
              </Stack>
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              {project.produtionLink ? (
                <Button
                  href={project.produtionLink}
                  component="a"
                  target="_blank"
                  rel="noreferrer"
                  variant="contained"
                  color="primary"
                >
                  Ver produção
                </Button>
              ) : null}
              {project.repositoryLink ? (
                <Button
                  href={project.repositoryLink}
                  component="a"
                  target="_blank"
                  rel="noreferrer"
                  variant="outlined"
                  color="secondary"
                >
                  Ver repositório
                </Button>
              ) : null}
            </Stack>
          </Stack>
        </Container>
      </Box>

      <Contact />

      <Box
        component="footer"
        sx={{
          py: 2.2,
          borderTop: "1px solid rgba(125,211,252,0.12)",
          backgroundColor: "rgba(7, 17, 31, 0.9)",
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ color: "text.secondary", textAlign: "center" }}>
            João Calsavara - Portfólio
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
    goal: "Plataforma SaaS de gestão de segurança patrimonial para clientes, com backend em .NET 8 e frontend em Angular 21.",
    highlights: [
      "Domínio estruturado em Clean Architecture + DDD com 3 bounded contexts: Operações, Auth e WhatsApp.",
      "Autenticação JWT, gestão de contas SaaS (FREE/BASIC/PRO), notificações por e-mail e integração com WhatsApp chatbot.",
      "Parte das funcionalidades está em evolução contínua, com entregas incrementais no produto.",
    ],
    impact:
      "Projeto orientado a escalar regras de negócio complexas com segurança, observabilidade e arquitetura sustentável de longo prazo.",
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
    goal: "Traduzir a arte e o atendimento personalizado de uma decoradora profissional em uma experiência digital moderna para credibilidade, portfólio interativo e captação de leads.",
    highlights: [
      "Plataforma orientada a negócio, não e-commerce tradicional: foco em qualificação e conversão de interessados.",
      "Galeria dinâmica com filtros avançados e fluxo de orçamento integrado ao banco de dados.",
      "Integração com WhatsApp para acelerar o primeiro contato comercial.",
    ],
    impact:
      "Projeto com valor afetivo e resultado prático, transformando atendimento artesanal em operação digital com escala.",
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

const interceptorFeatureSections: Array<{ title: string; items: string[] }> = [
  {
    title: "Backend",
    items: [
      "CRUD completo para Cliente, Funcionário, Posto, Alocação, Diária, Contrato e Tag.",
      "Cálculos financeiros via Tags com modelo dinâmico (substituindo salário fixo).",
      "Lazy fetching + cache coordenador para queries otimizadas.",
      "Turnos flexíveis com suporte a Comercial, 8h (Alcalá), Folguista e 12h.",
      "Criação em cascata com POST /api/clientes-completos.",
      "Diárias em lote com POST /api/diarias/batch.",
      "Auto-finalização de contratos vencidos ao listar dados.",
      "Fluxo completo de autenticação JWT (registro, login, verificação de e-mail e reset).",
      "Gestão de contas e assinaturas SaaS (FREE, BASIC, PRO).",
      "Notificações SMTP (MailKit) para verificação, reset e alteração de e-mail.",
      "Integração WhatsApp via Meta API para substituição de diárias por chatbot.",
    ],
  },
  {
    title: "Frontend",
    items: [
      "Landing page pública focada em gestão de serviços e facilities.",
      "Design system próprio com tokens CSS, cores semânticas e SVGs otimizados.",
      "Gestão de cache e invalidação reativa baseada em EntityCacheCoordinatorService.",
      "Sidebar desktop colapsável com persistência local de layout.",
      "Padronização visual de formulários, botões e mensagens de erro.",
      "Fluxo completo de autenticação (login, cadastro, esqueci a senha, nova senha e verificação de e-mail).",
      "Dashboard financeiro com análise por período (mensal, trimestral, semestral e anual).",
      "Três modos de visualização de diárias: diário (lista), semanal (kanban) e mensal (calendário).",
      "Dark mode e light mode dinâmicos em todas as telas.",
      "Formulários validados por schema (Zod) com máscaras (ngx-mask).",
      "Auth Guard para rotas protegidas e Auth Interceptor para JWT.",
    ],
  },
  {
    title: "Infraestrutura",
    items: [
      "Docker Compose com 4 serviços: DB, API, Frontend e Nginx.",
      "Hot-reload no backend (dotnet watch) e frontend (ng serve --poll).",
      "Imagem Docker do frontend com npm 11.10.1 atualizado.",
      "CI/CD com GitHub Actions validando backend, frontend e Docker em PRs.",
      "Nginx como reverse proxy para a API.",
      "Estratégia event-driven com invalidação automática de cache via Domain Events (MediatR).",
    ],
  },
];

const juDecoracaoFeatureSections: Array<{ title: string; items: string[] }> = [
  {
    title: "Sobre o Projeto",
    items: [
      "Aplicação full-stack para uma decoradora de Natal com mais de 30 anos de experiência.",
      "Projeto com significado pessoal, criado para digitalizar a arte e o atendimento personalizado da cliente.",
      "Plataforma pensada para credibilidade, apresentação de portfólio e captação automatizada de leads.",
      "Fluxo completo: inspiração do cliente, orçamento, persistência no banco e primeiro contato via WhatsApp.",
    ],
  },
  {
    title: "Funcionalidades Principais",
    items: [
      "Galeria dinâmica com produtos carregados diretamente do Supabase.",
      "Filtros em cascata por tipo de produto, altura, estilo e cores.",
      "Carrossel interativo em modal com navegação por setas e gestos de swipe.",
      "Formulário de orçamento inspirado com pré-preenchimento por referência de produto.",
      "Formulário geral para contato e orçamento de projetos do zero.",
      "Persistência automática de pedidos em PostgreSQL (Supabase).",
      "Seletores em cascata de localização com a API oficial do IBGE.",
      "Automação de WhatsApp com mensagem detalhada após envio do formulário.",
    ],
  },
  {
    title: "Stack e Deploy",
    items: [
      "Framework: Next.js (App Router).",
      "Linguagem: TypeScript.",
      "Backend e banco: Supabase (PostgreSQL).",
      "Estilização: Tailwind CSS.",
      "Animações: Framer Motion.",
      "Deploy: Vercel.",
    ],
  },
];

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
  const projectImagePath =
    project.urlName && project.urlName.trim().length > 0
      ? `/images/projects/${project.urlName}`
      : "/images/projects/default.jpg";

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

            <Box
              sx={{
                width: "100%",
                maxWidth: 980,
                aspectRatio: "16 / 9",
                borderRadius: 3,
                overflow: "hidden",
                position: "relative",
                border: "1px solid rgba(125, 211, 252, 0.2)",
              }}
            >
              <Image
                src={projectImagePath}
                alt={`Imagem do projeto ${project.title}`}
                fill
                sizes="(max-width: 900px) 100vw, 980px"
                quality={76}
                style={{ objectFit: "cover" }}
              />
            </Box>

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

            {project.slug === "interceptorsystem" ? (
              <Stack
                spacing={2.2}
                sx={{
                  p: { xs: 2.2, md: 3 },
                  borderRadius: 3,
                  backgroundColor: "rgba(13, 27, 45, 0.92)",
                  border: "1px solid rgba(125, 211, 252, 0.14)",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ fontWeight: 800, color: "primary.main" }}
                >
                  Status do Produto
                </Typography>
                <Typography sx={{ color: "text.primary", lineHeight: 1.8 }}>
                  Muitas funcionalidades ja estao operacionais em ambiente de
                  desenvolvimento e outras estao em evolucao ativa. O projeto
                  segue roadmap incremental para consolidacao da plataforma
                  SaaS.
                </Typography>

                {interceptorFeatureSections.map((section) => (
                  <Box key={section.title}>
                    <Typography
                      variant="h6"
                      sx={{ mb: 1, fontWeight: 800, color: "secondary.main" }}
                    >
                      {section.title}
                    </Typography>
                    <Stack component="ul" spacing={1.1} sx={{ pl: 2.5, m: 0 }}>
                      {section.items.map((item) => (
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
                ))}
              </Stack>
            ) : null}

            {project.slug === "ju-decoracao-de-natal" ? (
              <Stack
                spacing={2.2}
                sx={{
                  p: { xs: 2.2, md: 3 },
                  borderRadius: 3,
                  backgroundColor: "rgba(13, 27, 45, 0.92)",
                  border: "1px solid rgba(125, 211, 252, 0.14)",
                }}
              >
                {juDecoracaoFeatureSections.map((section) => (
                  <Box key={section.title}>
                    <Typography
                      variant="h6"
                      sx={{ mb: 1, fontWeight: 800, color: "secondary.main" }}
                    >
                      {section.title}
                    </Typography>
                    <Stack component="ul" spacing={1.1} sx={{ pl: 2.5, m: 0 }}>
                      {section.items.map((item) => (
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
                ))}
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
                      minWidth: 220,
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

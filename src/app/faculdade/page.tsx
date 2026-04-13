import type { Metadata } from "next";
import Link from "next/link";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Contact from "@/components/Contact";
import NavBar from "@/components/NavBar";
import { collegeData } from "@/data/portfolioData";

type SemesterTimelineItem = {
  title: string;
  credits: string;
  status: "Concluido" | "Em andamento" | "Proximo";
  subjects: string[];
  highlights?: string[];
};

const semesterTimeline: SemesterTimelineItem[] = [
  {
    title: "01o Semestre",
    credits: "20 creditos",
    status: "Concluido",
    subjects: [
      "SI100 - Algoritmos e Programação de Computadores I (4)",
      "SI102 - Seminários I (2)",
      "TT106 - Organização e Arquitetura de Computadores (4)",
      "TT350 - Administração de Empresas (4)",
      "EB101 - Cálculo I (6)",
    ],
    highlights: [
      "Primeira base sólida em lógica de programação com C, incluindo fundamentos de alocação de memória.",
    ],
  },
  {
    title: "02o Semestre",
    credits: "18 creditos",
    status: "Concluido",
    subjects: [
      "SI305 - Análise de Sistemas de Informação I (4)",
      "ST008 - Metodologia do Trabalho Científico (2)",
      "ST266 - Engenharia de Software I (2)",
      "TT304 - Sistemas Operacionais (4)",
      "SI202 - Resolução de Problemas I (4)",
      "SI203 - Algoritmos e Programação de Computadores I (2)",
    ],
    highlights: [
      "Projeto completo em UML para um sistema de entregas em condomínio, consolidando base de análise e POO.",
      "Experiências práticas com integração de arquivos em Programação II.",
      "Introdução à engenharia de software, do modelo cascata ao ágil.",
      "Estudos aplicados de sistemas operacionais, Docker e trabalho com threads.",
    ],
  },
  {
    title: "03o Semestre",
    credits: "20 creditos",
    status: "Concluido",
    subjects: [
      "SI304 - Engenharia de Software II (4)",
      "SI404 - Interfaces Humano-Computador (2)",
      "ST567 - Banco de Dados I (4)",
      "EB102 - Geometria Analítica e Álgebra Linear (6)",
      "SI300 - Programação Orientada a Objetos I (4)",
    ],
    highlights: [
      "Estruturação de banco de dados conceitual com foco em Entidade-Relacionamento, cardinalidades, relações e chaves.",
      "Aplicação de avaliação heurística e testes de usabilidade no LibreOffice em Interfaces Humano-Computador.",
      "Primeira experiência consolidada em POO com Java 8, em um sistema simulado de gerenciamento de criptomoedas.",
    ],
  },
  {
    title: "04o Semestre",
    credits: "20 creditos",
    status: "Concluido",
    subjects: [
      "ST096 - Ciência, Tecnologia e Sociedade (2)",
      "ST767 - Banco de Dados II (4)",
      "SI201 - Estruturas de Dados I (4)",
      "SI400 - Programação Orientada a Objetos II (4)",
      "SI401 - Programação para a Web (4)",
      "SI406 - Atividades Práticas em Interfaces Humano-Computador (2)",
    ],
    highlights: [
      "Compreensão mais sólida do protocolo HTTP e uso de PHP com stack LAMP, junto de HTML/CSS, para construir um jogo da velha temático do Mario.",
      "Evolução em SQL com criação de bancos, joins, triggers e procedures.",
      "Aprofundamento em estruturas de dados base: lista, pilha, fila e árvore, além de grafos e algoritmo de Dijkstra no nível conceitual.",
      "Em POO, desenvolvimento de um sistema de votacao cliente-servidor conectando varios computadores em rede.",
    ],
  },
  {
    title: "05o Semestre",
    credits: "20 creditos",
    status: "Em andamento",
    subjects: [
      "ST765 - Computacao Grafica (4)",
      "TT060 - Gestão de Projetos (4)",
      "SI405 - Análise de Sistemas de Informação II (4)",
      "SI703 - Governança e Planejamento Estratégico de TI (2)",
      "SI704 - Seminários II (2)",
      "ST568 - Redes de Comunicação I (4)",
    ],
  },
  {
    title: "06o Semestre",
    credits: "26 creditos",
    status: "Proximo",
    subjects: [
      "SI800 - Empreendedorismo e Inovação (2)",
      "SI010 - Estruturas de Dados II (4)",
      "SI600 - Projeto Integrador (2)",
      "SI601 - Estrutura de Arquivos (2)",
      "SI700 - Programação para Dispositivos Móveis (4)",
      "Eletivas (12)",
    ],
  },
  {
    title: "07o Semestre",
    credits: "22 creditos",
    status: "Proximo",
    subjects: [
      "SI919 - Atividades Complementares em Extensão (4)",
      "SI920 - Atividades Complementares (12)",
      "Eletivas (6)",
    ],
  },
];

export const metadata: Metadata = {
  title: "Faculdade | Portfólio",
  description: "Detalhes da minha formação acadêmica na Unicamp.",
};

export default function CollegeDetailPage() {
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
          <Stack spacing={3.2}>
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

            <Stack spacing={1}>
              <Typography
                variant="overline"
                sx={{
                  color: "secondary.main",
                  letterSpacing: 3,
                  fontWeight: 700,
                }}
              >
                Detalhes da formação
              </Typography>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: "2.4rem", md: "4.1rem" },
                  lineHeight: 0.98,
                }}
              >
                {collegeData.institution}
              </Typography>
              <Typography variant="h5" sx={{ color: "text.secondary" }}>
                {collegeData.course}
              </Typography>
              <Typography sx={{ color: "text.secondary" }}>
                Em formação no 5º semestre | previsão de conclusão em 2027 |{" "}
                {collegeData.location}
              </Typography>
            </Stack>

            <Stack
              spacing={2.2}
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
                  Visão geral
                </Typography>
                <Typography sx={{ lineHeight: 1.8 }}>
                  Esta página resume minha evolução acadêmica, os principais
                  conhecimentos consolidados e os projetos mais relevantes da
                  graduação. Abaixo, apresento a linha do tempo por semestre.
                </Typography>
              </Box>

              <Box
                sx={{
                  p: { xs: 1.8, md: 2.2 },
                  borderRadius: 2,
                  backgroundColor: "rgba(125,211,252,0.08)",
                  border: "1px solid rgba(125,211,252,0.2)",
                }}
              >
                <Stack spacing={1.3}>
                  <Typography sx={{ fontWeight: 800, color: "primary.main" }}>
                    Resumo da jornada
                  </Typography>

                  <Box>
                    <Typography sx={{ fontWeight: 700, mb: 0.6 }}>
                      Conhecimentos gerais aprendidos
                    </Typography>
                    <Stack component="ul" spacing={0.7} sx={{ m: 0, pl: 2.5 }}>
                      <Typography
                        component="li"
                        sx={{ color: "text.secondary" }}
                      >
                        Lógica de programação, estruturas de dados e fundamentos
                        de memória na linguagem C.
                      </Typography>
                      <Typography
                        component="li"
                        sx={{ color: "text.secondary" }}
                      >
                        Programação orientada a objetos, UML e análise/modelagem
                        de sistemas.
                      </Typography>
                      <Typography
                        component="li"
                        sx={{ color: "text.secondary" }}
                      >
                        Engenharia de software do modelo cascata ao ágil, com
                        foco em processo, qualidade e entrega.
                      </Typography>
                      <Typography
                        component="li"
                        sx={{ color: "text.secondary" }}
                      >
                        Banco de dados, sistemas operacionais, redes,
                        desenvolvimento web e governança de TI.
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography sx={{ fontWeight: 700, mb: 0.6 }}>
                      Projetos principais no curso
                    </Typography>
                    <Stack component="ul" spacing={0.7} sx={{ m: 0, pl: 2.5 }}>
                      <Typography
                        component="li"
                        sx={{ color: "text.secondary" }}
                      >
                        SI401 (Programação para Web): desenvolvimento de um Jogo
                        da Memória com foco em front-end e lógica de jogo.
                      </Typography>
                      <Typography
                        component="li"
                        sx={{ color: "text.secondary" }}
                      >
                        SI203 (Prog II): Gerenciador de Credenciais com foco em
                        estrutura de dados, persistência e robustez.
                      </Typography>
                      <Typography
                        component="li"
                        sx={{ color: "text.secondary" }}
                      >
                        Sistemas Operacionais (threads): implementação de
                        Mergesort paralelo para estudo de concorrência e
                        desempenho.
                      </Typography>
                    </Stack>
                  </Box>

                  <Box>
                    <Typography sx={{ fontWeight: 700, mb: 0.8 }}>
                      Links de projeto e materiais
                    </Typography>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      spacing={1}
                      sx={{
                        flexWrap: "wrap",
                        rowGap: 1.2,
                        "& .MuiButton-root": {
                          minHeight: 44,
                          px: 1.8,
                        },
                      }}
                    >
                      <Button
                        href="https://github.com/JPCalsavara/SI401-JogoDaMemoria"
                        target="_blank"
                        rel="noreferrer"
                        variant="outlined"
                        color="secondary"
                      >
                        SI401 - Projeto Web
                      </Button>
                      <Button
                        href="https://github.com/JPCalsavara/gerenciador-credenciais"
                        target="_blank"
                        rel="noreferrer"
                        variant="outlined"
                        color="secondary"
                      >
                        SI203 - Prog II
                      </Button>
                      <Button
                        href="https://github.com/JPCalsavara/mergesort"
                        target="_blank"
                        rel="noreferrer"
                        variant="outlined"
                        color="secondary"
                      >
                        SO - Threads
                      </Button>
                      <Button
                        href="https://github.com/gabreisdev/projeto_si300"
                        target="_blank"
                        rel="noreferrer"
                        variant="outlined"
                        color="secondary"
                      >
                        SI300 - Projeto
                      </Button>
                      <Button
                        href="https://github.com/gabreisdev/SI400"
                        target="_blank"
                        rel="noreferrer"
                        variant="outlined"
                        color="secondary"
                      >
                        SI400 - Projeto
                      </Button>
                      <Button
                        href="/files/DocTrabalhoPr%C3%A1ticoSI203.pdf"
                        target="_blank"
                        rel="noreferrer"
                        variant="outlined"
                        color="secondary"
                      >
                        Análise I - Trabalho Prático
                      </Button>
                      <Button
                        href="/files/Doc_Avaliacao_de_Filmes.pdf"
                        target="_blank"
                        rel="noreferrer"
                        variant="outlined"
                        color="secondary"
                      >
                        BD1 - Doc Avaliação
                      </Button>
                    </Stack>
                    <Typography
                      sx={{ color: "text.secondary", mt: 1, lineHeight: 1.7 }}
                    >
                      Em Banco de Dados I, o documento de avaliação marcou o
                      início de uma compreensão mais profunda sobre modelagem
                      conceitual e modelo Entidade-Relacionamento (ME-R).
                    </Typography>
                  </Box>
                </Stack>
              </Box>

              <Stack
                spacing={2.2}
                sx={{ position: "relative", pl: { xs: 1.5, md: 2 } }}
              >
                {semesterTimeline.map((item) => (
                  <Stack
                    key={item.title}
                    spacing={1.2}
                    sx={{
                      position: "relative",
                      pl: { xs: 2.8, md: 3.4 },
                      pb: 1.8,
                      borderLeft: "1px solid rgba(125,211,252,0.25)",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        left: { xs: -6, md: -7 },
                        top: 7,
                        width: 12,
                        height: 12,
                        borderRadius: 999,
                        backgroundColor:
                          item.status === "Concluido"
                            ? "#22C55E"
                            : item.status === "Em andamento"
                              ? "#38BDF8"
                              : "#94A3B8",
                      }}
                    />

                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      sx={{ gap: 1 }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 800 }}>
                        {item.title}
                      </Typography>
                      <Typography sx={{ color: "text.secondary" }}>
                        {item.credits} | {item.status}
                      </Typography>
                    </Stack>

                    <Stack component="ul" spacing={0.8} sx={{ m: 0, pl: 2.5 }}>
                      {item.subjects.map((subject) => (
                        <Typography
                          component="li"
                          key={subject}
                          sx={{ lineHeight: 1.65 }}
                        >
                          {subject}
                        </Typography>
                      ))}
                    </Stack>

                    {item.highlights ? (
                      <Box
                        sx={{
                          p: 1.4,
                          borderRadius: 2,
                          backgroundColor: "rgba(125,211,252,0.08)",
                          border: "1px solid rgba(125,211,252,0.2)",
                        }}
                      >
                        <Typography sx={{ fontWeight: 700, mb: 0.8 }}>
                          Relevância técnica
                        </Typography>
                        <Stack
                          component="ul"
                          spacing={0.7}
                          sx={{ m: 0, pl: 2.5 }}
                        >
                          {item.highlights.map((highlight) => (
                            <Typography
                              component="li"
                              key={highlight}
                              sx={{ color: "text.secondary", lineHeight: 1.65 }}
                            >
                              {highlight}
                            </Typography>
                          ))}
                        </Stack>
                      </Box>
                    ) : null}
                  </Stack>
                ))}
              </Stack>

              <Typography sx={{ color: "text.secondary", fontStyle: "italic" }}>
                Nota: o arquivo do projeto de Análise e o link do projeto de
                Sistemas Operacionais serão adicionados em seguida.
              </Typography>
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

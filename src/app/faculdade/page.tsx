import type { Metadata } from "next";
import Link from "next/link";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";
import GitHubIcon from "@mui/icons-material/GitHub";
import Contact from "@/components/Contact";
import NavBar from "@/components/NavBar";
import { collegeData } from "@/data/portfolioData";
import styles from "./faculdade.module.scss";

type SemesterTimelineItem = {
  title: string;
  credits: string;
  status: "Concluído" | "Em andamento" | "Próximo";
  subjects: string[];
  highlights?: string[];
};

const semesterTimeline: SemesterTimelineItem[] = [
  {
    title: "1º Semestre",
    credits: "20 créditos",
    status: "Concluído",
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
    title: "2º Semestre",
    credits: "18 créditos",
    status: "Concluído",
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
    title: "3º Semestre",
    credits: "20 créditos",
    status: "Concluído",
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
    title: "4º Semestre",
    credits: "20 créditos",
    status: "Concluído",
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
      "Em POO, desenvolvimento de um sistema de votação cliente-servidor conectando vários computadores em rede.",
    ],
  },
  {
    title: "5º Semestre",
    credits: "20 créditos",
    status: "Em andamento",
    subjects: [
      "ST765 - Computação Gráfica (4)",
      "TT060 - Gestão de Projetos (4)",
      "SI405 - Análise de Sistemas de Informação II (4)",
      "SI703 - Governança e Planejamento Estratégico de TI (2)",
      "SI704 - Seminários II (2)",
      "ST568 - Redes de Comunicação I (4)",
    ],
  },
  {
    title: "6º Semestre",
    credits: "26 créditos",
    status: "Próximo",
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
    title: "7º Semestre",
    credits: "22 créditos",
    status: "Próximo",
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

function parseSubject(raw: string) {
  const match = raw.match(/^([A-Z0-9]+)\s*-\s*(.+?)(?:\s*\((\d+)\))?$/);
  if (match) {
    return {
      code: match[1],
      name: match[2],
      credits: match[3] ? `${match[3]}\u00A0cr` : undefined,
    };
  }
  const electiveMatch = raw.match(/^(.+?)(?:\s*\((\d+)\))?$/);
  return {
    code: "DISC",
    name: electiveMatch ? electiveMatch[1] : raw,
    credits: electiveMatch && electiveMatch[2] ? `${electiveMatch[2]}\u00A0cr` : undefined,
  };
}

export default function CollegeDetailPage() {
  return (
    <div className={styles.pageWrapper}>
      <NavBar />

      <main className={styles.mainSection}>
        <div className={styles.container}>
          <Link href="/" className={styles.backButton}>
            <ArrowBackRoundedIcon fontSize="small" />
            <span>Voltar para página principal</span>
          </Link>

          <header className={styles.headerBlock}>
            <span className={styles.overline}>Detalhes da formação</span>
            <h1 className={styles.mainTitle}>{collegeData.institution}</h1>
            <h2 className={styles.subTitle}>{collegeData.course}</h2>
            <div className={styles.metaInfo}>
              <span className={styles.metaBadgeActive}>5º Semestre (Em andamento)</span>
              <span className={styles.metaBadge}>Previsão: 2027</span>
              <span className={styles.metaBadge}>{collegeData.location}</span>
            </div>
          </header>

          <section className={styles.overviewCard}>
            <h3 className={styles.sectionHeading}>Visão Geral</h3>
            <p className={styles.paragraph}>
              Esta página resume minha evolução acadêmica, os principais conhecimentos
              consolidados e os projetos mais relevantes da graduação. Abaixo, apresento a
              linha do tempo detalhada por semestre.
            </p>

            <div className={styles.highlightsPanel}>
              <h4 className={styles.panelTitle}>Resumo da Jornada</h4>
              <ul className={styles.customList}>
                <li>
                  Lógica de programação, estruturas de dados e fundamentos de memória na
                  linguagem C.
                </li>
                <li>
                  Programação orientada a objetos, UML e análise/modelagem de sistemas.
                </li>
                <li>
                  Engenharia de software do modelo cascata ao ágil, com foco em processo,
                  qualidade e entrega.
                </li>
                <li>
                  Banco de dados, sistemas operacionais, redes, desenvolvimento web e
                  governança de TI.
                </li>
              </ul>
            </div>

            <div className={styles.highlightsPanel}>
              <h4 className={styles.panelTitle}>Projetos Principais no Curso</h4>
              <ul className={styles.customList}>
                <li>
                  <strong>SI401 (Programação para Web):</strong> desenvolvimento de um Jogo da
                  Memória com foco em front-end e lógica de jogo.
                </li>
                <li>
                  <strong>SI203 (Prog II):</strong> Gerenciador de Credenciais com foco em
                  estrutura de dados, persistência e robustez.
                </li>
                <li>
                  <strong>Sistemas Operacionais (threads):</strong> implementação de Mergesort
                  paralelo para estudo de concorrência e desempenho.
                </li>
              </ul>
            </div>

            <div className={styles.highlightsPanel}>
              <h4 className={styles.panelTitle}>Links de Projeto e Materiais</h4>
              <div className={styles.linksGrid}>
                <a
                  href="https://github.com/JPCalsavara/SI401-JogoDaMemoria"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkPill}
                >
                  <GitHubIcon fontSize="inherit" />
                  <span>SI401 - Projeto Web</span>
                  <OpenInNewRoundedIcon fontSize="inherit" />
                </a>

                <a
                  href="https://github.com/JPCalsavara/gerenciador-credenciais"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkPill}
                >
                  <GitHubIcon fontSize="inherit" />
                  <span>SI203 - Prog II</span>
                  <OpenInNewRoundedIcon fontSize="inherit" />
                </a>

                <a
                  href="https://github.com/JPCalsavara/mergesort"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkPill}
                >
                  <GitHubIcon fontSize="inherit" />
                  <span>SO - Threads</span>
                  <OpenInNewRoundedIcon fontSize="inherit" />
                </a>

                <a
                  href="https://github.com/gabreisdev/projeto_si300"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkPill}
                >
                  <GitHubIcon fontSize="inherit" />
                  <span>SI300 - Projeto</span>
                  <OpenInNewRoundedIcon fontSize="inherit" />
                </a>

                <a
                  href="https://github.com/gabreisdev/SI400"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkPill}
                >
                  <GitHubIcon fontSize="inherit" />
                  <span>SI400 - Projeto</span>
                  <OpenInNewRoundedIcon fontSize="inherit" />
                </a>

                <a
                  href="/files/DocTrabalhoPr%C3%A1ticoSI203.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkPill}
                >
                  <PictureAsPdfRoundedIcon fontSize="inherit" />
                  <span>Análise I - Trabalho Prático</span>
                  <OpenInNewRoundedIcon fontSize="inherit" />
                </a>

                <a
                  href="/files/Doc_Avaliacao_de_Filmes.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className={styles.linkPill}
                >
                  <PictureAsPdfRoundedIcon fontSize="inherit" />
                  <span>BD1 - Doc Avaliação</span>
                  <OpenInNewRoundedIcon fontSize="inherit" />
                </a>
              </div>
              <p className={`${styles.paragraph} ${styles.mt12}`}>
                Em Banco de Dados I, o documento de avaliação marcou o início de uma
                compreensão mais profunda sobre modelagem conceitual e modelo
                Entidade-Relacionamento (ME-R).
              </p>
            </div>
          </section>

          <section className={styles.timelineSection}>
            <h3 className={styles.timelineHeading}>Linha do Tempo por Semestre</h3>

            <div className={styles.timelineWrapper}>
              {semesterTimeline.map((item) => {
                const isCurrent = item.status === "Em andamento";
                const isDone = item.status === "Concluído";

                const nodeClass = isDone
                  ? styles.nodeCompleted
                  : isCurrent
                    ? styles.nodeInProgress
                    : styles.nodeUpcoming;

                const statusClass = isDone
                  ? styles.statusCompleted
                  : isCurrent
                    ? styles.statusInProgress
                    : styles.statusUpcoming;

                return (
                  <article
                    key={item.title}
                    className={`${styles.timelineItem} ${isCurrent ? styles.cardActiveSemester : ""}`}
                  >
                    <div className={`${styles.timelineNode} ${nodeClass}`} />

                    <div className={styles.semesterCard}>
                      <header className={styles.semesterHeader}>
                        <div className={styles.semesterTitleGroup}>
                          <span className={styles.semesterOrdinal}>{item.title}</span>
                          <span className={`${styles.semesterStatusPill} ${statusClass}`}>
                            {item.status}
                          </span>
                        </div>
                        <span className={styles.creditsPill}>{item.credits}</span>
                      </header>

                      <ul className={styles.subjectsList}>
                        {item.subjects.map((sub) => {
                          const parsed = parseSubject(sub);
                          return (
                            <li key={sub} className={styles.subjectItem}>
                              <span className={styles.subjectCode}>{parsed.code}</span>
                              <span className={styles.subjectName}>{parsed.name}</span>
                              {parsed.credits && (
                                <span className={styles.subjectCredits}>{parsed.credits}</span>
                              )}
                            </li>
                          );
                        })}
                      </ul>

                      {item.highlights && (
                        <div className={styles.technicalHighlights}>
                          <h5>Relevância Técnica</h5>
                          <ul>
                            {item.highlights.map((h) => (
                              <li key={h}>{h}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            <p className={styles.footerNote}>
              Nota: o arquivo do projeto de Análise e o link do projeto de Sistemas
              Operacionais serão adicionados em seguida.
            </p>
          </section>
        </div>
      </main>

      <Contact />

      <footer className={styles.footer}>
        <div className={styles.container}>
          <span>João Calsavara - Portfólio</span>
        </div>
      </footer>
    </div>
  );
}

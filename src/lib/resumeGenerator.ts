import type {
  CollegeDetailData,
  CvConfig,
  ExperienceCardData,
  ProfileData,
  SkillCardData,
} from "@/data/portfolioData";

export function escapeLatex(text: string): string {
  if (!text) return "";
  return text
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([&%$#_{}])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}

export function generateResumeTex(
  profile: ProfileData,
  experiences: ExperienceCardData[],
  skills: SkillCardData[],
  college: CollegeDetailData,
  cv: CvConfig,
  socialLinks: Record<string, string> = {},
): string {
  const isEn = cv.targetMarket === "en";

  const leadershipTitle = isEn ? "Leadership Activities" : "Atividades de Liderança";
  const experienceTitle = isEn ? "Experience" : "Experiência";
  const skillsTitle = isEn ? "Skills" : "Habilidades";
  const educationTitle = isEn ? "Education" : "Educação";
  const langKey = isEn ? "english" : "portuguese";

  // Filter tech skills by category or list
  const techSkills = skills
    .slice(0, 18)
    .map((s) => s.label || s.name)
    .join(", ");

  const email = profile.email || "seu.email@exemplo.com";
  const linkedin = socialLinks.linkedin || "https://linkedin.com/in/usuario";
  const github = socialLinks.github || "https://github.com/usuario";

  // Distinguish leadership vs regular experiences
  const leadershipExps = experiences.filter(
    (e) =>
      e.role?.toLowerCase().includes("fundador") ||
      e.role?.toLowerCase().includes("lider") ||
      e.role?.toLowerCase().includes("founder") ||
      e.role?.toLowerCase().includes("co-founder"),
  );

  const regularExps = experiences.filter(
    (e) => !leadershipExps.includes(e),
  );

  function renderExpItems(exps: ExperienceCardData[]) {
    return exps
      .map((e) => {
        const title = escapeLatex(e.title);
        const loc = escapeLatex(e.location || "Remoto");
        const role = escapeLatex(e.role || "Desenvolvedor");
        const period = escapeLatex(e.period || "2024 - Atual");

        const bullets: string[] = [];
        if (e.summary) {
          bullets.push(escapeLatex(e.summary));
        }
        if (e.achievements && e.achievements.length > 0) {
          e.achievements.forEach((ach) => bullets.push(escapeLatex(ach)));
        }

        const itemsBlock = bullets
          .slice(0, 3)
          .map((b) => `            \\item ${b}`)
          .join("\n");

        return `    \\cventry{${title}}{${loc}}{${role}}{${period}}
        \\begin{itemize}
${itemsBlock}
        \\end{itemize}`;
      })
      .join("\n\n");
  }

  return `% Generated automatically by DevFolio
\\documentclass[a4paper,10pt]{article}

% --- PACOTES: BASE / IDIOMA ---
\\usepackage[utf8]{inputenc}
\\usepackage[T1]{fontenc}
\\usepackage[${langKey}]{babel}

% --- PACOTES: LAYOUT / TIPOGRAFIA ---
\\usepackage{geometry}
\\usepackage{parskip}
\\usepackage{microtype}
\\usepackage{enumitem}
\\usepackage{titlesec}
\\usepackage{array}
\\usepackage{tabularx}

% --- PACOTES: LINKS / BOOKMARKS ---
\\usepackage{hyperref}
\\usepackage{bookmark}
\\usepackage{xurl}

% --- CONFIGURAÇÃO: MARGENS / ESPAÇAMENTO ---
\\geometry{top=1.5cm, bottom=1.5cm, left=1.5cm, right=1.5cm}
\\setcounter{secnumdepth}{0}
\\setlist[itemize]{
    leftmargin=0.75em,
    itemsep=0.2em,
    topsep=0.25em,
    parsep=0em,
    partopsep=0em
}

\\pagestyle{empty}

% --- CONFIGURAÇÃO: METADADOS / LINKS ---
\\hypersetup{
    pdftitle={CV ${escapeLatex(profile.name)}},
    pdfauthor={${escapeLatex(profile.name)}},
    colorlinks=true,
    linkcolor=black,
    urlcolor=black,
    citecolor=black,
    bookmarksdepth=2
}

% --- CONFIGURAÇÃO: TÍTULOS ---
\\titleformat{\\section}
{\\Large\\bfseries}
{}
{0em}
{}
[\\titlerule\\vspace{0.5ex}]
\\titleformat{\\subsection}
{\\normalsize\\bfseries}
{}
{0em}
{}
\\titlespacing*{\\subsection}{0pt}{0.35em}{0.15em}

% Macro para entradas do currículo com bookmark no PDF
\\newcounter{cventry}
\\newcommand{\\cventry}[4]{%
    \\refstepcounter{cventry}%
    \\phantomsection%
    \\pdfbookmark[2]{#1}{cventry-\\thecventry}%
    \\noindent\\begin{tabularx}{\\textwidth}{@{}>{\\raggedright\\arraybackslash}X >{\\raggedleft\\arraybackslash}X@{}}
    \\textbf{#1} & #2 \\\\
    \\textit{#3} & \\textit{#4} \\\\
    \\end{tabularx}
}

\\begin{document}

% --- CABEÇALHO ---
\\begin{center}
    {\\LARGE \\textbf{${escapeLatex(profile.name)}}} 
    \\\\ [0.1cm]
    ${escapeLatex(profile.location || "Brasil")}
    {\\textbullet}
    \\href{mailto:${email}}{${email}} 
    {\\textbullet}
    \\href{${linkedin}}{LinkedIn} 
    {\\textbullet}
    \\href{${github}}{GitHub}
\\end{center}

% --- EDUCAÇÃO ---
\\section{${educationTitle}}
    \\cventry{${escapeLatex(college.institution)}}{${escapeLatex(college.location)}}{${escapeLatex(college.course)}}{${escapeLatex(college.period)}}

${
  leadershipExps.length > 0
    ? `% --- LIDERANÇA ---
\\section{${leadershipTitle}}
${renderExpItems(leadershipExps)}
`
    : ""
}
% --- EXPERIÊNCIA ---
\\section{${experienceTitle}}
${renderExpItems(regularExps)}

% --- HABILIDADES ---
\\section{${skillsTitle}}
    \\begin{itemize}
        \\item \\textbf{${isEn ? "Technical Skills:" : "Técnicas:"}} ${escapeLatex(techSkills)}
        \\item \\textbf{${isEn ? "Languages:" : "Idiomas:"}} ${isEn ? "Portuguese (Native), English (Professional)" : "Português (Nativo), Inglês (Intermediário/Avançado)"}
    \\end{itemize}

\\end{document}
`;
}

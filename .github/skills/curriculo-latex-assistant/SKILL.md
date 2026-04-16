---
name: curriculo-latex-assistant
description: Assistente para criar e revisar curriculos LaTeX com base no resume-template (PT-BR/EN), com fluxo sem codigo via Prism e validacao de conteudo para mercado alvo.
user-invocable: true
allowed-tools: "Read, Write, Edit, Bash, Glob, Grep"
---

# Curriculo LaTeX Assistant

Use este skill quando o usuario quiser criar, revisar ou adaptar curriculo a partir do `resume-template`.

Arquivos de referencia:

- `resume-template/resumes/pt-br/curriculo.tex`
- `resume-template/resumes/en/resume.tex`
- `resume-template/resumes/pt-br/README.md`
- `resume-template/prompts/prompt_pt-br.md`

## Objetivo

- Transformar dados brutos (CV atual, LinkedIn, portfolio) em conteudo pronto no template LaTeX.
- Preservar estrutura tecnica do template (`\\cventry`, secoes, estilo) sem quebrar compilacao.
- Melhorar qualidade textual com foco no mercado alvo (Brasil ou internacional).

## Fluxo de trabalho

1. Confirmar versao desejada: `pt-br` ou `en`.
2. Ler o arquivo base do template correspondente.
3. Mapear os dados do usuario para as secoes do template:
   - Cabecalho
   - Atividades de Lideranca
   - Experiencia
   - Habilidades
   - Educacao
4. Reescrever bullets com verbos de acao e impacto mensuravel (metodo STAR implicito).
5. Validar consistencia final:
   - datas
   - cargo e escopo
   - tecnologias
   - links e contato
6. Entregar resultado em dois formatos:
   - alteracao aplicada no `.tex` (quando solicitado)
   - resumo textual para revisao rapida

## Guia para usuario nao tecnico (Prism)

Quando o usuario pedir modo simples, orientar assim:

1. Copie todo o conteudo de `resume-template/resumes/pt-br/curriculo.tex`.
2. Acesse `prism.openai.com`.
3. Crie um arquivo e cole o conteudo.
4. Envie seus dados (CV atual, LinkedIn, experiencias) e peca para ajustar o texto sem alterar a estrutura LaTeX.
5. Revise e baixe o PDF.

Alternativa para quem usa GitHub:

- Commits no repositorio podem gerar PDF automaticamente via workflow em `.github/workflows/build.yml`.

## Regras de qualidade

- Priorizar clareza, especificidade e impacto (evitar texto generico).
- Usar verbos de acao e, quando possivel, metricas concretas.
- Preservar coerencia de tempo verbal, formato de datas e terminologia.
- Nao inventar certificacoes, cargos, metricas ou tecnologias nao confirmadas.
- Recomendar foto apenas se o usuario insistir; por padrao, manter sem foto (boas praticas ATS do template).
- Para primeiro emprego/estagio, sugerir mover `Educacao` para o topo, conforme comentario no `.tex`.

## Guardrails tecnicos do template

- Nao remover pacotes e configuracoes base sem necessidade.
- Nao quebrar a macro `\\cventry{...}{...}{...}{...}`.
- Manter listas `itemize` com bullets curtos e objetivos.
- Evitar caracteres que possam quebrar compilacao LaTeX sem escape adequado.

## Entrada esperada do usuario

- Mercado alvo (`brasileiro` ou `internacional`)
- Nivel e cargo desejado
- Experiencias com contexto, acao e resultado
- Formacao academica
- Habilidades tecnicas e idiomas
- Links (LinkedIn, GitHub, portfolio)

## Formato de saida esperado

- `Resumo das alteracoes`
- `Trechos revisados por secao`
- `Pendencias para confirmar`
- `Checklist final (ok/pendente)`

Checklist minimo:

- Nome e contatos corretos
- Mercado alvo refletido na linguagem
- Bullets com acao e impacto
- Datas e ordem cronologica consistentes
- Habilidades alinhadas a vaga alvo

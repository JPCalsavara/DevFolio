---
name: preencher-staging-markdown
description: Preenche os markdowns de staging (projetos, experiencias e habilidades) a partir de dados brutos do usuario, mantendo padrao consistente para publicacao.
user-invocable: true
allowed-tools: "Read, Write, Edit, Bash, Glob, Grep"
---

# Preencher Staging Markdown

Use este skill para transformar conteudo bruto em arquivos markdown prontos em `content-staging`.

## Escopo

- Projetos: `content-staging/projects/*.md`
- Experiencias: `content-staging/experiences/*.md`
- Habilidades: `content-staging/habilidades/*.md`
- Templates base:
  - `content-staging/markdown/project-template.md`
  - `content-staging/markdown/experience-template.md`
  - `content-staging/markdown/habilidade-template.md`

## Fluxo de trabalho

1. Ler os templates e extrair campos obrigatorios.
2. Mapear dados fornecidos pelo usuario para os campos.
3. Criar/atualizar arquivos markdown com frontmatter e secoes coerentes.
4. Garantir padrao de nomes (`slug`, datas, tags, links, caminhos de imagens).
5. Reportar lacunas antes de publicar (campos faltando ou ambiguos).

## Regras de preenchimento

- Manter texto em portugues, objetivo e acionavel.
- Nao inventar dados ausentes; marcar como `PENDENTE` quando necessario.
- Preservar limite de tamanho quando houver regra de label curta.
- Para experiencias e projetos, manter narrativa orientada a contexto, acao e resultado.

## Validacoes obrigatorias

- Slug unico por arquivo.
- Campos obrigatorios presentes.
- Caminhos de imagem existentes ou marcados como pendentes.
- Consistencia de stack/tecnologias entre secoes.

## Saida esperada

- Lista dos arquivos criados/alterados.
- Campos pendentes para revisao humana.
- Resumo curto do conteudo preparado para ingestao.

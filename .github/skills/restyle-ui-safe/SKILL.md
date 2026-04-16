---
name: restyle-ui-safe
description: Ajusta estetica da interface (tipografia, cores, composicao e animacoes) preservando a logica, dados e comportamento funcional do portfolio.
user-invocable: true
allowed-tools: "Read, Write, Edit, Bash, Glob, Grep"
---

# Restyle UI Safe

Use este skill para evoluir design visual sem quebrar fluxo funcional.

## Objetivo

- Melhorar estilo e identidade visual.
- Manter logica existente funcionando (rotas, carregamento de dados, CRUD, filtros e acessibilidade basica).

## Escopo recomendado

- `src/theme/theme.ts`
- `src/app/globals.css`
- componentes de layout/visual (`Hero`, `NavBar`, `Projects`, `Experience`, etc.)

## Guardrails obrigatorios

1. Nao alterar contratos de dados (`src/lib/portfolio.ts`, tipos e slugs) sem necessidade.
2. Nao remover interacoes principais da UI.
3. Preservar responsividade (mobile e desktop).
4. Executar validacao com lint/build apos alteracoes visuais.
5. Se houver mudanca estrutural grande, aplicar em etapas pequenas e verificaveis.

## Direcao de design

- Definir variaveis semanticas de cor.
- Escolher tipografia com personalidade (evitar visual generico).
- Usar gradientes/padroes de fundo com moderacao.
- Aplicar animacoes com intencao, sem excesso.

## Saida esperada

- Lista dos arquivos visuais alterados.
- O que mudou no sistema de estilo (cores, fontes, componentes).
- Garantia explicita de que a logica foi preservada.
- Resultado de validacao (lint/build).

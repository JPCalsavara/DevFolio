# Task Plan: Onboarding/Intro Landing Page

## Objetivo
Criar uma página oculta (ex: `/intro` ou `/help`) que atue como um guia visual e interativo (landing page de onboarding) para desenvolvedores que clonaram este repositório de template de portfólio. A página deve explicar o fluxo ponta a ponta: extração de dados via IA, estruturação do Supabase, rodar o Next.js e configurar o projeto.

## Fases

- [x] **Fase 1: Contexto e Planejamento**
  - Mapear os requisitos da página de introdução.
  - Estruturar o conteúdo explicativo (Setup Supabase, AI Intake, Deploy).
  - Criar arquivos de persistência do fluxo.

- [x] **Fase 2: Desenvolvimento da UI (`/intro`)**
  - Criar rota `src/app/intro/page.tsx`.
  - Construir Hero Section focado em "Como configurar seu Portfólio IA".
  - Construir seção explicativa do fluxo (PDF -> JSON -> Next.js -> Supabase).
  - Adicionar cards visuais ou placeholders para vídeos/imagens do template.

- [x] **Fase 3: Limpeza e Refatoração**
  - Avaliar se `/gerador-cv` ainda faz sentido ou se devemos fundir as rotas/remover o que não for mais necessário baseado no feedback do usuário.

- [ ] **Fase 4: Validação e Build**
  - Testar compilação do Next.js.
  - Ajustar responsividade da página de intro.

- [ ] **Fase 5: Pull Request / Conclusão**
  - Commitar as mudanças usando conventional commits.

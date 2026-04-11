# Task Plan: Evolução visual do portfolio em Next.js com MUI

## Goal

Evoluir o portfolio atual em Next.js com Material-UI para uma versão mais forte visualmente, com tons de azul, nova tipografia, apresentação em tela cheia na primeira dobra e suporte a páginas detalhadas de projeto.

## Current Phase

Phase 9 - **IN PROGRESS**

## Phases

### Phase 1: Requirements & Discovery

- [x] Entender requisitos do usuário
- [x] Escolher biblioteca CSS (MUI)
- [x] Definir estética visual (Dark + Neon)
- [x] Escolher Next.js features (App Router + Server Components)
- [x] Documentar tudo em findings.md
- **Status:** ✅ complete

### Phase 2: Setup & Configuration

- [x] Criar novo projeto Next.js 14+
- [x] Instalar MUI e dependências
- [x] Configurar tema Dark+Neon personalizado
- [x] Migrar componentes antigos
- [x] Estruturar páginas com App Router
- **Status:** ✅ complete

### Phase 3: Extração de Dados do CV

- [ ] Analisar informações do CV (nome, skills, experiências, projetos)
- [ ] Criar arquivo de dados estruturado (JSON/TS)
- [ ] Integrar dados no portfólio
- **Status:** pending

### Phase 4: Desenvolvimento de Componentes

- [ ] Hero section com nome + título
- [ ] Seção de experiências
- [ ] Seção de skills com tags
- [ ] Seção de projetos
- [ ] Seção de contato
- [ ] Navegação + responsividade
- **Status:** pending

### Phase 5: Tema Dark+Neon & Estilo

- [ ] Criar paleta de cores (neon + dark)
- [ ] Configurar tipografia
- [ ] Aplicar efeitos visuais (gradientes, destaques)
- [ ] Animações sutis
- **Status:** pending

### Phase 6: Redesign Visual Azul

- [ ] Trocar a paleta atual por tons de azul mais sofisticados
- [ ] Revisar contraste, hierarquia e estados de hover
- [ ] Definir uma nova tipografia mais adequada ao tom do site
- [ ] Padronizar botões, cards e fundos com identidade visual coerente
- **Status:** pending

### Phase 7: Presentation Full Screen

- [ ] Fazer a apresentação ocupar toda a primeira dobra
- [ ] Criar entrada mais impactante com CTA claro
- [ ] Ajustar espaçamento e rolagem para introduzir o restante do site
- [ ] Garantir responsividade mobile sem perder impacto visual
- **Status:** pending

### Phase 8: Página detalhada de projetos

- [ ] Criar rota individual para projetos
- [ ] Exibir contexto, stack, resultados e links por projeto
- [ ] Destacar projetos principais com mais conteúdo
- [ ] Melhorar a navegação entre vitrine e detalhes
- **Status:** pending

### Phase 9: Otimizações Next.js

- [ ] Server Components onde apropriado
- [ ] Image optimization
- [ ] SEO (metadata)
- [ ] Static generation ou ISR
- **Status:** pending

### Phase 10: Sistema de Admin - Supabase

- [x] Setup Supabase (Auth + Database)
- [x] Criar tabelas (projects, technologies, experiences)
- [x] Implementar autenticação
- [x] Criar página /admin com proteção
- [x] Componentes CRUD para cada entidade
- [ ] Integrar dados em tempo real no portfólio
- **Status:** in_progress

### Phase 11: Testes & Deploy

- [ ] Teste responsividade (desktop/mobile)
- [ ] Teste autenticação Supabase
- [ ] Teste CRUD operations
- [ ] Teste performance
- [ ] Build e verificação
- [ ] Deploy (Vercel + Supabase)
- **Status:** pending

## Decisions Made

| Decision                 | Rationale                                                     |
| ------------------------ | ------------------------------------------------------------- |
| Material-UI (MUI)        | Componentes robustos, customização completa, temas integrados |
| Dark + Neon Theme        | Moderno, profissional com criatividade, atrai olhar           |
| App Router               | Melhor performance, Server Components, futuro do Next.js      |
| Foco Dev                 | Destaque tecnologias, projetos, skills técnicas               |
| src_legacy_vite          | Preserva a versão antiga para consulta sem bloquear o build   |
| Azul como cor base       | Deixa o visual mais profissional, técnico e consistente       |
| Presentation full screen | Cria uma primeira impressão forte e mais premium              |
| Projeto detalhado        | Ajuda a contar contexto, impacto e stack de cada case         |

## Errors Encountered

| Error          | Resolution |
| -------------- | ---------- |
| (nenhum ainda) | -          |

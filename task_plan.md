# Task Plan: Evolução visual do portfolio em Next.js com MUI

## Goal

Evoluir o portfolio atual em Next.js com Material-UI para uma versão mais forte visualmente, com tons de azul, nova tipografia, apresentação em tela cheia na primeira dobra e suporte a páginas detalhadas de projeto. **Adicionalmente: unificar skills do agente, configurar Cypress para testes E2E e orquestrar a transição de dados para Supabase usando extração de currículo via LaTeX/markdown.**

## Current Phase

Phase 15 - **IN PROGRESS**

## Phases

### Phase 6: Redesign Visual Azul
- [ ] Trocar a paleta atual por tons de azul mais sofisticados
- [ ] Revisar contraste, hierarquia e estados de hover
- [ ] Definir uma nova tipografia mais adequada ao tom do site
- [ ] Padronizar botões, cards e fundos com identidade visual coerente
- **Status:** ✅ complete

### Phase 7: Presentation Full Screen
- [ ] Fazer a apresentação ocupar toda a primeira dobra
- [ ] Criar entrada mais impactante com CTA claro
- [ ] Ajustar espaçamento e rolagem para introduzir o restante do site
- [ ] Garantir responsividade mobile sem perder impacto visual
- **Status:** ✅ complete

### Phase 8: Página detalhada de projetos
- [ ] Criar rota individual para projetos
- [ ] Exibir contexto, stack, resultados e links por projeto
- [ ] Destacar projetos principais com mais conteúdo
- [ ] Melhorar a navegação entre vitrine e detalhes
- **Status:** ✅ complete

### Phase 9: Otimizações Next.js
- [ ] Server Components onde apropriado
- [ ] Image optimization
- [ ] SEO (metadata)
- [ ] Static generation ou ISR
- **Status:** ✅ complete

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
- **Status:** ✅ complete

---
## Novas Fases: Cypress e Transição de Dados

### Phase 12: Unificação das Skills do Agente
- [x] Mover todas as skills ativas de `.github/skills/` para `.agent/skills/skills/`
- [ ] Atualizar referências no `.agent/skills/README.md`
- [ ] Deletar o diretório `.github/skills` obsoleto
- **Status:** ✅ complete

### Phase 13: Setup de Testes com Cypress
- [x] Instalar o Cypress e dependências do TypeScript (`npm install cypress -D`)
- [x] Inicializar e configurar o Cypress para funcionar com Next.js
- [x] Criar teste E2E inicial (ex: verificar renderização correta da Home Page)
- [x] Atualizar `package.json` com os scripts `"cypress:open"` e `"cypress:run"`
- [ ] Configurar Testes de Componente (Component Testing) do Cypress para Next.js
- **Status:** in_progress

### Phase 14: Extração de Dados e Criação de CV (LaTeX)
- [x] Ler o `README.md` raiz e experiências do LinkedIn (formato markdown)
- [x] Utilizar a skill `curriculo-latex-assistant` e os arquivos de `resume-template/` para gerar o currículo atualizado
- [x] Consolidar esses dados extraídos em um arquivo JSON local fortemente tipado (Mock Data / Fallback)
- **Status:** ✅ complete

### Phase 15: Transição para Supabase via Dados Locais com Fallback
- [ ] Adaptar o portfólio (UI) para consumir os dados primariamente do Supabase.
- [ ] Implementar lógica de **Fallback**: caso o Supabase falhe ou esteja sem dados, ler do JSON local compilado na Phase 14.
- [ ] Escrever **Cypress Component Tests** mockando as requisições para validar a renderização usando Supabase vs Fallback Local.
- [ ] Escrever **Cypress E2E Test** validando todo o fluxo de apresentação de dados na interface.
- [ ] Preparar a migração/seed.sql ou scripts para subir o JSON consolidado para o Supabase.
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
| **Cypress E2E**          | **Garante qualidade e estabilidade de refatorações de interface** |
| **JSON Intermediário**   | **Facilita a validação visual do CV antes de submetê-lo ao banco**|

## Errors Encountered

| Error          | Resolution |
| -------------- | ---------- |
| (nenhum ainda) | -          |

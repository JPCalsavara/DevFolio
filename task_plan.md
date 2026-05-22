# Task Plan: AI Intake Pipeline — Parse → Validate → Apply → Admin UI

## Goal
Implementar o pipeline semi-automático de ingestão de dados de portfólio:
1. API REST com 3 rotas (`/api/intake/parse`, `/validate`, `/apply`)
2. Página `admin/intake` para revisão visual e aprovação humana antes de qualquer escrita no Supabase

## Current Phase
Phase 1 - **IN PROGRESS**

## Phases

### Phase 1: Tipos e Schema de Validação
- [ ] Criar `src/lib/intake/schema.ts` com tipos TypeScript do payload de intake
- [ ] Criar `src/lib/intake/validate.ts` com a função de validação de schema (sem dependências externas)
- **Arquivos:** `src/lib/intake/schema.ts`, `src/lib/intake/validate.ts`
- **Status:** in_progress

### Phase 2: Rota POST /api/intake/parse
- [ ] Criar `src/app/api/intake/parse/route.ts`
- [ ] Aceitar `multipart/form-data` com `cv_text`, `github_links`, `project_links`, `notes`
- [ ] Chamar o prompt template do `docs/ai-intake-pipeline.md` via Gemini API (ou fallback mock)
- [ ] Retornar draft JSON puro
- **Arquivos:** `src/app/api/intake/parse/route.ts`
- **Status:** pending

### Phase 3: Rota POST /api/intake/validate
- [ ] Criar `src/app/api/intake/validate/route.ts`
- [ ] Recebe o draft JSON, roda a função de `validate.ts`
- [ ] Retorna `{ valid: boolean, errors: string[], warnings: string[] }`
- **Arquivos:** `src/app/api/intake/validate/route.ts`
- **Status:** pending

### Phase 4: Rota POST /api/intake/apply
- [ ] Criar `src/app/api/intake/apply/route.ts`
- [ ] Protegida por sessão Supabase (apenas admin autenticado)
- [ ] Recebe draft aprovado, executa upserts em ordem: habilidades → experiences → projects
- [ ] Retorna relatório de sucesso/falha por entidade
- **Arquivos:** `src/app/api/intake/apply/route.ts`
- **Status:** pending

### Phase 5: Página admin/intake — UI de revisão
- [ ] Criar `src/app/admin/intake/page.tsx` (Client Component, protegido)
- [ ] Formulário de upload: textarea para CV texto, campos para links
- [ ] Botão "Analisar" → chama `/parse` e exibe resultado em abas (Habilidades / Projetos / Experiências)
- [ ] Cada seção editável inline
- [ ] Botão "Validar" → chama `/validate` e exibe warnings/erros
- [ ] Botão "Aplicar" (só habilitado se válido) → chama `/apply` e exibe relatório
- **Arquivos:** `src/app/admin/intake/page.tsx`
- **Status:** pending

### Phase 6: Testes E2E da página admin/intake
- [ ] Cypress E2E: `cypress/e2e/intake.cy.ts`
- [ ] Testa que a página carrega com formulário de intake
- [ ] Testa que o fluxo parse → validate → apply é navegável
- **Status:** pending

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Sem biblioteca de validação externa | Manter bundle pequeno; regras são simples e documentadas |
| Parse via Gemini (com fallback mock) | Não bloqueia a UI se a API key não estiver configurada |
| Upsert em ordem: habilidades → experiences → projects | Dependências: projects podem referenciar habilidades |
| apply protegida por sessão Supabase | Mesmo mecanismo já usado pelo admin existente |
| UI em abas por entidade | Reduz scroll e facilita revisão focada por tipo |

## Errors Encountered
| Error | Resolution |
|-------|------------|
| (nenhum ainda) | - |

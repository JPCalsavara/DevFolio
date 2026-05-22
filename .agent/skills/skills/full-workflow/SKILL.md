---
name: full-workflow
description: Orquestra o ciclo completo de desenvolvimento (End-to-End) de uma feature ou correção. Passa pelas fases de Análise, Planejamento (task_plan.md), Execução iterativa, Validação (testes e build), Versionamento (git-flow) e Code Review (PR).
---

# Full Workflow Automation Skill

## Propósito
Esta skill funciona como o "maestro" do fluxo de desenvolvimento. Ao ser invocada, ela gerencia a tarefa do início ao fim com máxima eficiência de tokens, acionando as demais skills do projeto conforme a fase atual.

## Estrutura de Memória
Toda a memória da sessão DEVE ser persistida em disco usando três arquivos:
- `task_plan.md`: O backlog e lista de fases.
- `findings.md`: As descobertas, riscos e regras de negócio/arquitetura mapeadas.
- `progress.md`: O log cronológico (terminal-like) da execução.

---

## O Ciclo Completo (5 Fases)

Sempre que iniciar ou retomar o fluxo, leia os arquivos de memória acima (se existirem) e identifique em qual das seguintes fases você está:

### FASE 1: Contexto e Planejamento (Skill Relacionada: `plan` / `plan-and-execute`)
- **Se não houver `task_plan.md`:** 
  1. Atualize a branch main (se estiver trabalhando nela) usando git.
  2. Leia OBRIGATORIAMENTE o mapa arquitetural em `docs/ARCHITECTURE_MAP.md` e as KIs relevantes.
  3. Crie os três arquivos (`task_plan.md`, `findings.md`, `progress.md`) quebrando o objetivo em fases curtas (máximo 2 arquivos alterados por fase).
  4. Valide que as decisões respeitam a arquitetura atual (Clean Arch/DDD) e UI (Rich Aesthetics).

### FASE 2: Execução Step-by-Step (Skill Relacionada: `execute`)
- **Se houver um plano com fases pendentes:**
  1. Crie uma nova branch via `git-flow` (ex: `feat/nome-breve`) se ainda não estiver nela.
  2. Implemente a próxima fase pendente do plano.
  3. Ao criar endpoints, aplique os preceitos de `create-endpoint`.
  4. Ao criar componentes UI, aplique `angular-component` e garanta visual premium.
  5. Após modificar os arquivos, registre no `progress.md` e marque ✅ no `task_plan.md`.
  6. **Pare e valide** compilando ou pedindo continuação. Não faça mais de uma fase de uma vez.

### FASE 3: Validação, Testes e Build (Skill Relacionada: `generate-tests`)
- **Após implementar as lógicas principais:**
  1. Adicione/gere testes unitários ou e2e para o código novo chamando `generate-tests` se aplicável.
  2. **[TOKEN EFFICIENCY]** Execute os builds e testes localmente isolando apenas os erros num log temporário para não explodir o contexto:
     - Backend: `cd backend/src && dotnet test --logger "console;verbosity=quiet" > temp_test_errors.log`
     - Frontend: `cd frontend && ng build > temp_build_errors.log 2>&1` (depois use `grep_search` procurando por "Error" ou "Failed").
  3. Analise o arquivo temporário gerado. Se houver falha, anote a causa resumida em `findings.md`, apague o arquivo de log (`rm temp_*.log`) e volte à Fase 2 para corrigir.

### FASE 4: Versionamento e Pull Request (Skill Relacionada: `git-flow`)
- **Quando o plano estiver 100% verde e builds passando:**
  1. Faça commit das alterações. Use as regras de Conventional Commits descritas em `git-flow`.
  2. Dê `git push` na branch atual.
  3. Abra um Pull Request utilizando a interface ou instruindo o usuário com o link gerado, preenchendo o escopo do PR com o que foi feito no `task_plan.md`.

### FASE 5: Revisão Final (Skill Relacionada: `code-review`)
- **Após PR Aberto:**
  1. Execute a skill `code-review` no diff da branch comparado com a `main`.
  2. Levante comentários críticos e de melhoria contínua (performance, UX, regras de segurança).
  3. Limpe ou arquive os arquivos temporários (`task_plan.md`, etc) movendo-os para `docs/history/tasks/`.

---

## Regras Críticas para o Agente
1. **Nunca perca a memória:** Ao iniciar qualquer prompt no meio deste fluxo, SEMPRE use a ferramenta para ler o `task_plan.md`, `findings.md` e `progress.md` antes de tomar ações.
2. **Ciclo Curto:** Se o usuário pedir para "continuar", execute exatamente UMA fase, salve e pare.
3. **Limite as saídas:** Ao usar terminal para ver logs/erros, NUNCA puxe o log inteiro. Jogue em um `.log` temporário e use ferramentas de busca para ler apenas os blocos de erro.

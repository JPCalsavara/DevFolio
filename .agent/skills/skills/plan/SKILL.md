---
name: plan
description: Analisa a tarefa solicitada e cria um plano persistente (task_plan.md, findings.md, progress.md) sem executar nenhuma alteração. Use quando o usuário quer apenas estruturar o trabalho antes de implementar, ou quando a tarefa é grande o suficiente para precisar de rastreamento entre sessões.
---

# Plan Skill

## Propósito

Esta skill é responsável **exclusivamente pelo planejamento**. Ela analisa a tarefa, investiga o código existente e cria os 3 arquivos de planejamento que serão usados pela skill `execute` para implementar as mudanças.

| Arquivo         | Papel                                      | Quando atualizar                              |
| --------------- | ------------------------------------------ | --------------------------------------------- |
| `task_plan.md`  | Fases, decisões, bloqueios                 | Ao criar o plano e ao refinar fases           |
| `findings.md`   | Descobertas, riscos, mapeamentos           | A cada informação relevante encontrada no código |
| `progress.md`   | Log cronológico da execução                | Ao iniciar a sessão de planejamento           |

---

## PASSO 1 — Restaurar Contexto (SEMPRE ao iniciar)

Antes de qualquer ação, verifique se já existe um plano em andamento:

```bash
# Verificar se há plano ativo
[ -f task_plan.md ] && echo "PLANO ENCONTRADO" && cat task_plan.md
[ -f findings.md ]  && echo "FINDINGS ENCONTRADO" && cat findings.md
[ -f progress.md ]  && echo "PROGRESSO ENCONTRADO" && tail -20 progress.md
```

Se os arquivos existirem:
1. Leia-os completamente.
2. Avalie se o plano já está adequado ou se precisa de ajustes.
3. **Não sobrescreva um plano existente** sem antes perguntar ao usuário.

---

## PASSO 2 — Investigar o Código

Antes de criar o plano, mapeie o impacto da tarefa:

- Use `grep` / `grep_search` para encontrar todos os arquivos afetados.
- Identifique dependências entre módulos (backend ↔ frontend ↔ banco).
- Registre cada descoberta relevante em `findings.md` **conforme for descobrindo** — não acumule para registrar depois.

### Critérios para registrar em `findings.md`
- Mudanças que afetam banco de dados (migrations, enum values, colunas).
- Acoplamentos inesperados entre módulos.
- Comportamentos que podem quebrar em tempo de execução.
- Mapeamentos de substituição (ex: enum A → enum B em N arquivos).

---

## PASSO 3 — Criar os Arquivos de Planejamento

### 3.1 — `task_plan.md`

```markdown
# Task Plan: [Nome da Tarefa]

**Objetivo:** [descrição clara em 1-2 frases]
**Branch:** [branch git atual]
**Data de início:** [data]

---

## Fases

| # | Fase | Arquivos Afetados | Status |
|---|------|-------------------|--------|
| 1 | [nome] | [arquivo1, arquivo2] | ⏳ Pendente |
| 2 | [nome] | [arquivo3] | ⏳ Pendente |
| N | Build e validação | — | ⏳ Pendente |

---

## Decisões Técnicas
[registre aqui cada decisão não óbvia tomada]

## Bloqueios e Riscos
[referência ao findings.md]
```

**Regras para as fases:**
- Cada fase deve ter escopo claro e testável isoladamente.
- A última fase é sempre "Build e validação" (`dotnet build && dotnet test` / `ng build`).
- Agrupe arquivos relacionados na mesma fase; separe domínios distintos em fases diferentes.
- Ordene do menor para o maior risco (ex: types → services → controllers → frontend → testes).

### 3.2 — `findings.md`

```markdown
# Findings: [Nome da Tarefa]

## [Descoberta 1 — título descritivo]
[descrição detalhada: o que foi encontrado, onde, e qual o impacto]

## [Descoberta 2]
[descrição detalhada]
```

### 3.3 — `progress.md`

```markdown
# Progress Log: [Nome da Tarefa]

## Sessão [data]

- [HH:MM] Planejamento iniciado
- [HH:MM] Investigação concluída — N arquivos impactados identificados
- [HH:MM] task_plan.md criado com N fases
- [HH:MM] Planejamento finalizado — pronto para execução com a skill `execute`
```

---

## PASSO 4 — Apresentar o Plano ao Usuário

Após criar os arquivos, apresente um resumo no chat:

```
## Plano criado ✅

**Tarefa:** [nome]
**Fases:** N
**Arquivos impactados:** X

### Fases planejadas:
1. [fase 1] — [arquivos]
2. [fase 2] — [arquivos]
...

### Riscos identificados:
- [risco 1]
- [risco 2]

Para iniciar a implementação, use a skill `execute`.
```

---

## Regras Críticas

### ⚠️ Planejar ≠ Executar
Esta skill **não modifica arquivos de código**. Apenas lê, analisa e cria os arquivos de planejamento (`task_plan.md`, `findings.md`, `progress.md`).

### ⚠️ Registre riscos imediatamente
Se durante a investigação você identificar um risco (ex: mudança de enum que afeta banco), **registre em `findings.md` antes de continuar**.

### ⚠️ Não assuma — investigue
Antes de listar um arquivo como afetado, confirme com grep. Planos baseados em suposições geram retrabalho.

### ⚠️ Fases devem ser atômicas
Cada fase deve poder ser executada e validada de forma independente.

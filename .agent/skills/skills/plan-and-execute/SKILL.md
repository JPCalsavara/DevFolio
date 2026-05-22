---
name: plan-and-execute
description: Cria e gerencia um plano de tarefa persistente usando task_plan.md, findings.md e progress.md. Ao ser invocada, restaura o contexto de sessões anteriores e guia a execução passo a passo até a conclusão. Use sempre que a tarefa exigir mais de 3 arquivos modificados ou precisar de rastreamento de progresso entre sessões.
---

# Plan and Execute Skill

## Propósito

Esta skill implementa um sistema de planejamento e execução persistente baseado em 3 arquivos que funcionam como memória de disco da sessão:

| Arquivo | Papel | Quando atualizar |
| ------- | ----- | ---------------- |
| `task_plan.md` | Fases, decisões, bloqueios | Após cada fase concluída ou decisão tomada |
| `findings.md` | Descobertas, riscos, mapeamentos | A cada informação relevante descoberta |
| `progress.md` | Log cronológico da execução | Continuamente durante a execução |

---

## PASSO 1 — Restaurar Contexto (SEMPRE ao iniciar)

Antes de qualquer ação, verifique se já existe um plano em andamento:

```bash
# Verificar se há plano ativo
[ -f task_plan.md ] && echo "PLANO ENCONTRADO" && head -60 task_plan.md
[ -f findings.md ]  && echo "FINDINGS ENCONTRADO" && cat findings.md
[ -f progress.md ]  && echo "PROGRESSO ENCONTRADO" && tail -20 progress.md
```

Se os arquivos existirem:
1. Leia-os completamente antes de qualquer ação.
2. Identifique em qual fase o trabalho parou.
3. Continue de onde parou — **não recomece do zero**.

---

## PASSO 2 — Criar o Plano (se não existir)

Se não houver `task_plan.md`, crie-o com a seguinte estrutura:

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
[registre riscos descobertos no findings.md]
```

Crie o `findings.md` para registrar descobertas técnicas relevantes (impactos em banco, comportamentos inesperados, mapeamentos de substituição, etc.):

```markdown
# Findings: [Nome da Tarefa]

## [Descoberta 1]
[descrição detalhada]

## [Descoberta 2]
[descrição detalhada]
```

Crie o `progress.md` para o log de execução:

```markdown
# Progress Log: [Nome da Tarefa]

## Sessão [data]

- [HH:MM] Iniciado planejamento
```

---

## PASSO 3 — Executar por Fases

Para **cada fase** do plano:

### 3.1 — Antes de executar
Releia a fase atual no `task_plan.md` para garantir que o objetivo está claro.

### 3.2 — Executar
Execute as alterações da fase. Siga estas regras:

- **Máximo 2 arquivos por chamada de ferramenta** — evite mega-edições.
- **Teste incrementalmente** — rode `dotnet build` ou `ng build` após cada fase de backend/frontend.
- **Se encontrar algo inesperado** → registre imediatamente em `findings.md` antes de continuar.

### 3.3 — Após executar
Atualize o `task_plan.md` marcando a fase como concluída:

```markdown
| 1 | [nome] | [arquivos] | ✅ Concluído |
```

Adicione entrada no `progress.md`:

```markdown
- [HH:MM] Fase 1 concluída — substituídas 3 ocorrências em ServiceX.cs
```

---

## PASSO 4 — Validação Final

Antes de considerar a tarefa concluída:

```bash
# Backend — build e testes
cd backend/src && dotnet build --no-restore && dotnet test

# Frontend — build
cd frontend && ng build --configuration=production
```

Se os testes passarem:
- Marque todas as fases como `✅ Concluído` no `task_plan.md`.
- Adicione o resultado final no `progress.md`.
- Faça commit: `git add . && git commit -m "[tipo]: [descrição]"`.

---

## PASSO 5 — Arquivar (quando a tarefa estiver 100% concluída)

Após o PR aprovado e mergeado, os arquivos de planejamento devem ser tratados conforme `docs/GUIA_ORGANIZACAO_DOCUMENTOS.md`:

- Se contiver informações úteis para o futuro → mova para `docs/history/tasks/`.
- Se for apenas log de execução → pode deletar.

```bash
# Opção 1: arquivar
mv task_plan.md docs/history/tasks/YYYY-MM-DD-nome-da-tarefa.md

# Opção 2: limpar
rm task_plan.md findings.md progress.md
```

---

## Regras Críticas

### ⚠️ Nunca repita o mesmo erro
Se uma ação falhou, registre em `findings.md` e adote uma abordagem diferente.

### ⚠️ Não pule a leitura dos arquivos
Sempre que retomar uma sessão, leia os 3 arquivos antes de qualquer ação. Contexto perdido = retrabalho.

### ⚠️ Registre riscos imediatamente
Se durante o grep/análise você identificar um risco (ex: mudança de valor de enum que afeta banco de dados), **registre-o em `findings.md` antes de continuar a análise**.

### ⚠️ Prefira commits frequentes
Faça commits ao final de cada fase concluída, não apenas no final. Isso evita perda de trabalho e facilita rollback.

---

## Checklist de Encerramento de Sessão

Antes de encerrar a sessão (mesmo se incompleta), garanta que:

- [ ] `task_plan.md` reflete o estado atual (fases concluídas marcadas)
- [ ] `findings.md` tem todos os riscos e descobertas documentados
- [ ] `progress.md` tem o log do que foi feito nesta sessão
- [ ] Há pelo menos 1 commit na branch com o trabalho realizado

---

## Exemplo de Uso

**Usuário:** "Troque todas as ocorrências de `ALCALA_8H` por `OITO_HORAS_SEIS_POR_DOIS` e corrija os testes"

**Agente:**
1. Verifica se `task_plan.md` existe → sim → lê o plano e o findings existentes
2. Identifica fases pendentes no plano
3. Executa fase por fase registrando progresso
4. Ao final: `dotnet test` → todos passando → commit → atualiza `task_plan.md`

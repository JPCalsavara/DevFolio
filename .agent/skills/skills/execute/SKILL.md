---
name: execute
description: Executa um plano de tarefa existente (task_plan.md) fase por fase, atualizando findings.md e progress.md ao longo do caminho. Restaura o contexto automaticamente entre sessões. Use após a skill `plan` ter criado o plano, ou sempre que houver um task_plan.md ativo e o usuário quiser continuar a implementação.
---

# Execute Skill

## Propósito

Esta skill é responsável **exclusivamente pela execução**. Ela lê o plano criado pela skill `plan`, restaura o contexto de sessões anteriores e implementa as mudanças fase por fase até a conclusão.

---

## PASSO 1 — Restaurar Contexto (SEMPRE ao iniciar)

**Este passo é obrigatório.** Nunca comece sem ler os 3 arquivos.

```bash
# Verificar e ler o plano ativo
[ -f task_plan.md ] && echo "PLANO ENCONTRADO" && cat task_plan.md || echo "ERRO: task_plan.md não encontrado — use a skill plan primeiro"
[ -f findings.md ]  && echo "FINDINGS ENCONTRADO" && cat findings.md
[ -f progress.md ]  && echo "PROGRESSO ENCONTRADO" && tail -30 progress.md
```

Após ler os arquivos:
1. Identifique qual foi a **última fase concluída** no `task_plan.md`.
2. Leia o `progress.md` para entender o que foi feito e o que falhou.
3. Leia o `findings.md` para relembrar riscos conhecidos antes de executar.
4. **Continue de onde parou — não recomece do zero.**

Se `task_plan.md` não existir → informe o usuário e sugira usar a skill `plan` primeiro.

---

## PASSO 2 — Confirmar a Próxima Fase

Antes de executar, anuncie no chat qual fase será executada:

```
## Executando Fase [N]: [nome da fase]

**Arquivos afetados:** [lista]
**Objetivo:** [descrição da fase]
```

Isso permite ao usuário interromper se necessário.

---

## PASSO 3 — Executar por Fases

Para **cada fase pendente** no `task_plan.md`:

### 3.1 — Antes de executar
- Releia a fase atual no `task_plan.md`.
- Verifique se o `findings.md` tem alertas relacionados a esta fase.

### 3.2 — Executar
Execute as alterações da fase. Siga estas regras:

- **Máximo 2 arquivos por chamada de ferramenta** — evite mega-edições.
- **Teste incrementalmente** — rode `dotnet build` ou `ng build` após cada fase de backend/frontend.
- **Se encontrar algo inesperado** → registre imediatamente em `findings.md` antes de continuar.
- **Se uma ação falhar** → registre a falha em `findings.md`, adote abordagem diferente, nunca repita o mesmo erro.

### 3.3 — Após executar cada fase
Atualize o `task_plan.md` marcando a fase como concluída:

```markdown
| 1 | [nome] | [arquivos] | ✅ Concluído |
```

Adicione entrada no `progress.md`:

```markdown
- [HH:MM] Fase 1 concluída — [descrição do que foi feito]
```

Faça commit ao final de cada fase:

```bash
git add [arquivos da fase] && git commit -m "[tipo]: [descrição da fase]"
```

---

## PASSO 4 — Validação Final

Após todas as fases de implementação, execute a fase de validação:

```bash
# Backend — build e testes
cd backend/src && dotnet build --no-restore && dotnet test

# Frontend — build
cd frontend && ng build --configuration=production
```

Se os testes passarem:
- Marque todas as fases como `✅ Concluído` no `task_plan.md`.
- Adicione o resultado final no `progress.md`.
- Faça o commit final: `git add . && git commit -m "[tipo]: [descrição geral]"`.

Se algum teste falhar:
- Registre o erro em `findings.md`.
- **Utilize a skill `generate-tests`** para gerar testes unitários ou corrigir os testes quebrados de acordo com os padrões do projeto (ex: usar mocks adequados para o `ICurrentTenantService`, aplicar o padrão AAA, etc.).
- Corrija e repita a validação — **não marque como concluído sem os testes passando e com 100% de sucesso**.

---

## PASSO 5 — Encerramento de Sessão (mesmo se incompleta)

Antes de encerrar a sessão, garanta que:

- [ ] `task_plan.md` reflete o estado atual (fases concluídas marcadas).
- [ ] `findings.md` tem todos os riscos e descobertas desta sessão documentados.
- [ ] `progress.md` tem o log do que foi feito nesta sessão.
- [ ] Há pelo menos 1 commit na branch com o trabalho realizado.

Adicione ao `progress.md`:

```markdown
- [HH:MM] Sessão encerrada — próxima fase a executar: Fase [N]
```

---

## PASSO 6 — Arquivar (quando 100% concluído)

Após o PR aprovado e mergeado, trate os arquivos conforme `docs/GUIA_ORGANIZACAO_DOCUMENTOS.md`:

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

### ⚠️ Nunca execute sem ler o plano
Contexto perdido = retrabalho. Leia sempre os 3 arquivos antes de qualquer alteração de código.

### ⚠️ Nunca repita o mesmo erro
Se uma ação falhou, registre em `findings.md` e adote uma abordagem diferente.

### ⚠️ Commits frequentes
Faça commits ao final de cada fase concluída. Evita perda de trabalho e facilita rollback.

### ⚠️ Não pule a validação
A fase de build/testes não é opcional. Código que não compila ou quebra testes não está concluído.

### ⚠️ Execute ≠ Planeje
Se durante a execução você descobrir que o plano precisa de mudanças significativas, pause, documente em `findings.md` e alinhe com o usuário antes de continuar.

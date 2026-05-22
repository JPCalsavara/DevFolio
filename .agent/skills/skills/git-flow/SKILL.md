---
name: git-flow
description: Automatiza o fluxo de trabalho do Git no repositório. Cria novas branches a partir da main de acordo com o tipo de tarefa, faz commits semânticos em lotes, sobe as alterações para o remoto, abre Pull Requests (podendo atribuir revisores automáticos como o Copilot) e realiza loops iterativos para ler comentários de PR e corrigi-los automaticamente.
---

# Git Flow Skill

## Propósito

Esta skill orienta o assistente a conduzir o versionamento de ponta a ponta:
- Criação de ramificações baseadas na \`main\`.
- Realização de commits usando **Conventional Commits**.
- Push para o repositório remoto.
- Criação de Pull Requests (PRs) no GitHub.
- Leitura e resolução iterativa de comentários de Pull Requests (ex: apontamentos do GitHub Copilot).

Use esta skill para padronizar o ciclo de vida das suas alterações no repositório.

---

## PASSO 1 — Criar ou Validar Branch

Quando o usuário pedir para trabalhar numa nova funcionalidade ou correção:

1. Garanta que você está na ramificação base correta (geralmente \`main\`):
   ```bash
   git checkout main && git pull origin main
   ```
2. Crie a nova branch seguindo o padrão abaixo:
   - \`feat/nome-da-funcionalidade\` (para novas features)
   - \`fix/nome-do-bug\` (para correções de bugs)
   - \`chore/nome-da-tarefa\` (para refatorações, atualizações, etc.)
   
   ```bash
   git checkout -b tipo/nome-breve-em-minusculo
   ```

*(Se o usuário já estiver na branch correta, apenas valide e pule este passo).*

---

## PASSO 2 — Commits Semânticos

Ao longo do desenvolvimento ou ao final de uma sessão de trabalho, quando solicitado a fazer commit:

1. Sempre verifique o que foi modificado primeiro usando \`git status\` e \`git diff\`.
2. Adicione os arquivos apropriados com \`git add <arquivos>\`.
3. Faça commits utilizando o padrão de **Conventional Commits**:
   - `feat(escopo): descrição clara e no tempo presente`
   - `fix(escopo): descrição do bug resolvido`
   - `chore(escopo): atualiza dependências ou configs`
   - `test(escopo): adiciona testes faltantes`
   - `refactor(escopo): refatora pedaço de código`

   *Exemplo:* `git commit -m "fix(operacoes): resolver excecao de FK na exclusao do cliente"`

---

## PASSO 3 — Push e Pull Request

Quando o trabalho estiver concluído, os testes estiverem passando, e o usuário pedir para abrir PR:

1. **Suba as alterações para o remoto:**
   ```bash
   git push -u origin <nome-da-branch>
   ```

2. **Gere um resumo para o PR:**
   Baseado no \`task_plan.md\` ou nas anotações de progresso, gere um breve descritivo markdown para o PR explicando o "Por que" e o "O que" foi feito.

3. **Crie o Pull Request via CLI do GitHub:**
   Se a CLI do GitHub (\`gh\`) estiver disponível e autenticada, utilize-a para abrir o PR sem que o usuário precise sair do terminal:
   ```bash
   gh pr create --title "tipo(escopo): Título do PR" --body "## Descrição
   Resolvidos bugs X e Y.
   
   ## Alterações
   - Implementado debounce para evitar HTTP Flood.
   - Refatorado a enum de Status.
   " --base main
   ```
   *Dica de Automação:* Se o usuário quiser o Copilot como revisor automático logo na criação, adicione a flag: `--reviewer copilot` (ou as labels padrão do repositório para engatilhar workflows de IA).
   
   *Nota: Se o comando `gh` não estiver instalado ou não estiver autenticado, instrua o usuário com o link para abrir o PR pelo navegador, que geralmente é exibido na saída do `git push`.*

---

## PASSO 4 — Auto-Resolução de Reviews de PR (Loop Interativo)

Quando o usuário pedir para analisar/resolver os comentários de um PR aberto (como apontamentos do Copilot ou SonarQube):

1. **Baixe os comentários e diffs do PR atual usando o CLI:**
   ```bash
   gh pr view --comments > pr_comments_temp.txt
   ```
2. **Analise o Feedback:** Leia o arquivo e verifique quais comentários requerem alterações no código.
3. **Execute o Plano de Correção:** Altere os arquivos apontados, utilize a skill `bug-workflow` se as alterações forem muito complexas.
4. **Commit e Push:**
   ```bash
   git add .
   git commit -m "fix(review): aplica feedbacks de code review"
   git push origin <nome-da-branch>
   ```
5. **Responda/Resolva a Thread:**
   Utilize o GitHub CLI para adicionar comentários na PR sinalizando que o review foi atendido:
   ```bash
   gh pr comment --body "Resolvido no último commit."
   ```
6. Limpe o arquivo de log gerado no Passo 1.

## Regras Críticas

### ⚠️ Não faça "git add ." cegamente
Antes de commitar, sempre confira se você não está incluindo arquivos temporários, logs não documentados ou arquivos sensíveis. Adicione de forma granular: \`git add src/...\`.

### ⚠️ A branch base é sagrada
Sempre verifique se a \`main\` está atualizada antes de derivar uma nova branch, para evitar resolver conflitos com históricos desatualizados.

### ⚠️ Validação antes do PR
A skill \`git-flow\` trabalha em conjunto com a \`execute\`. Certifique-se de que os testes locais (`dotnet test` e `ng build`) passaram antes de sugerir ou automatizar a abertura do PR.

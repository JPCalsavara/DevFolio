---
name: testing-workflow
description: Guia para criação e execução de testes no frontend React/Next.js.
---
# Testing Workflow

## Contexto
Atualmente, o projeto não possui Cypress ou Jest/Playwright configurados de forma nativa no package.json.

## Regras
1. **Verificação de Setup**: Antes de escrever testes, verifique se a biblioteca de testes (Playwright, Jest, ou Cypress) está instalada. Se não, avise o usuário e peça para instalar.
2. **Padrão de Teste**: Teste o comportamento do usuário e não a implementação. Valide renderização correta de componentes MUI.

---
name: bootstrap-portfolio
description: Orquestra o ciclo completo de setup inicial de um portfólio (dados, temas, Supabase e build) a partir de um prompt ou currículo base.
---

# Bootstrap Portfolio Skill

## Contexto
O usuário quer que o portfólio funcione como um "template engine". Ao invés de ficar configurando cada arquivo manualmente, ele quer um fluxo simples: colocar as informações (como um CV), rodar um comando/prompt e ter o portfólio pronto, com backend configurado.

## Fluxo de Trabalho Automatizado

Quando invocado para inicializar o portfólio do zero ou com novos dados, execute em sequência:

### 1. Ingestão de Dados (Info & Prompt)
- Leia o currículo do usuário (`cv.pdf`, `cv.md` ou `README.md`) e processe as informações usando a skill `curriculo-latex-assistant`.
- O output deve gerar automaticamente o arquivo `src/data/portfolioData.ts` contendo as variáveis mockadas.

### 2. Configuração de Tema e UI
- Invocar imediatamente a skill `theme-generator` com o perfil escolhido pelo usuário (ex: "Tech/Dark" ou "Criativo/Vibrante").
- Isso reconfigura fontes, paleta e legendas.

### 3. Configuração do Next.js
- Atualizar `next.config.ts` (garantindo domínios de imagens corretos e quality arrays) para prevenir erros no build de componentes de imagem.
- Ajustar Metadados SEO em `src/app/layout.tsx` baseando-se no nome e profissão ingeridos na etapa 1.

### 4. Setup do Supabase (Backend)
- Chamar a skill `supabase-workflow` para:
  1. Validar a presença das credenciais no `.env`.
  2. Aplicar as migrations de schema (`supabase/schema.sql`).
  3. Aplicar os dados recém extraídos como um seed real (`supabase/seed.sql`) via CLI do Supabase.

### 5. Validação Automática
- Rodar `npx cypress run` em background (testes de Componente e E2E) para garantir que a transição do tema e a injeção de dados não quebraram o layout ou fallback.

## Resultado
A experiência final do usuário deve ser a ausência de passos manuais. Ele deve apenas fornecer o texto e assistir o agente preparar o repositório, subir o banco de dados e aplicar a identidade visual correta.

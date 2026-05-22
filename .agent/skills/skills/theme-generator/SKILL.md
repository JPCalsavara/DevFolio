---
name: theme-generator
description: Skill para modificar estilos, cores e temas do portfólio de acordo com o perfil profissional desejado (ex: backend/dados, UX/UI, corporativo).
---

# Theme Generator Skill

## Contexto
O usuário quer mudar a identidade visual do portfólio sem mexer na lógica. Ao invocar esta skill com um perfil, ela reconfigura `theme.ts`, `globals.css` e `layout.tsx` de forma cirúrgica.

## Perfis Disponíveis

### 1. 🟦 Backend/Data (Perfil Atual)
**Para quem:** Devs backend, engenheiros de dados, SREs que não têm saco pra design mas querem um portfólio que chame atenção de forma técnica e sofisticada.
**Filosofia:** "Menos frescura, mais impacto. Terminal-chic."
- **Paleta:** Azul profundo (`#07111F`) + accent elétrico (`#5C9CFF`) + ciano frio (`#7DD3FC`)
- **Tipografia:** `Sora` (títulos) + `Inter` (corpo) — geométrico, limpo, sem serifas
- **Estilo:** Glassmorphism nos cards, bordas sutis, box-shadow dramático, `border-radius` alto (16px)
- **Diferencial:** Foca na stack técnica, projetos e métricas. Sem decoração desnecessária.

### 2. 🟠 Criativo/Frontend/UX
**Para quem:** Devs frontend, designers, UX writers — trabalho *é* a estética.
- **Paleta:** Roxo (`#2D1B69`) + laranja quente (`#FF6B35`) + rosa (`#FF006E`)
- **Tipografia:** `Outfit` (títulos) + `DM Sans` (corpo)
- **Estilo:** Gradientes ousados, animações de hover vivas, cards com muito contraste de cor

### 3. 🩶 Corporativo/Liderança
**Para quem:** Tech leads, gerentes de produto, consultores — a seriedade conta.
- **Paleta:** Cinza escuro (`#1C1C1E`) + azul marinho (`#1D4ED8`) + branco off-white (`#F8F9FA`)
- **Tipografia:** `Roboto` (tudo) — neutro e confiável
- **Estilo:** Bordas retas, sombras mínimas, muito espaço em branco

### 4. ⬛ Minimalista/Pesquisador
**Para quem:** Cientistas de dados sênior, pesquisadores, arquitetos de software
- **Paleta:** Preto puro + branco + um único accent discreto (verde `#10B981`)
- **Tipografia:** `IBM Plex Mono` (tudo) — faz referência a terminais e documentos científicos
- **Estilo:** Sem bordas arredondadas (`border-radius: 0`), sem box-shadows, espaçamento generoso

---

## Como Aplicar um Perfil

Quando o usuário solicitar (ex: `@theme-generator aplique o perfil Corporativo`):

### 1. Atualizar `src/theme/theme.ts`
- Trocar `palette.primary.main`, `secondary.main`, `background.default` e `background.paper`
- Ajustar `shape.borderRadius`
- Mudar fontes CSS variables nos overrides de tipografia

### 2. Atualizar `src/app/layout.tsx`
- Trocar os imports de `next/font/google` (ex: de `Sora` para `Roboto`)
- Atualizar as variáveis CSS (`--font-*`)
- Atualizar os metadados `title` e `description`

### 3. Atualizar `src/app/globals.css`
- Ajustar `--background` e `--foreground` (variáveis CSS base)

### 4. Testar
- Rodar `npm run dev` e verificar visualmente
- Rodar `npx cypress run` para garantir que nenhum seletor quebrou

---

## Regras
- **Nunca** altere lógica de negócio, roteamento ou componentes de dados.
- **Apenas** altere os 3 arquivos de tema listados acima.
- Se o usuário não especificar um perfil, perguntar antes de aplicar.

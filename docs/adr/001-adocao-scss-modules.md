# ADR 001: Adoção de SCSS Modules e Separação de Estilos

* **Status:** Aceito
* **Data:** 2026-09-28
* **Decisores:** Time DevFolio / Desenvolvedor Principal

---

## 1. Contexto e Declaração do Problema

Anteriormente, o DevFolio concentrava suas estilizações de forma inline e via prop `sx={{ ... }}` do Material UI (MUI v9) e `@emotion/styled` diretamente nos arquivos de página (`page.tsx`) e componentes (`*.tsx`).

Esse modelo trazia os seguintes desafios:
1. **Acoplamento excessivo:** Regras de layout, cores, margens e responsividade ficavam emaranhadas na árvore JSX, tornando os componentes extensos e difíceis de ler.
2. **Runtime Overhead:** O uso de CSS-in-JS dinâmico (Emotion) adiciona processamento em tempo de execução no cliente.
3. **Dificuldade de manutenção:** Alterar ou padronizar um estilo exigia varrer dezenas de nós JSX com objetos literais de estilo.
4. **Falta de Design Tokens claros:** Cores, sombras e tipografia ficavam espalhadas em strings mágicas.

---

## 2. Decisão de Arquitetura

Decidimos adotar **SCSS Modules (`*.module.scss`)** como padrão obrigatório de estilização em todo o projeto DevFolio:

1. **Separação Obrigatória de Responsabilidades:**
   - Nenhuma nova estilização de layout ou estética deve ser escrita inline (`style={{ ... }}`) ou via prop `sx={{ ... }}` dentro de páginas ou componentes.
   - Toda página ou componente visual deve possuir seu respectivo arquivo `.module.scss` (ex: `src/app/faculdade/faculdade.module.scss`).

2. **Design Tokens e Utilitários Centralizados:**
   - Criada a pasta `src/styles/` com:
     - `_variables.scss`: Paleta de cores oficial (Dark Tech, Ciano, Esmeralda, Slate), fontes, breakpoints e espaçamentos.
     - `_mixins.scss`: Mixins reutilizáveis para glassmorphism, cards, responsividade, flex/grid e tipografia.

3. **Papel do Material UI (MUI):**
   - O MUI deve ser reservado prioritariamente para comportamentos complexos e acessibilidade (ex: diálogos modais, selects de formulário).
   - Componentes semânticos e estruturais (páginas, timelines, cards, seções) passam a usar tags semânticas HTML (`<section>`, `<article>`, `<header>`, `<div>`) estilizadas via classes do SCSS Module (`className={styles.card}`).
   - Quando componentes MUI forem indispensáveis, devem ser estilizados aplicando `className={styles.meuEstilo}` e sobrescrevendo classes no SCSS, nunca via `sx`.

4. **Piloto de Implementação:**
   - A página [`/faculdade`](/faculdade) (`src/app/faculdade/page.tsx` + `faculdade.module.scss`) é definida como a implementação de referência para todo o repositório.

---

## 3. Consequências

### Positivas:
* **Performance Máxima:** O Next.js compila os arquivos `.module.scss` em CSS estático durante o build, com hash único de escopo, gerando bundles minificados e eliminando runtime overhead de injeção de CSS.
* **JSX Limpo e Semântico:** As páginas tornam-se muito mais concisas, expressando apenas estrutura e dados.
* **Escopo Isolado:** Cada classe gerada tem hash único (ex: `faculdade_timelineCard__a1b2c`), eliminando 100% dos riscos de vazamento ou conflito de classes globais.
* **Poder do SCSS:** Suporte a aninhamento (`&`), mixins, variáveis estruturadas, funções de cor e media queries limpas.

### Mitigações:
* A migração das telas legadas (ex: Admin e Experiências) será realizada de forma progressiva, mantendo compatibilidade total durante a transição.

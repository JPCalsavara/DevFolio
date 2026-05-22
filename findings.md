# Findings & Decisions

## Requirements

- Migrar de Vite + React para Next.js (App Router)
- Substituir Tailwind por Material-UI (MUI)
- Evoluir a identidade visual para tons de azul
- Trocar a tipografia atual por uma combinação mais elegante e legível
- Fazer a apresentação inicial ocupar toda a primeira dobra
- Considerar uma página detalhada para projetos
- Basear conteúdo no CV PDF atual
- Foco em desenvolvimento (destacar skills técnicas e projetos)
- Manter responsividade e navegação suave
- **NOVO:** Unificar diretórios de Skills (`.github/skills` -> `.agent/skills/skills`)
- **NOVO:** Implementar Cypress para testes E2E
- **NOVO:** Processar currículo via `resume-template/` com dados do `README.md` e LinkedIn e mapear em JSON mockado para alimentar o Supabase.

## Research Findings

### Sobre o CV e Extração (NOVO)
- O projeto atual possui a pasta `resume-template/` e ferramentas como a skill `curriculo-latex-assistant`.
- Os insumos principais são o `README.md` raiz do portfólio e possíveis arquivos `.md` descrevendo experiências do LinkedIn.
- O JSON consolidado servirá de ponte antes de inserirmos de fato as informações definitivas no Supabase.

### Unificação das Skills (NOVO)
- Há uma pasta `.github/skills/` com algumas skills e uma `.agent/skills/skills/` que foi recentemente refatorada.
- Ter duas origens causa ruído. Unificaremos tudo em `.agent/skills/skills/`.

### Cypress no Next.js (NOVO)
- O Next.js suporta nativamente a integração com Cypress.
- Requer a instalação, a inicialização gerando `cypress.config.ts`, `cypress/e2e` e atualizações de scripts no `package.json`.

### Sobre o CV (cv-João.pdf)

- **Nome**: João Pedro Calsavara
- **Perfil atual**: Desenvolvedor Backend e estudante de Análise e Desenvolvimento de Sistemas (UNICAMP)
- **Experiência principal**: Mottu, com foco em .NET 8, mensageria, cloud e observabilidade
- **Projetos de destaque**: InterceptorSystem, Ju Decoração de Natal, automação com IA na Mottu, Semeia Code
- **Stack recorrente**: C#, .NET, PostgreSQL, SQL Server, Docker, Kubernetes, Datadog, xUnit, Moq

### Material-UI (MUI) Características

- Componentes robustos baseados em Material Design
- Sistema de temas altamente customizável
- Dark mode + Light mode built-in
- Suporta CSS-in-JS com `@emotion/react`
- Excelente para criar temas Dark + Neon
- Grande comunidade, documentação completa

### Next.js 14+ com App Router

- Server Components por padrão
- Melhor performance (streaming, suspense)
- File-based routing
- API Routes
- Image optimization
- Static generation + ISR
- Perfeito para portfólios estáticos

### Estilo Azul (nova direção visual)

- Fundo: azul muito escuro com navy e slate
- Cores principais: azul, ciano e accents frios
- Tipografia: mais séria, moderna e com boa leitura
- Efeitos: glow sutil, gradientes frios e sombras suaves
- Animações: transições discretas, sem exagero visual

### Supabase Setup

- **Banco de Dados**: PostgreSQL hospedado na Supabase
- **Autenticação**: Email/Password ou OAuth
- **Tabelas necessárias**:
  - `projects` (id, title, description, technologies, link, image_url, created_at)
  - `technologies` (id, name, category, icon_url, created_at)
  - `experiences` (id, company, position, description, start_date, end_date, created_at)
  - `users` (gerenciado pelo Supabase Auth)
- **Row Level Security (RLS)**: Admin pode escrever, usuários públicos podem ler
- **Real-time**: Usar subscriptions para atualizar portfólio em tempo real

## Technical Decisions

| Decision                | Rationale                                                               |
| ----------------------- | ----------------------------------------------------------------------- |
| Next.js 14+             | Moderno, melhor performance, suporte completo a SSR/SSG                 |
| MUI v5+                 | Customização total, tema dark+neon é natural, tipografia elegante       |
| App Router              | Server Components melhora perf, é o futuro do Next.js                   |
| TypeScript              | Type-safe, melhor DX, match com React 19                                |
| Emotion (MUI built-in)  | CSS-in-JS leve e poderoso, integrado com MUI                            |
| Dark + Neon Theme       | Moderno, profissional mas criativo, atrai devs                          |
| Foco em Dev             | Estrutura destaca: projetos, tech stack, skills técnicas                |
| Supabase                | BaaS completo, Auth nativa, PostgreSQL, Real-time, gratuito até escalar |
| Admin CRUD              | Permite atualizar portfólio sem redeploy                                |
| RLS + Auth              | Seguro, apenas admin pode modificar dados                               |
| Real-time subscriptions | Portfólio sempre atualizado quando admin faz mudanças                   |
| Unificar Skills         | Evita divergências na execução de tarefas autônomas.                    |
| JSON Intermediário      | Permite compor e visualizar os dados no Front antes de popular o Banco. |

## Issues Encountered

| Issue                        | Resolution                                                        |
| ---------------------------- | ----------------------------------------------------------------- |
| Tailwind → MUI               | MUI oferece muito mais flexibilidade para temas customizados      |
| Tema Dark+Neon complexo      | Usando `createTheme()` do MUI + custom palette                    |
| CV em PDF                    | Vamos estructurar manualmente em JSON os dados principais         |
| Dados estáticos vs dinâmicos | Supabase com real-time permite atualizações instantâneas          |
| Segurança do admin           | RLS no Supabase garante que apenas autenticados podem editar      |
| Identidade visual atual      | Precisa sair do neon/amarelo e ir para uma estética azul refinada |

## Open Design Questions

- Qual família tipográfica deve ser adotada como padrão da marca?
- A página detalhada de projeto deve abrir em rota própria ou em drawer/modal?
- O hero deve enfatizar mais backend/cloud ou manter equilíbrio entre técnica e narrativa?

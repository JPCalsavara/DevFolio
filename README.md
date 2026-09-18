# DevFolio (Next.js + Local-First + Supabase Opcional + Gemini)

Este projeto é um template open-source de portfólio pessoal projetado para desenvolvedores (backend, dados, devops, full-stack) que desejam um visual premium sem precisar escrever código CSS. Ele conta com uma arquitetura **Local-First** (funciona 100% offline e local imediatamente após clonar) e suporte opcional a **Supabase** e **Inteligência Artificial (Gemini)** para quem desejar painel administrativo em nuvem e ingestão automatizada de currículos.

- **Frontend:** Next.js (App Router) + React + MUI (Glassmorphism & Gradients)
- **Modo Padrão:** **100% Local-First** — dados estáticos em `src/data/portfolioData.ts` e mídias locais em `public/images/`.
- **Backend Opcional:** Supabase (Postgres + Auth + Storage).
- **IA Nativa (Opcional):** Gemini 2.0 Flash integrado via pipeline de "Intake" (`/admin/intake`).
- **Resiliência:** Se o Supabase não estiver configurado ou falhar, o site consome os dados locais automaticamente sem travar.

## Principais Features

1. **Execução Local Imediata:** Clone, instale as dependências e rode o portfólio completo com projetos, experiências e habilidades sem precisar criar conta em serviços externos.
2. **Intake de IA (`/admin/intake` - Opcional):** Faça upload de um PDF. O sistema extrai suas skills, cria resumos pelo Método STAR e gera os metadados.
3. **Gerador de CV LaTeX:** Integrado com um template premium open-source (`resume-template/`), devolvendo o `.tex` compilável.
4. **Admin Seguro (Opcional):** Painel protegido pelo Supabase Auth para gerenciar todo o conteúdo do seu site.
5. **Demonstração Integrada (`/intro`):** Rota de onboarding para introduzir a stack a novos usuários.

Arquivos centrais:
- `src/data/portfolioData.ts`: Fonte de dados local e de fallback do portfólio.
- `src/lib/portfolio.ts`: Camada resiliente de acesso a dados (local / Supabase).
- `src/theme/theme.ts`: Ponto único de personalização de cores e tipografia.
- `supabase/schema.sql` e `supabase/seed.sql`: Esquema e dados iniciais para quem quiser ativar o Supabase.
- `resume-template/resumes/pt-br/curriculo-Joao.tex`: Template de currículo em LaTeX atualizado.

## Como começar (Crie o seu)

Se você quer usar o DevFolio para criar o seu próprio portfólio:

1. Clique em **Use this template** ou faça um **Fork** para sua conta no GitHub.
2. Siga o setup local rápido abaixo.

## Setup local rápido (100% Local)

### 1. Instalar dependências

```bash
npm install
```

### 2. Rodar o projeto diretamente

```bash
npm run dev
```

Abra `http://localhost:3000`. O portfólio estará 100% carregado com projetos, experiências, timeline acadêmica e ícones técnicos!

---

## Configuração Opcional do Supabase (Apenas se quiser nuvem e /admin)

Se você deseja persistir seus dados na nuvem e utilizar o painel `/admin`:

#### 3.1 Criar o projeto no Supabase

1. Acesse [supabase.com](https://supabase.com) e crie uma conta gratuita.
2. Clique em **New Project** e escolha um nome e região (ex: `South America (São Paulo)`).
3. Defina uma **Database Password** forte e salve em local seguro.
4. Aguarde o projeto inicializar (~60s).

#### 3.2 Obter as credenciais

No painel do projeto:

- `Settings` → `API`
- Copie o **Project URL** e a **anon public key**

#### 3.3 Configurar variáveis de ambiente

```bash
cp .env.example .env
```

Edite o `.env`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
GEMINI_API_KEY=sua_chave_gemini_aqui
```

> **Nunca** commite o `.env` — ele já está no `.gitignore`.

#### 3.4 Criar o schema e seed

No Supabase → **SQL Editor**, execute em ordem:

```sql
-- 1. Cria tabelas, índices e policies de segurança
\i supabase/schema.sql

-- 2. Popula com dados iniciais
\i supabase/seed.sql
```

Ou copie e cole o conteúdo de cada arquivo diretamente no SQL Editor.

#### 3.5 Configurar Storage

1. Supabase → **Storage** → **New Bucket**
2. Nome: `portfolio` | marcar como **Public**
3. Crie as pastas: `projects/`, `experiences/`, `technologies/`

#### 3.6 Criar usuário admin

1. Supabase → **Authentication** → **Users** → **Add user**
2. Use email e senha que você vai usar em `/admin`

### 4. Rodar projeto

```bash
npm run dev
```

Abra `http://localhost:3000`.


## Deploy na Vercel (Produção)

Sendo um projeto Next.js nativo, a hospedagem gratuita na Vercel é o caminho mais fácil e otimizado. As páginas públicas do DevFolio possuem **ISR (Incremental Static Regeneration)** ativado, garantindo que o seu portfólio seja distribuído como HTML estático globalmente, com consultas mínimas ao Supabase.

### Passo a passo

1. **GitHub:** Certifique-se de que o código já está em um repositório no seu GitHub.
2. **Vercel:** Faça login em [vercel.com](https://vercel.com/) com sua conta do GitHub.
3. Clique em **Add New...** > **Project** e importe o repositório do seu portfólio.
4. **Environment Variables:** Na tela de configuração de build, abra a seção `Environment Variables` e copie exatamente as chaves do seu arquivo `.env`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `GEMINI_API_KEY` (opcional, ou preencha depois)
5. Clique em **Deploy** e aguarde cerca de 1 a 2 minutos.

O seu portfólio estará online num domínio `.vercel.app`. Qualquer alteração no banco de dados (via Painel Admin) ou novos commits na branch `main` serão refletidos automaticamente!

**Dica avançada (Domínio Próprio):** Se você não quiser usar o sufixo `.vercel.app`, é possível conectar um domínio personalizado (ex: `seu-nome.com.br`). Para isso:
1. Adquira o domínio em um registrador (como Registro.br, Hostinger, GoDaddy).
2. Acesse as configurações do seu projeto na Vercel > **Settings** > **Domains** e adicione o seu domínio.
3. A Vercel fornecerá os registros DNS (CNAME/A) que você deve configurar no painel do seu registrador.
4. Veja o guia completo em: [Vercel Custom Domains Documentation](https://vercel.com/docs/projects/domains/add-a-domain).

## Customizando o Visual (Temas e Estilos)

O DevFolio foi desenhado para ser facilmente alterado sem quebrar a lógica de dados. Se você quiser mudar as cores globais, tipografia, efeitos de vidro (glassmorphism) ou o layout:

Você não precisa reescrever o CSS manualmente! Basta usar a nossa skill de inteligência artificial preparada exatamente para isso: a **`restyle-ui-safe`**.
- No seu editor (Cursor/Windsurf/Copilot), abra o chat e digite: `@restyle-ui-safe Mude o tema para um estilo cyberpunk com cores neon roxo e verde, e mude a fonte para Roboto`.
- Essa skill irá alterar as paletas de cores no `src/theme/theme.ts` e ajustar a UI de forma segura e responsiva, mantendo todos os componentes do Next.js intactos.

## Como editar conteúdo (Links, Fotos e CV)

Você tem **3 caminhos** para customizar o conteúdo do seu portfólio. Escolha o mais conveniente:

### Caminho 1: Local-First (Recomendado — Menos de 3 minutos, Zero Nuvem) ⚡

É o caminho mais ágil e direto, sem necessidade de contas externas ou bancos em nuvem.

1. **Fotos e Mídias:**
   - Projetos: salve as imagens em `public/images/projects/<nome-do-projeto>.png`.
   - Experiências: salve os logos em `public/images/experiences/<empresa>.jpg`.
   - Tecnologias: salve os ícones em `public/images/tecnologies/<tecnologia>.png`.
2. **Currículo (CV):**
   - Salve o seu arquivo PDF em `public/files/curriculo.pdf` (substituindo o existente).
   - Se desejar editar o código LaTeX, use os modelos em `resume-template/resumes/pt-br/` no [Prism](https://prism.openai.com/) ou via skill `curriculo-latex-assistant`.
3. **Links e Dados:**
   - Abra `src/data/portfolioData.ts` e ajuste seus links sociais (`socialLinks`), projetos (`projectsData`), experiências (`experiencesData`) e habilidades (`skillsData`).
4. **Deploy:**
   - Suba para o GitHub e conecte à Vercel. O site já está pronto e em produção!

---

### Caminho 2: Ingestão Automatizada por IA (`/admin/intake`) 🤖

1. Acesse `/admin/intake` no seu navegador local.
2. Anexe seu currículo em PDF e cole os links dos seus repositórios do GitHub ou sites em produção.
3. Clique em **"Analisar com IA"** (utiliza a API do Google Gemini).
4. A IA extrai e organiza todas as informações pelo **Método STAR** (Situação, Tarefa, Ação, Resultado) e gera métricas de impacto.
5. Na tela de revisão:
   - **Modo Local:** Clique no botão **"Baixar portfolioData.ts"** e substitua o arquivo local.
   - **Modo Supabase:** Se configurado, clique em **"Aplicar no Supabase"**.

---

### Caminho 3: Painel Admin com Supabase (Opcional — Nuvem) ☁️

1. Configure o `.env` com as chaves do Supabase e execute `supabase/schema.sql` e `supabase/seed.sql`.
2. Acesse `/admin` e faça login com seu usuário admin.
3. Edite projetos, experiências e habilidades diretamente pelos formulários.
4. **Imagens pelo Admin:** O upload envia diretamente para o bucket público `portfolio` do Supabase Storage e gera a URL pública de forma transparente.

---

## Gerenciamento do Currículo (LaTeX & PDF)

O portfólio consome o currículo estático para os botões de download através de:
- `public/files/curriculo.pdf`

Para criar ou atualizar seu currículo profissional:
- **Template LaTeX incluído:** Na pasta `resume-template/` você encontra modelos em Português (`resumes/pt-br/curriculo.tex`) e Inglês (`resumes/en/resume.tex`).
- **Edição Sem Código:** Acesse o [Prism](https://prism.openai.com/), cole o `.tex` e edite com assistência de IA.
- **Skill Especializada:** O projeto conta com a skill `.agent/skills/curriculo-latex-assistant/SKILL.md` para auxiliar na revisão e diagramação de currículos para o mercado alvo.
- **Integração:** Após exportar o novo PDF, basta salvá-lo como `public/files/curriculo.pdf`.

---

## Área de Preparação (`content-staging/`)

Para quem prefere rascunhar o conteúdo antes de integrar ao código:
- `content-staging/markdown/`: templates estruturados em `.md` para projetos, experiências e habilidades.
- `content-staging/images/`: pastas organizadas para separar capturas e ícones antes de mover para `public/images/`.
- Consulte `content-staging/README.md` para mais orientações.

## Onde buscar ícones e imagens técnicas

- **Tech Icons:** [techicons.dev](https://techicons.dev/)
- **SVGs e Logos:** [svgl.app](https://svgl.app/) ou pesquise por `<nome-da-tecnologia> icon png` com fundo transparente.


## Prompt MCP (base)

Use o template completo em `docs/ai-intake-pipeline.md`.

Ele ja define:

- saida JSON estrita
- preservacao de acentos/cedilha
- schema de `habilidades`, `projects`, `experiences`
- lista de `warnings`

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run cypress:open  # UI Interativa do Cypress
npm run cypress:run   # Cypress headless
```

## Fallback de dados

Se o Supabase cair, estiver sem dados, ou retornar erro nas consultas, o sistema usa `src/data/portfolioData.ts` como backup para nao quebrar a exibicao.

A resiliência deste fluxo é comprovada através de:
- **Cypress E2E Tests** (`cypress/e2e/fallback.cy.ts`): Valida que a aplicação real exibe os dados locais quando offline.
- **Cypress Component Tests** (`cypress/component/App.cy.tsx`): Testa de forma isolada a injeção do Fallback na interface.
- **Extração Automatizada de CV**: Os dados de fallback (`portfolioData.ts`) podem ser gerados a partir da skill `curriculo-latex-assistant`, baseada nos arquivos do `resume-template/`.

## Agentes e Skills

O repositório unifica seus fluxos de trabalho autônomos na pasta `.agent/skills`. Utilizando esse ambiente centralizado, o desenvolvedor pode chamar agentes automatizados para:
- Atualização e gestão rigorosa de documentos (`docs-workflow`).
- Edição técnica e exportação de currículos em LaTeX (`curriculo-latex-assistant`).
- Testes autônomos e Git Workflow gerenciado (`git-flow`).
- Customização segura de temas e CSS (`restyle-ui-safe`).

## Licença

Este projeto está sob a licença [MIT](LICENSE). Desenvolvido para a comunidade open-source. Sinta-se à vontade para realizar forks, customizar o tema e hospedar seu próprio DevFolio!

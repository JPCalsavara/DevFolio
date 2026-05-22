# DevFolio AI (Next.js + Supabase + Gemini)

Este projeto é um template open-source de portfólio pessoal projetado para desenvolvedores (backend, dados, devops) que desejam um visual premium sem precisar escrever código CSS. Ele conta com um pipeline nativo de **Inteligência Artificial (Gemini)** que lê seu currículo antigo em PDF e preenche o site inteiro sozinho, além de gerar um currículo LaTeX otimizado.

- **Frontend:** Next.js (App Router) + React + MUI (Glassmorphism & Gradients)
- **Backend:** Supabase (Postgres + Auth + Storage)
- **IA Nativa:** Gemini 2.0 Flash integrado via pipeline de "Intake".
- **Fallbacks:** Se o banco falhar, usa dados mockados automaticamente.

## Principais Features

1. **Intake de IA (`/admin/intake`):** Faça upload de um PDF. O sistema extrai suas skills, cria resumos pelo Método STAR e gera os metadados.
2. **Gerador de CV LaTeX:** Integrado com um template premium open-source, devolvendo o `.tex` compilável.
3. **Admin Seguro:** Painel protegido pelo Supabase Auth para gerenciar todo o conteúdo do seu site.
4. **Demonstração Integrada (`/intro`):** Rota de onboarding para introduzir a stack a novos usuários.

Arquivos centrais:
- `src/app/api/intake/parse/route.ts`: Motor de inteligência artificial.
- `src/theme/theme.ts`: Ponto único de personalização de cores e tipografia.
- `src/app/admin/intake/page.tsx`: UI do gerador e validador de IA.
- `supabase/schema.sql`: Regras de banco de dados e RLS.

## Setup local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar o Next.js

O arquivo `next.config.ts` já vem pré-configurado. Os únicos pontos de atenção são:

- **Domínios de imagens:** o hostname `**.supabase.co` já está liberado para `next/image`.
- **Image qualities:** os valores `[72, 75, 80]` já estão definidos para evitar warnings de qualidade.
- **Variáveis de ambiente:** qualquer variável que começar com `NEXT_PUBLIC_` fica disponível no browser.

Se precisar liberar um novo domínio de imagem (ex: CDN própria):

```ts
// next.config.ts
images: {
  remotePatterns: [
    { protocol: "https", hostname: "**.supabase.co", pathname: "/storage/v1/object/public/**" },
    { protocol: "https", hostname: "sua-cdn.com" }, // adicione aqui
  ],
},
```

### 3. Configurar o Supabase

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

Sendo um projeto Next.js nativo, a hospedagem gratuita na Vercel é o caminho mais fácil e otimizado. As páginas públicas do DevFolio AI possuem **ISR (Incremental Static Regeneration)** ativado, garantindo que o seu portfólio seja distribuído como HTML estático globalmente, com consultas mínimas ao Supabase.

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

## Como editar conteudo

### Fluxo manual (mais simples)

1. Acesse `/admin` e faca login.
2. Edite projetos, experiencias e habilidades.
3. Salve cada item.

## Imagens: o que fazer

Existem 2 formas.

### A) Pelo proprio admin (recomendado)

Nos formularios de projeto/experiencia/habilidade:

1. Clique em upload de imagem.
2. O arquivo sobe no bucket `portfolio`.
3. O sistema gera automaticamente `publicUrl` com `getPublicUrl(...)`.
4. O campo de URL e preenchido automaticamente.
5. Clique em salvar para persistir no banco.

Observacao: gerar URL nao salva sozinho; precisa confirmar no botao de salvar.

### B) Pelo dashboard do Supabase

1. `Storage` -> bucket `portfolio`.
2. Upload manual em pastas como:
   - `projects/`
   - `experiences/`
   - `technologies/`
3. Copie a URL publica e cole no campo do admin.

Boas praticas para imagens:

- Use nomes de arquivo sem espacos e sem caracteres especiais.
- Prefira `webp` ou `png` comprimidos.
- Mantenha proporcao consistente para cards/carrossel.

## Como preencher com IA (CV + links + imagens)

Pipeline recomendada: `docs/ai-intake-pipeline.md`

Resumo do fluxo:

1. Pessoa envia CV + links de repositorios/projetos + imagens.
2. Backend extrai texto e metadados.
3. Agente MCP recebe prompt estrito e retorna JSON puro.
4. Sistema valida schema.
5. Admin revisa/edita.
6. Sistema faz upsert no Supabase.

Entradas sugeridas para IA:

- `cv_file` (PDF/DOCX)
- `github_links[]`
- `project_links[]`
- `image_files[]` ou `image_urls[]`
- observacoes opcionais

Importante:

- A IA nao deve escrever direto no banco.
- Sempre revisar antes de aplicar.
- URLs e slugs devem ser validados.

## Pasta sugerida para preparar conteudo

Para facilitar o uso da ferramenta, foi criada a pasta:

- `content-staging/`

Estrutura:

- `content-staging/markdown/`: textos em `.md` para projetos, experiencias e habilidades.
- `content-staging/images/projects/`: imagens de projetos.
- `content-staging/images/experiences/`: imagens de experiencias.
- `content-staging/images/habilidades/`: icones/logos de habilidades.

Fluxo recomendado:

1. Monte o conteudo textual em `.md` dentro de `content-staging/markdown/`.
2. Separe e normalize as imagens nas pastas corretas dentro de `content-staging/images/`.
3. Suba os arquivos para o Supabase (admin ou dashboard).
4. Revise os links publicos e salve no banco.

## Onde buscar icones/imagens

- Tech Icons: `https://techicons.dev/`
- Se nao achar o icone tecnico, pesquise por: `nome-da-empresa icon png`

Exemplo:

- `Datadog icon png`
- `Rancher icon png`
- `Argo CD icon png`

## Se nao tiver CV ainda

Voce pode gerar um CV rapidamente com:

- Template open source: `https://github.com/celiobjunior/resume-template` ou dentro do repositorio `.agent/skills/skills/curriculo-latex-assistante`
- Gerador online: `https://curricu.lol/cv/create`

Depois de gerar o CV, use esse arquivo no fluxo de IA (CV + links + imagens) para preencher o portfolio.

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

O repositório unifica seus fluxos de trabalho autônomos na pasta `.agent/skills/skills`. Utilizando esse ambiente centralizado, o desenvolvedor pode chamar agentes automatizados para:
- Atualização e gestão rigorosa de documentos (`docs-workflow`).
- Edição técnica e exportação de currículos em LaTeX (`curriculo-latex-assistant`).
- Testes autônomos e Git Workflow gerenciado (`git-flow`).

## Licença

Este projeto está sob a licença [MIT](LICENSE). Desenvolvido para a comunidade open-source. Sinta-se à vontade para realizar forks, customizar o tema e hospedar seu próprio DevFolio AI!

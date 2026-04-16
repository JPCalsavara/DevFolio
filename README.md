# Portfolio React (Next.js + Supabase)

Este projeto e um portfolio pessoal com area publica e painel admin.

- Frontend: Next.js (App Router) + React + MUI
- Backend de dados: Supabase (Postgres + Auth + Storage)
- Conteudo: projetos, experiencias e habilidades
- Fallback: se Supabase falhar/estiver vazio, usa dados de `src/data/portfolioData.ts`

## Como o portfolio foi construido

O projeto foi migrado de dados estaticos para Supabase:

1. Tabelas no banco para `projects`, `experiences` e `habilidades`.
2. Storage bucket `portfolio` para imagens publicas.
3. Admin com login (Supabase Auth) e CRUD de conteudo.
4. Paginas publicas consumindo Supabase.
5. Fallback automatico para `portfolioData` quando necessario.

Arquivos centrais:

- `src/lib/portfolio.ts`: leitura do Supabase + fallback para `portfolioData`.
- `src/app/admin/page.tsx`: painel admin.
- `src/app/admin/projects/[id]/page.tsx`: CRUD de projetos.
- `src/app/admin/experiences/[id]/page.tsx`: CRUD de experiencias.
- `supabase/schema.sql`: schema e policies.
- `supabase/seed.sql`: seed inicial.

## Setup local

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar ambiente

Copie `.env.example` para `.env` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_ANON_KEY
```

### 3. Aplicar banco e seed

No Supabase SQL Editor:

1. Rode `supabase/schema.sql`
2. Rode `supabase/seed.sql`

### 4. Criar usuario admin (Auth)

No Supabase Dashboard:

- `Authentication` -> `Users` -> `Create user`
- Use esse email/senha para login em `/admin`

### 5. Rodar projeto

```bash
npm run dev
```

Abra `http://localhost:3000`.

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

- Template open source: `https://github.com/celiobjunior/resume-template`
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
```

## Fallback de dados

Se o Supabase cair, estiver sem dados, ou retornar erro nas consultas, o sistema usa `src/data/portfolioData.ts` como backup para nao quebrar a exibicao.

## Proximos passos recomendados

1. Implementar rota `POST /api/intake/parse` (CV + links -> draft JSON).
2. Implementar `POST /api/intake/validate`.
3. Implementar `POST /api/intake/apply` com confirmacao humana.
4. Criar pagina `admin/intake` para revisao e aprovacao.

# Content Staging (Área de Preparação de Conteúdo)

Esta pasta serve como **área de rascunho e preparação rápida** para estruturar textos, links e imagens antes de integrá-los ao DevFolio.

---

## Estrutura de Pastas

- `markdown/`: Rascunhos em `.md` para projetos, experiências e habilidades.
  - `project-template.md` (Template para projetos com método STAR)
  - `experience-template.md` (Template para histórico profissional e conquistas)
  - `habilidade-template.md` (Template para competências técnicas)
- `images/projects/`: Rascunho de capturas e telas de projetos.
- `images/experiences/`: Rascunho de logos de empresas e fotos de atuação.
- `images/tecnologies/`: Rascunho de ícones técnicos (`.png`, `.svg` ou `.webp`).

---

## Como Utilizar

Você pode escolher um dos 2 fluxos conforme sua preferência:

### Fluxo 1: Modo Local-First (Mais Rápido — 2 a 3 minutos) ⚡
1. **Fotos:** Copie as imagens diretamente para a pasta pública equivalente do projeto:
   - De `content-staging/images/projects/` → para `public/images/projects/`
   - De `content-staging/images/experiences/` → para `public/images/experiences/`
   - De `content-staging/images/tecnologies/` → para `public/images/tecnologies/`
2. **Dados e Links:** Preencha os arquivos em `markdown/` e copie para os arrays de `src/data/portfolioData.ts`, apontando a imagem como `/images/projects/sua-imagem.png`.
3. **CV:** Salve seu currículo compilado em `public/files/curriculo.pdf`.

### Fluxo 2: Ingestão por IA (`/admin/intake`) 🤖
1. Em vez de preencher manualmente, acesse `/admin/intake`.
2. Anexe o PDF do seu currículo e cole os links dos seus repositórios do GitHub.
3. A IA estruturará os dados e permitirá **baixar o `portfolioData.ts` pronto** ou aplicar no Supabase!

### Fluxo 3: Supabase (Opcional — Banco em Nuvem) ☁️
1. Faça upload das imagens para o bucket `portfolio` no Supabase Storage.
2. Acesse o painel `/admin` do DevFolio e cadastre os itens utilizando as URLs geradas.

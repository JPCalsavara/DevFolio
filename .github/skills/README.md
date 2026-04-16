# Skills do Projeto

Este repositório possui skills especializados para operar o pipeline de conteudo do portfolio.

## Skills disponiveis

- `curriculo-latex-assistant`
  - Ajuda a criar/editar o curriculo em LaTeX (`resumes/pt-br/curriculo.tex`) e tambem no fluxo simples via Prism.

- `preencher-staging-markdown`
  - Preenche templates de `content-staging/markdown` e gera arquivos finais de projetos, experiencias e habilidades.

- `publicar-staging-supabase`
  - Publica staging no Supabase (storage + tabelas), com validacao e relatorio.

- `restyle-ui-safe`
  - Ajusta estetica (cores, tipografia, composicao) preservando logica e comportamento.

## Prompts de exemplo

- Curriculo:
  - "Use `curriculo-latex-assistant` para atualizar meu curriculo com base neste LinkedIn..."

- Preencher markdown:
  - "Use `preencher-staging-markdown` e preencha meus arquivos de projeto/experiencia/habilidade com estes dados..."

- Publicar no Supabase:
  - "Use `publicar-staging-supabase` para publicar tudo que esta em `content-staging` no Supabase e me traga um relatorio."

- Restyle visual:
  - "Use `restyle-ui-safe` para propor um novo visual com identidade mais forte, mantendo toda logica atual funcionando."

## Ordem recomendada

1. `curriculo-latex-assistant` (quando houver atualizacao de CV)
2. `preencher-staging-markdown`
3. `publicar-staging-supabase`
4. `restyle-ui-safe` (quando quiser evoluir o design)

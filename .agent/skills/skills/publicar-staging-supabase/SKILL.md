---
name: publicar-staging-supabase
description: Publica o conteudo de staging (markdown e imagens) no Supabase com seguranca, validacao previa e relatorio de upsert por entidade.
user-invocable: true
allowed-tools: "Read, Write, Edit, Bash, Glob, Grep"
---

# Publicar Staging no Supabase

Use este skill quando o usuario quiser enviar o conteudo preparado em `content-staging` para o Supabase (tabelas + storage).

## Entidades alvo

- `projects`
- `experiences`
- `habilidades`
- Bucket de imagens (ex.: `portfolio`)

## Fluxo seguro

1. Ler markdowns de staging e normalizar payloads por entidade.
2. Validar campos obrigatorios e tipos antes de qualquer escrita.
3. Validar existencia local das imagens referenciadas.
4. Fazer upload de imagens para storage e obter URLs publicas.
5. Executar upsert em lote no banco (com chave unica por `slug` ou equivalente).
6. Gerar relatorio final com inseridos, atualizados, ignorados e falhas.

## Regras de seguranca

- Nao executar `DELETE` em massa sem confirmacao explicita do usuario.
- Em caso de conflito de schema, interromper e mostrar diff esperado.
- Se faltar dado critico, interromper publicacao e listar pendencias.

## Regras de consistencia

- Preservar os slugs atuais quando ja existentes.
- Nao quebrar logica de visibilidade (`isVisible`/`hidden:*`) de habilidades.
- Garantir que links de imagem no banco apontem para objetos publicados.

## Saida esperada

- `Resumo da publicacao`
- `Tabelas afetadas`
- `Arquivos/imagens processados`
- `Erros e acoes recomendadas`

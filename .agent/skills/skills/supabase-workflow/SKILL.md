---
name: supabase-workflow
description: Safely sets up Supabase schemas, types, and handles database migrations.
---
# Supabase Schema & Migration Skill

## Contexto
O projeto gerencia o banco de dados via Supabase. Os arquivos SQL estão na pasta raiz `supabase/`.

## Regras
1. **Alterações de Schema**: Sempre que precisar alterar tabelas, crie ou atualize os arquivos `.sql` na pasta `supabase/` (ex: `schema.sql`).
2. **Atualização de Tipos**: Lembre-se de rodar o comando de geração de tipos do Supabase CLI para manter o TypeScript sincronizado, caso configurado.
3. **Seed Data**: Dados iniciais ou mockados para desenvolvimento local devem ir em `seed.sql`.

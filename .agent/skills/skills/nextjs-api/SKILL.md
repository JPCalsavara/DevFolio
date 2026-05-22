---
name: nextjs-api
description: Guides the creation of a new Next.js Route Handler or Server Action, integrating with Supabase for data access.
---
# Next.js API / Server Action Skill

## Contexto
O projeto utiliza Next.js App Router e Supabase.

## Regras
1. **Server Actions vs Route Handlers**: Prefira Server Actions (`"use server";`) para mutações chamadas diretamente de Client Components. Use Route Handlers (`src/app/api/.../route.ts`) se precisar expor uma API REST ou webhooks.
2. **Integração com Supabase**: Utilize `@supabase/ssr` e os clientes configurados em `src/lib/supabase/` para acessar o banco de dados.
3. **Segurança**: Valide inputs e sempre utilize Row Level Security (RLS) no Supabase. Não confie no input do cliente.
4. **Tipagem**: Retorne tipos estritos e tipados de acordo com o schema do Supabase.

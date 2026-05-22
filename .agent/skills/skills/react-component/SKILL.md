---
name: react-component
description: Best practices for implementing a new Next.js/React component using Material-UI (MUI), enforcing server/client component boundaries, subfolder organization, and strict responsive design rules.
---
# React/Next.js Component Skill

## Contexto
Este projeto utiliza Next.js (App Router), React 18 e Material-UI (MUI). 

## Regras para Novos Componentes
1. **Server vs Client Components**: Por padrão, crie Server Components. Adicione `"use client";` no topo do arquivo apenas se o componente precisar de estado (useState), efeitos (useEffect) ou interatividade direta do usuário (onClick).
2. **Material-UI (MUI)**: Utilize os componentes do MUI (Box, Stack, Grid, Typography, etc.). Para estilização, use a prop `sx` ou crie styled components.
3. **Responsividade**: Siga a abordagem Mobile-First. Use breakpoints do MUI na prop `sx` (ex: `sx={{ width: { xs: '100%', md: '50%' } }}`).
4. **Estrutura**: Componentes devem ser criados em `src/components/`. Se o componente for muito complexo, crie uma subpasta com `index.tsx` e divida-o em partes menores.
5. **Tipagem**: Sempre defina interfaces para as `props` usando TypeScript.

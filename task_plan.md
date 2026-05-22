# Bug Workflow - Lentidão nas Páginas

- [x] Adicionar `export const revalidate = 3600;` nas rotas públicas:
  - `src/app/page.tsx`
  - `src/app/projetos/page.tsx`
  - `src/app/projetos/[slug]/page.tsx`
  - `src/app/experiencias/page.tsx`
  - `src/app/experiencia/[slug]/page.tsx`
- [x] Adicionar um script de otimização no `src/lib/supabase/server.ts` caso possível, habilitando o fetch interno do next no supabase (usando a opção fetch).
- [x] Adicionar/Atualizar Teste (Simular carregamento em ambiente Cypress se aplicável, ou rodar o build localmente e verificar tempos e static generation).

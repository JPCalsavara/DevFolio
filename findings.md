# Bug Workflow - L lentidão nas páginas

## Root Cause Analysis
- O usuário relatou lentidão ao abrir as páginas.
- Como o app usa Next.js App Router e o Supabase para o banco de dados, a ausência de definições explícitas de cache (`export const revalidate`) faz com que, no mínimo, a aplicação não tire proveito de SSG/ISR, e no pior caso (em produção) as requisições ao Supabase ocorram dinamicamente a cada visita (SSR).
- Além disso, no modo de desenvolvimento (`npm run dev`), o Next.js não faz cache das rotas da mesma forma, o que exacerba a percepção de lentidão devido ao tempo de roundtrip da query no Supabase e tempo de compilação.
- Solução principal será implementar "Incremental Static Regeneration (ISR)" configurando `export const revalidate = 3600` (ou tempo adequado) nas páginas públicas, para que o Next.js faça cache da página gerada e a entregue instantaneamente.

## Ações
- Adicionar validações de cache e ISR.
- Garantir que as queries ao Supabase usem o fetch do Next.js se possível, ou que a página seja exportada como estática.

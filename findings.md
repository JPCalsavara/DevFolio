# Findings

## Entendimento de Arquitetura e Regras de Negócio

1. **Requisito Original:** Uma "mini landing page" que não depende de Supabase.
2. **Pivotagem:** O usuário prefere que a página aja como um `/intro` ou `/help` focado em **Onboarding** para outros desenvolvedores que pegarem este template.
3. **Público-Alvo da Página:** Pessoas técnicas e não-técnicas configurando o projeto pela primeira vez. 
4. **Fluxo a explicar na página:**
   - Como ver a demonstração (imagens/video).
   - Como usar a Inteligência Artificial para não ter que preencher banco "na mão" (AI Intake Pipeline).
   - Como configurar as tabelas no Supabase e popular o site.
   - Como trocar temas/deploy.
5. **Ação Técnica:** O antigo `/gerador-cv` (ou seu conteúdo) será adaptado ou renomeado para suportar essa visão macro do projeto, possivelmente absorvendo a interface de upload do CV de forma educativa.

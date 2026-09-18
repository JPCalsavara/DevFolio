-- DevFolio Seed Data
-- Generated from Supabase CSV exports and updated profile data

-- 1. Habilidades
insert into public.habilidades (id, name, label, type, link, icon_url)
values
  ('08cdd446-1341-4dc8-8474-1ac36ef8c8ec', 'vercel', 'Vercel', 'devops', 'https://vercel.com/', 'https://lvokqacgnslrheltmjcj.supabase.co/storage/v1/object/public/portfolio/technologies/1776279527844-vercel.png'),
  ('092661d1-70dc-4858-a4b5-9c41506fd468', 'swagger', 'Swagger', 'backend', 'https://swagger.io/', NULL),
  ('0b822592-bd5a-4da1-adce-7001bb33efe0', 'llm', 'LLM', 'all', 'https://en.wikipedia.org/wiki/Large_language_model', NULL),
  ('0eab076f-4b35-40db-84ef-7cd572983b73', 'comunicacao', 'Comunicação', 'hidden:softskill', NULL, NULL),
  ('152b0007-8f21-48ef-bb80-3d1f23b95e18', 'git', 'Git', 'all', 'https://git-scm.com/', NULL),
  ('17e67d8d-355e-4a4c-be01-904def3e41a7', 'xunit', 'xUnit', 'backend', 'https://xunit.net/', NULL),
  ('3a6c53d3-24ea-4095-9018-a22843c48965', 'pubsub', 'Pub/Sub', 'backend', 'https://cloud.google.com/pubsub', NULL),
  ('3b1b4135-d0c2-4452-bfe6-cebec67ee9be', 'cleanarchitecture', 'Clean arch', 'hidden:backend', 'https://8thlight.com/insights/a-color-coded-guide-to-clean-architecture', NULL),
  ('3ca228db-21ad-4186-9a36-c5f1696e1864', 'javascript', 'JavaScript', 'all', 'https://pt.wikipedia.org/wiki/JavaScript', NULL),
  ('4897d0ef-bfdd-4ec9-b385-2db11561876a', 'angular', 'Angular', 'frontend', 'https://angular.dev/', NULL),
  ('4ea5820d-f33b-45c5-9d8c-0aa9e3a1a638', 'tailwind', 'Tailwind', 'frontend', 'https://tailwindcss.com', NULL),
  ('53da7c48-005a-4712-a3ca-7079fbe6cf2e', 'mysql', 'MySQL', 'database', 'https://www.mysql.com/', NULL),
  ('5676c408-3591-4d21-94a8-9e210013d27c', 'c++', 'C++', 'backend', 'https://en.wikipedia.org/wiki/C%2B%2B', NULL),
  ('64aa144d-b800-4009-bfd5-b69935bbe76f', 'dockercompose', 'Compose', 'backend', 'https://docs.docker.com/compose/', NULL),
  ('68f48e4c-7c9e-484c-a545-32e105957038', 'rabbitmq', 'RabbitMQ', 'backend', 'https://www.rabbitmq.com/', NULL),
  ('6bb885e9-be83-4ca9-a360-0d3eb05c9028', 'express', 'Express', 'backend', 'https://expressjs.com', NULL),
  ('7e1e5755-51e6-4115-bbce-b9783c693760', 'lideranca', 'Liderança', 'hidden:softskill', NULL, NULL),
  ('7f3f1a5e-dac3-4e1c-a1dd-309dcb4c49cd', 'ddd', 'DDD', 'hidden:backend', 'https://en.wikipedia.org/wiki/Domain-driven_design', NULL),
  ('8221de8d-e72f-4768-9cc4-1a50ddc10fe6', 'node', 'Node', 'backend', 'https://nodejs.org', NULL),
  ('8454b3a3-daa9-4c53-8ed7-da6cc0476e6d', 'nginx', 'NGINX', 'devops', 'https://nginx.org/', NULL),
  ('8539e524-036a-4dd1-b895-1f7738f5a8f7', 'docker', 'Docker', 'devops', 'https://www.docker.com/', NULL),
  ('8ef2310e-c504-40a7-ae81-2fa4b79185d0', 'rancher', 'Rancher', 'devops', 'https://www.rancher.com/', NULL),
  ('942c68e1-d6e7-4780-aff9-858ea47b8a22', 'linux', 'Linuxa', 'devops', 'https://www.linux.org/', NULL),
  ('9abaf945-9dc4-46bd-bfe6-b82ab52f9e6f', 'html', 'HTML', 'frontend', 'https://developer.mozilla.org/en-US/docs/Web/HTML', NULL),
  ('9dd199a4-9653-40d4-a295-9b19d1ee5165', 'dotnet', '.NET', 'backend', 'https://dotnet.microsoft.com/', NULL),
  ('9e3d5d7f-3239-46a4-b23e-14b0c7eb46f5', 'lamp', 'LAMP', 'hidden:devops', 'https://en.wikipedia.org/wiki/LAMP_(software_bundle)', NULL),
  ('a36e0991-b176-481e-8146-741e5bc4feb3', 'c', 'C', 'backend', 'https://en.wikipedia.org/wiki/C_(programming_language)', NULL),
  ('ab4de1ec-8fc2-49d6-9499-a19df8559f4f', 'datadog', 'Datadog', 'devops', 'https://www.datadoghq.com/', NULL),
  ('ae272bb0-57c6-41b5-8fcb-9eb122bce511', 'react', 'React', 'frontend', 'https://reactjs.org', NULL),
  ('b1522dab-b2e7-4d56-99d1-30398aace551', 'csharp', 'C#', 'backend', 'https://learn.microsoft.com/dotnet/csharp/', NULL),
  ('b6b46597-9e70-4aad-ad28-00ddb77fcd70', 'uml', 'UML', 'all', 'https://en.wikipedia.org/wiki/Unified_Modeling_Language', NULL),
  ('b7662fe3-eff6-4061-8a7d-1baa2e8fe956', 'materialui', 'Material UI', 'frontend', 'https://mui.com/material-ui/', NULL),
  ('bb8c08de-e7cd-4b2a-a490-7fab4df6955e', 'supabase', 'Supabase', 'database', 'https://supabase.com/', NULL),
  ('bce6b4e2-78cb-4aeb-915a-700c94abf163', 'typescript', 'TypeScript', 'all', 'https://www.typescriptlang.org', NULL),
  ('bd875873-4cc9-48bb-9835-dc8199b33e5a', 'prisma', 'Prisma ORM', 'backend', 'https://www.prisma.io', NULL),
  ('be73021f-290b-496f-a214-cd0e2aca2448', 'python', 'Python', 'backend', 'https://www.python.org/', NULL),
  ('c7c0d52d-1855-47b5-a54c-42770ea904e5', 'design', 'Design', 'hidden:softskill', NULL, NULL),
  ('cb82b236-7fc2-43cd-ae1f-c0081ae89b47', 'css', 'CSS', 'frontend', 'https://developer.mozilla.org/en-US/docs/Web/CSS', NULL),
  ('d215f987-ecbc-4d07-842a-71b947b699c7', 'aws', 'AWS', 'devops', 'https://aws.amazon.com/', NULL),
  ('d476fb52-a267-41ad-9fd0-7d1c59649a33', 'php', 'PHP', 'backend', 'https://www.php.net/', NULL),
  ('d71318cf-888f-42bf-af17-a32c1f2a2472', 'oratoria', 'Oratória', 'hidden:softskill', NULL, NULL),
  ('df09bfea-e0e2-4076-b947-d1a4bbca8d6d', 'nextjs', 'Nextjs', 'frontend', 'https://nextjs.org/', NULL),
  ('e75d5ea8-a900-4492-9688-826b24ed5f3f', 'kubernetes', 'Kubernets', 'devops', 'https://kubernetes.io/', NULL),
  ('f132a8ef-ca57-4d37-8c17-fd90d107f427', 'moq', 'Moq', 'backend', 'https://github.com/moq/moq', NULL),
  ('fa4b671f-3c12-4034-b984-11d9a41500c3', 'argocd', 'Argo CD', 'devops', 'https://argo-cd.readthedocs.io/', NULL),
  ('fda00261-9b1f-4ec8-a876-c047701686fb', 'insomnia', 'Insomnia', 'all', 'https://insomnia.rest/', NULL),
  ('fffde761-3889-4170-b5be-9a68b6dd2bde', 'postgres', 'PostgreSQL', 'database', 'https://www.postgresql.org/', NULL)
on conflict (name) do update set
  label = excluded.label,
  type = excluded.type,
  link = excluded.link,
  icon_url = excluded.icon_url;

-- 2. Projects
insert into public.projects (id, slug, title, summary_line, period, technologies, description, image_url, production_link, repository_link, details_goal, details_highlights, details_impact)
values
  ('219f4ad3-e92a-416c-8745-72e728c1fd80', 'projeto-web-faculdade', 'Jogo da Memória', 'Jogo da Memoria do Mario para disciplina de Web', 'Mar - Jun 2025', ARRAY['html', 'css', 'javascript', 'php', 'mysql', 'lamp']::text[], 'Jogo da Memoria interativo desenvolvido na disciplina SI401 para estimular memoria visual e atencao. O objetivo e encontrar todos os pares em um tabuleiro embaralhado, com registro de movimentos e tempo de conclusao para aumentar o desafio.', 'https://lvokqacgnslrheltmjcj.supabase.co/storage/v1/object/public/portfolio/projects/JogoDaMemoriaMario.png', NULL, 'https://github.com/JPCalsavara/SI401-JogoDaMemoria', 'Desenvolver um jogo da memoria web para exercitar atencao e memoria visual em ambiente academico.', ARRAY['Tabuleiro dinamico com pares embaralhados e feedback visual de progresso.', 'Registro de tempo e movimentos para aumentar desafio e medir desempenho.', 'Implementacao web com HTML, CSS, JavaScript, PHP e MySQL em ambiente LAMP.']::text[], 'Consolidou fundamentos de desenvolvimento web completo e integracao com backend e banco.'),
  ('86f17e0a-484c-4e44-8a28-33c694c54cdb', 'ju-decoracao-de-natal', 'Ju Decoracao de Natal', 'Plataforma full-stack para captacao qualificada de leads', 'Jul - Ago 2025', ARRAY['nextjs', 'typescript', 'tailwind', 'supabase', 'vercel', 'postgres']::text[], 'Aplicacao web full-stack criada para transformar o portfolio de uma decoradora de Natal em uma ferramenta de negocio, com galeria interativa, filtros avancados e automacao de captacao de leads.', 'https://lvokqacgnslrheltmjcj.supabase.co/storage/v1/object/public/portfolio/projects/JuDecoracaoDeNatal.png', 'https://www.ju-decoracao-de-natal.com.br/', 'https://github.com/JPCalsavara/ju-decoradoracao-de-natal-site', 'Digitalizar o portfolio e o atendimento de uma decoradora para gerar credibilidade e captacao de leads.', ARRAY['Galeria dinamica com filtros avancados e experiencia orientada a conversao.', 'Fluxo de orcamento com persistencia de dados e integracao de contato via WhatsApp.', 'Entrega full-stack com Next.js e Supabase, pronta para evolucao de negocio.']::text[], 'Transformou atendimento artesanal em operacao digital com melhor apresentacao comercial.'),
  ('9158adbc-1146-4e78-9b86-6e2c361ee2d9', 'interceptorsystem', 'InterceptorSystem', 'Plataforma de Gestao em Seguranca', 'Nov 2024 - Atual', ARRAY['dotnet', 'csharp', 'angular', 'cleanarchitecture', 'ddd', 'postgres', 'docker', 'kubernetes', 'xunit', 'moq', 'aws']::text[], 'Projeto full stack para gestao patrimonial. Estruturado em .NET 8 com Clean Architecture e DDD (monolito modular), com foco em escalabilidade, confiabilidade das regras de negocio e cobertura de testes unitarios/integracao.', 'https://lvokqacgnslrheltmjcj.supabase.co/storage/v1/object/public/portfolio/projects/InterceptorSystem.png', 'https://d1wq60pm5w8m2y.cloudfront.net/', 'https://github.com/JPCalsavara/InterceptorSystem', 'Plataforma SaaS de gestao de seguranca patrimonial para clientes, com backend em .NET 8 e frontend em Angular.', ARRAY['Dominio estruturado com Clean Architecture e DDD para escalar regras de negocio complexas.', 'Fluxo completo com autenticacao JWT, contas SaaS e integracoes de notificacao.', 'Evolucao incremental com foco em confiabilidade e observabilidade de ponta a ponta.']::text[], 'Projeto orientado a escalar operacoes criticas com seguranca, qualidade de codigo e arquitetura sustentavel.'),
  ('b1611282-7699-4838-9edf-62f0fe455724', 'projeto-analise-faculdade', 'Projeto de Analise', 'Analise e modelagem de solucao de software', 'Set - Dez 2024', ARRAY['c', 'uml']::text[], 'Projeto academico focado em analise de requisitos, modelagem de dominio e estruturacao de solucao de software com documentacao tecnica.', NULL, NULL, 'https://github.com/JPCalsavara/gerenciador-credenciais', 'Transformar requisitos em uma solucao de software bem modelada e documentada.', ARRAY['Levantamento e priorizacao de requisitos funcionais e nao funcionais.', 'Modelagem de dominio e documentacao tecnica para orientar implementacao.', 'Definicao de escopo com foco em viabilidade e qualidade de entrega.']::text[], 'Aprimorou a visao de engenharia de software da analise ate a definicao de arquitetura.'),
  ('d33ee58b-355c-45ed-a550-5c8ba936d82c', 'semeia-code', 'Semeia Code', 'Projeto de extensao em educacao', 'Jul 2024 - Fev 2026', ARRAY['lideranca', 'comunicacao', 'oratoria', 'design', 'python']::text[], 'Projeto de extensao criado do zero para ampliar o acesso a educacao tecnologica no ensino medio. Coordenacao executiva, estruturacao da metodologia e lideranca de equipe multidisciplinar com impacto direto em mais de 20 estudantes.', 'https://lvokqacgnslrheltmjcj.supabase.co/storage/v1/object/public/portfolio/projects/SemeiaCode.jpeg', NULL, NULL, 'Criar uma iniciativa de extensao para democratizar o ensino de tecnologia no ensino medio.', ARRAY['Coordenacao executiva e educacional da iniciativa com organizacao de equipe multidisciplinar.', 'Estruturacao de metodologia de ensino, processos seletivos e trilhas de aula.', 'Impacto direto em turmas de alunos com continuidade do projeto apos transicao de lideranca.']::text[], 'Projeto com forte componente social e de lideranca, conectando universidade e escola publica.'),
  ('df897e84-c281-4c73-a842-c9fd685e6946', 'projeto-threads-faculdade', 'Projeto Threads', 'Processamento paralelo com comparacao de desempenho', 'Ago - Nov 2024', ARRAY['c', 'linux']::text[], 'Projeto da faculdade voltado a concorrencia e paralelismo com merge sort em C, avaliando ganho de performance com diferentes quantidades de threads.', NULL, NULL, 'https://github.com/JPCalsavara/mergesort', 'Comparar desempenho de processamento sequencial e paralelo em cenarios de ordenacao.', ARRAY['Implementacao de merge sort em C com variacoes de paralelismo por threads.', 'Medicao e comparacao quantitativa de ganho de performance por configuracao.', 'Estudo de concorrencia, sincronizacao e limites praticos de escala.']::text[], 'Fortaleceu fundamentos de sistemas e performance com abordagem experimental.'),
  ('fdcbec70-1b73-41b4-94e1-4ab3fb396784', 'portfolio-pessoal', 'Portfolio Pessoal', 'Vitrine profissional para projetos e experiencia', 'Jan 2026 - Atual', ARRAY['nextjs', 'typescript', 'react', 'tailwind', 'materialui', 'supabase', 'postgres']::text[], 'Portfolio para consolidar minha apresentacao profissional em engenharia de software, com foco em backend, projetos de impacto e experiencias em cloud e observabilidade.', 'https://lvokqacgnslrheltmjcj.supabase.co/storage/v1/object/public/portfolio/projects/Portifolio.png', 'https://joaocalsavara.vercel.app/', 'https://github.com/JPCalsavara/portifolioReact', 'Centralizar minha apresentacao profissional em uma vitrine moderna, objetiva e facil de atualizar.', ARRAY['Estrutura para destacar projetos, experiencias e habilidades com narrativa tecnica clara.', 'Interface em Next.js e MUI, preparada para dados dinamicos via Supabase.', 'Area administrativa para CRUD de conteudo e manutencao continua do portfolio.']::text[], 'Portifolio como peca de posicionamento profissional e demonstracao de capacidade tecnica.')
on conflict (slug) do update set
  title = excluded.title,
  summary_line = excluded.summary_line,
  period = excluded.period,
  technologies = excluded.technologies,
  description = excluded.description,
  image_url = excluded.image_url,
  production_link = excluded.production_link,
  repository_link = excluded.repository_link,
  details_goal = excluded.details_goal,
  details_highlights = excluded.details_highlights,
  details_impact = excluded.details_impact;

-- 3. Experiences
insert into public.experiences (id, slug, title, location, period, role, summary, achievements, skills_learned, image_urls, intro_title, intro)
values
  ('36476800-8b9d-4508-942d-88f9a56fd2e8', 'atria', 'Atria Jr.', 'Limeira, Sao Paulo, Brasil - Hibrido', 'Mai 2024 - Set 2025', 'Assessor Comercial e Desenvolvedor Backend - Estagio', 'Na Empresa Junior atuei em duas frentes: marketing e comercial em 2024, e backend em 2025, com evolucao da prospeccao e requisitos ate arquitetura e infraestrutura de software.', ARRAY['Reestruturacao do blog com foco em SEO, superando 1.000 usuarios organicos por mes.', 'Atuacao em pre-vendas com diagnostico tecnico, requisitos e apoio a precificacao.', 'Desenvolvimento backend em TypeScript com DDD/Clean Architecture e PostgreSQL/Prisma.', 'Apoio na infraestrutura com Docker, Docker Compose e AWS para deploy e staging.']::text[], ARRAY['comunicacao', 'lideranca', 'oratoria', 'html', 'css', 'design', 'typescript', 'node', 'docker', 'dockercompose', 'aws', 'postgres', 'prisma', 'ddd', 'cleanarchitecture']::text[], ARRAY['https://lvokqacgnslrheltmjcj.supabase.co/storage/v1/object/public/portfolio/experiences/atria.jpeg']::text[], 'Atria Jr.', 'Empresa junior da Unicamp em Limeira que une formacao empresarial, tecnologia e impacto pratico. Ao longo da jornada, a atuacao passou por marketing/comercial em 2024 e por backend/infraestrutura em 2025.'),
  ('6441397d-f583-46ad-8a36-98d5095d7bf2', 'mottu', 'Mottu', 'São Paulo, SP', 'Set 2025 - Atual', 'Desenvolvedor Backend (Estagiario)', 'Unicornio brasileiro de mobilidade. Atuacao no Squad de Infracoes e Multas focada em redundancia e dados estrategicos.', ARRAY['Arquitetura Orientada a Eventos & Core Business: assegurei a consistencia de dados operacionais e a retencao de repasses financeiros sem falhas de concorrencia, ao desenvolver e orquestrar microsservicos seguros em .NET 8 utilizando mensageria (Pub/Sub), Docker e Kubernetes para lidar com complexidades espaciais (lat/long) e temporais (UTC).', 'Inovacao (IA) & Reducao de Custos: eliminei 2 horas de trabalho manual diario da operacao logistica, triando e processando com sucesso mais de 1.200 notificacoes/mes, ao arquitetar um CronJob em Kubernetes integrado a um LLM (Engenharia de Prompt / Few-Shot), salvando no PostgreSQL e mitigando multas NICs.', 'Sustentacao & Observabilidade: evitei a perda de dezenas de milhares de reais semanais em penalidades, reduzindo drasticamente o tempo de resolucao de incidentes de producao, ao criar paineis de monitorizacao analitica e alertas em tempo real no Datadog para um ecossistema hibrido (VMs e K8s).']::text[], ARRAY['dotnet', 'csharp', 'postgres', 'rabbitmq', 'pubsub', 'kubernetes', 'docker', 'datadog', 'rancher', 'argocd', 'llm']::text[], ARRAY['https://lvokqacgnslrheltmjcj.supabase.co/storage/v1/object/public/portfolio/experiences/Mottu.jpg']::text[], 'Mottu', 'Unicornio brasileiro de mobilidade com forte cultura de operacao, tecnologia e escala. No time de Infracoes e Multas, atuei em solucoes orientadas a eventos e em observabilidade para processos criticos de negocio.'),
  ('f760cc19-faec-4c90-a213-d368a367e4de', 'semeia-code', 'Semeia Code', 'Limeira, Sao Paulo, Brasil', 'Jul 2024 - Fev 2026', 'Co-fundador e Coordenador Executivo/Educacional', 'Co-fundei o Semeia Code para levar aulas de programacao a escolas publicas e aproximar talentos do ensino medio da universidade.', ARRAY['Escrita cientifica para estruturar o projeto inicial e validar o modelo pedagogico.', 'Reestruturacao de cargos, processo seletivo, reunioes e modelos de aula para continuidade.', 'Conducao de turmas e suporte a novos coordenadores, mantendo evolucao da iniciativa.']::text[], ARRAY['lideranca', 'comunicacao', 'oratoria', 'design', 'python']::text[], ARRAY['https://lvokqacgnslrheltmjcj.supabase.co/storage/v1/object/public/portfolio/experiences/PrimeiraTurmaSemeia.jpg']::text[], 'Semeia Code', 'Projeto de aulas de programacao em escolas publicas criado para aproximar alunos do ensino medio da universidade e da tecnologia, com forte papel social, pedagogico e de organizacao de comunidade.')
on conflict (slug) do update set
  title = excluded.title,
  location = excluded.location,
  period = excluded.period,
  role = excluded.role,
  summary = excluded.summary,
  achievements = excluded.achievements,
  skills_learned = excluded.skills_learned,
  image_urls = excluded.image_urls,
  intro_title = excluded.intro_title,
  intro = excluded.intro;

// cypress/e2e/intake.cy.ts
// E2E — Fluxo da página admin/intake

describe("Admin Intake Page", () => {
  it("carrega a página com o formulário de entrada", () => {
    cy.visit("/admin/intake");
    cy.contains("Intake de Portfólio via IA").should("be.visible");
    cy.get("textarea").first().should("exist");
    cy.contains("button", "Analisar com IA").should("be.visible");
  });

  it("botão 'Analisar' fica desabilitado quando todos os campos estão vazios", () => {
    cy.visit("/admin/intake");
    cy.contains("button", "Analisar com IA").should("be.disabled");
  });

  it("habilita botão ao digitar no campo de CV", () => {
    cy.visit("/admin/intake");
    cy.get("textarea").first().type("João Pedro - Backend Developer");
    cy.contains("button", "Analisar com IA").should("not.be.disabled");
  });

  it("chama /api/intake/parse e exibe a tela de revisão (com mock)", () => {
    // Intercepta a chamada de parse e retorna um mock
    cy.intercept("POST", "/api/intake/parse", {
      statusCode: 200,
      body: {
        draft: {
          habilidades: [
            { name: "typescript", label: "TypeScript", type: "backend", link: null, icon_url: null },
          ],
          projects: [
            {
              slug: "meu-projeto",
              title: "Meu Projeto",
              summary_line: null,
              period: "2024",
              technologies: ["typescript"],
              description: "Projeto de teste",
              image_url: null,
              production_link: null,
              repository_link: null,
              details_goal: null,
              details_highlights: [],
              details_impact: null,
            },
          ],
          experiences: [],
          warnings: ["Mock de teste"],
        },
      },
    }).as("parseRequest");

    cy.visit("/admin/intake");
    cy.get("textarea").first().type("CV de teste");
    cy.contains("button", "Analisar com IA").click();
    cy.wait("@parseRequest");

    // Deve exibir a tela de revisão
    cy.contains("Habilidades (1)").should("be.visible");
    cy.contains("Projetos (1)").should("be.visible");
    cy.contains("TypeScript").should("be.visible");
  });

  it("exibe resultado de validação ao clicar em 'Validar draft'", () => {
    cy.intercept("POST", "/api/intake/parse", {
      statusCode: 200,
      body: {
        draft: {
          habilidades: [{ name: "node", label: "Node.js", type: "backend", link: null }],
          projects: [],
          experiences: [],
          warnings: [],
        },
      },
    }).as("parseRequest");

    cy.intercept("POST", "/api/intake/validate", {
      statusCode: 200,
      body: { valid: true, errors: [], warnings: ["Nenhum projeto no draft"] },
    }).as("validateRequest");

    cy.visit("/admin/intake");
    cy.get("textarea").first().type("CV");
    cy.contains("button", "Analisar com IA").click();
    cy.wait("@parseRequest");

    cy.contains("button", "Validar draft").click();
    cy.wait("@validateRequest");

    cy.contains("Draft válido").should("be.visible");
  });

  it("botão 'Aplicar' fica habilitado apenas após validação bem-sucedida", () => {
    cy.intercept("POST", "/api/intake/parse", {
      statusCode: 200,
      body: { draft: { habilidades: [], projects: [], experiences: [], warnings: [] } },
    });

    cy.intercept("POST", "/api/intake/validate", {
      statusCode: 200,
      body: { valid: true, errors: [], warnings: [] },
    }).as("validate");

    cy.visit("/admin/intake");
    cy.get("textarea").first().type("CV");
    cy.contains("button", "Analisar com IA").click();

    // Antes de validar, o botão deve estar desabilitado
    cy.contains("button", "Aplicar no Supabase").should("be.disabled");

    cy.contains("button", "Validar draft").click();
    cy.wait("@validate");

    // Após validação com sucesso, deve estar habilitado
    cy.contains("button", "Aplicar no Supabase").should("not.be.disabled");
  });
});

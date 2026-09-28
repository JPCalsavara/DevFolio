describe('Admin Page Flow', () => {
  it('loads the admin page successfully', () => {
    cy.visit('/admin');
    
    // In dev mode, auto-authenticates to the local-first admin dashboard
    // In prod mode, displays the login form
    cy.get('body').then(($body) => {
      if ($body.find('input[type="email"]').length > 0) {
        cy.get('input[type="email"]').should('be.visible');
        cy.get('input[type="password"]').should('be.visible');
        cy.contains('button', 'Entrar').should('be.visible');
      } else {
        // Dashboard is directly available in dev mode
        cy.contains('Painel DevFolio').should('be.visible');
        cy.contains('Perfil & Bio').should('be.visible');
        cy.contains('Estética & Tema').should('be.visible');
        cy.contains('Currículo (CV)').should('be.visible');
        cy.contains('Projetos').should('be.visible');
      }
    });
  });

  it('allows navigating between admin tabs in dev mode', () => {
    cy.visit('/admin');
    cy.get('body').then(($body) => {
      if ($body.find('input[type="email"]').length === 0) {
        cy.contains('Estética & Tema').click();
        cy.contains('Presets Visuais Rápidos').should('be.visible');

        cy.contains('Currículo (CV)').click();
        cy.contains('Configuração do Currículo').should('be.visible');
      }
    });
  });
});

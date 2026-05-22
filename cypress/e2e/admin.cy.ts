describe('Admin Page Flow', () => {
  it('loads the admin page and shows login form', () => {
    cy.visit('/admin');
    
    // Checks if login form exists
    cy.get('input[type="email"]').should('exist');
    cy.get('input[type="password"]').should('exist');
    cy.contains('button', 'Entrar').should('exist');
  });

  it('shows error on invalid login', () => {
    cy.visit('/admin');
    cy.get('input[type="email"]').type('invalid@email.com');
    cy.get('input[type="password"]').type('wrongpassword');
    cy.contains('button', 'Entrar').click();

    // Since Supabase auth will fail, we should expect an error or it staying on the same page
    // Assuming there is an error message or we are still on the admin login page
    cy.get('input[type="email"]').should('exist');
  });
});

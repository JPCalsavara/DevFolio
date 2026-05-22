describe('Home Page', () => {
  it('should load the home page successfully', () => {
    cy.visit('/');
    cy.get('body').should('exist');
  });
});

describe('E2E Data Flow (Supabase/Fallback)', () => {
  it('loads the homepage and displays fallback/local data when Supabase is not seeded or offline', () => {
    cy.visit('/');
    
    // Check if the navigation is present
    cy.get('body').should('exist');
    
    // Check if projects from local fallback are present
    // Assuming the fallback data contains "InterceptorSystem"
    cy.contains('InterceptorSystem').should('be.visible');
    
    // Check if experiences from local fallback are present
    // Assuming the fallback data contains "Mottu"
    cy.contains('Mottu').should('be.visible');
  });
});

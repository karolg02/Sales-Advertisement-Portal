describe('Test logowania', () => {
  it('Powinien zalogować użytkownika z poprawnymi danymi', () => {
    cy.visit('http://localhost:5173/login');

    cy.get('input[name="Email"]').type('root@gmiall.com');
    cy.get('input[name="Password"]').type('rootroot');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Witaj, TwojaNazwaUżytkownika').should('be.visible');
  });
});

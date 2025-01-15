describe('Test logowania użytkownika', () => {
  it('Powinien poprawnie zalogować użytkownika z poprawnymi danymi', () => {
    cy.login('tester@gmail.com', 'test1234');
    cy.url().should('include', '/offers');
  });

  it('Powinien wyświetlić błąd dla nieprawidłowych danych logowania', () => {
    cy.login('tester@gmail.com', 'test1111');
    cy.url().should('include', '/login');
    cy.contains('Nie udało się zalogować').should('be.visible');
  });

  it('Powinien wyświetlić błąd, jeśli pola logowania są puste', () => {
    cy.visit('http://localhost:5173/login');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');
  });
});

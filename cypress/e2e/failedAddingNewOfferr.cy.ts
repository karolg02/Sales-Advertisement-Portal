describe('Test dodawanie nowej czśściowo pustej oferty', () => {
  it('Powinien wyświetlić błąd, jeśli niektóre pola oferty są puste', () => {
    cy.login('tester@gmail.com', 'test1234');
    cy.url().should('include', '/offers');

    cy.visit('http://localhost:5173/offers/new');

    cy.contains('Wypełnij formularz').should('be.visible');

    cy.get('textarea[placeholder="tytuł"]').type('Direct Action Spitfire MKII');
    cy.get('textarea[placeholder="opis"]').type('Ta kamizelka jest świetna a w kamuflażu multicam to już w ogóle.');
    cy.get('input[placeholder="zł"]').type('1499.99');
    cy.get('input[data-path="amount"]').type('100');
    cy.get('input[placeholder="miasto"]').type('Warszawa');

    cy.get('button[type="submit"]').contains('Złóż oferte').click();

    cy.contains('Nie udało się dodać oferty!').should('be.visible');
  });
});

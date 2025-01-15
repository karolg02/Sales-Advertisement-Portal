describe('Profile Comment Test', () => {

  it('should navigate to the profile page successfully', () => {
    cy.login('tester@gmail.com', 'test1234');
    cy.url().should('include', '/offers');
    cy.get('svg[data-avatar-placeholder-icon="true"]')
        .should('be.visible')
        .click();

    cy.contains('span', 'Mój profil')
        .should('be.visible')
        .click();

    cy.url().should('include', '/profile/6');
    cy.contains('Profil użytkownika').should('be.visible');
  });
  it('Powinien zablokować dodanie sobie komentarza i wyświetlić komunikat', () => {
    cy.login('tester@gmail.com', 'test1234');
    cy.url().should('include', '/offers');

    cy.get('svg[data-avatar-placeholder-icon="true"]')
        .should('be.visible')
        .click();

    cy.contains('span', 'Mój profil')
        .should('be.visible')
        .click();

    cy.get('textarea[placeholder="treść komentarza"]').type('Próbny komentarz');
    cy.get('input[data-path="rating"]').type('3');

    cy.get('button').contains('Dodaj komentarz').click();

  });
});

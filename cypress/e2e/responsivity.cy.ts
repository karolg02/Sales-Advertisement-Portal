describe('Test responsywności dla zalogowanego użytkownika', () => {
  const viewports = [
    { device: 'iPhone 6', width: 375, height: 667 },
    { device: 'iPad Mini', width: 768, height: 1024 },
    { device: 'Laptop', width: 1440, height: 900 },
  ];

  before(() => {
    // Logowanie przed rozpoczęciem testów
    cy.login('TwojEmail@example.com', 'TwojeHaslo');
  });

  viewports.forEach((viewport) => {
    it(`Powinien poprawnie wyświetlać stronę na ${viewport.device}`, () => {
      // Ustaw rozdzielczość ekranu
      cy.viewport(viewport.width, viewport.height);

      // Odwiedź stronę główną po zalogowaniu
      cy.visit('http://localhost:5173/dashboard');

      // Sprawdź, czy kluczowe elementy są widoczne
      cy.get('header').should('be.visible');
      cy.get('nav').should('be.visible');
      cy.get('main').should('be.visible');

      // Dodaj dodatkowe asercje w zależności od układu dla danej rozdzielczości
      if (viewport.device === 'iPhone 6') {
        // Sprawdź, czy menu mobilne jest widoczne
        cy.get('.mobile-menu').should('be.visible');
      } else {
        // Sprawdź, czy menu desktopowe jest widoczne
        cy.get('.desktop-menu').should('be.visible');
      }
    });
  });
});


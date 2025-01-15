/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        login(email: string, password: string): Chainable<void>;
        uploadFile(selector: string, fileName: string): Chainable<void>;
    }
}

Cypress.Commands.add('login', (email: string, password: string) => {
    cy.visit('http://localhost:5173/login');
    cy.get('input[placeholder="Enter your email"]').type(email);
    cy.get('input[placeholder="Enter your password"]').type(password);
    cy.get('button[type="submit"]').click();
});

Cypress.Commands.add('uploadFile', (selector: string, fileName: string) => {
    cy.get(selector).attachFile(fileName);
});

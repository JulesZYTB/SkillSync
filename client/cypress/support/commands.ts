/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>
    }
  }
}

Cypress.Commands.add('login', (email, password) => {
  cy.visit('http://localhost:3000/login');
  cy.get('#email').type(email);
  cy.get('#password').type(`${password}{enter}`);
  cy.get('#root button.flex span').should('contain.text', 'Déconnexion');
});
/// <reference types="cypress"/>

describe('Versions page', () => {
    context('Unauthorized', () => {
        beforeEach(() => {
            cy.login();
        });
        it('can visit versions page', () => {
            cy.visit('/versions');
            cy.contains('Admin versions').should('exist');
            cy.get('[data-testid="switcher"]').should('have.length', 10);
            cy.get('[data-testid="switcher"]')
                .eq(3)
                .click()
                .then(() => {
                    cy.contains('Confirm toggle version').should('exist');
                })
                .then(() => {
                    cy.get('#confirmed').click();
                })
                .then(() => {
                    cy.contains('Version active toggled').should('exist');
                });
        });
    });
});

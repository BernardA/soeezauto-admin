/// <reference types="cypress"/>

describe('Home page', () => {
    context('Unauthorized', () => {
        beforeEach(() => {
            // login before each test
            cy.login();
        });
        it('can visit homepage', () => {
            // after cy.request, the session cookie has been set
            // and we can visit a protected page
            cy.visit('/');
            cy.get('main').should('contain', 'Lorem ipsum dolor');
        });
    });
});

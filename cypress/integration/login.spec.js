/// <reference types="cypress"/>

describe('Logging In - HTML Web Form', () => {
    // we can use these values to log in
    const email = 'admin@soeezauto.ma';
    const password = 'Secret123#';

    context('Unauthorized', () => {
        /*
        it('is redirected on visit to /dashboard when no session', () => {
            // we must have a valid session cookie to be logged
            // in else we are redirected to /unauthorized
            cy.visit('http://localhost:3000');
            cy.url().should('include', 'login');
        });

        it('should render the login page and display a message', () => {
            cy.visit('http://localhost:3000');
            cy.get('h1').contains('Login');
        });
        */
    });

    context('HTML form submission', () => {
        beforeEach(() => {
            cy.visit('/login');
        });

        it('displays errors on login', () => {
            // incorrect password on purpose
            cy.get('input[name=email]').type('admin@soeezauto.ma');
            cy.get('input[name=password]').type('Secret1dd23#{enter}');

            // we should have visible errors now
            cy.get('h6').should('be.visible').and('contain', 'Error');

            // and still be on the same URL
            cy.url().should('include', '/login');
        });

        it('redirects to /on success', () => {
            cy.get('input[name=email]').type(email);
            cy.get('input[name=password]').type(password);
            cy.get('form').submit();

            // we should be redirected to /
            cy.url().should('include', '/');
            cy.get('h1').should('contain', 'Admin');

            cy.waitUntil(() =>
                cy.getCookie('username').then((cookie) => {
                    cy.log(cookie);
                    if (cookie) {
                        expect(cookie.value).to.be.string('bdealvarenga');
                        cy.wrap(cookie).should('exist');
                    }
                    // ;
                }),
            );
            cy.waitUntil(() =>
                cy.getCookies({ log: true }).then((cookies) => {
                    cy.log(cookies);
                    if (cookies) {
                        cy.wrap(cookies).should('have.length', 7);
                    }
                }),
            );
        });
    });
});

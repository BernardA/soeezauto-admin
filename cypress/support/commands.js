// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// eslint-disable-next-line import/no-extraneous-dependencies
import 'cypress-wait-until';
import axios from 'axios';

const email = 'admin@soeezauto.ma';
const password = 'Secret123#';

Cypress.Commands.add('login', () => {
    Cypress.log({
        name: 'login',
        message: `${email} | ${password}`,
    });

    return cy
        .request({
            method: 'POST',
            url: 'http://localhost:8000/api/login_check',
            headers: { ContentType: 'application/json' },
            body: {
                email,
                password,
            },
        })
        .then((response) => {
            cy.log(response);

            const { refreshToken, roles, token, username } = response.body;
            axios.defaults.headers.common = {
                Authorization: `Bearer ${token}`,
            };
            cy.setCookie(
                'isAdmin',
                `${
                    roles.includes('ROLE_ADMIN') || roles.includes('ROLE_SUPERADMIN')
                }`.toString(),
            );
            cy.setCookie('username', username);
            cy.setCookie('token', token);
            cy.setCookie('refreshToken', refreshToken);
        });
});

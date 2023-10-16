import cypress = require("cypress");

declare global {
    namespace Cypress {
        interface Chainable {
            retrieveToken(): Cypress.Chainable<{ authToken: any; data: any; }>
        }
    }
};

Cypress.Commands.add('retrieveToken', () => {
    return cy.request({
        method: 'POST',
        url: `${Cypress.env('STORE_URL')}api/v1/admin/login`,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: {
            email: Cypress.env('ADMIN_EMAIL'),
            password: Cypress.env('ADMIN_PASSWORD')
        }
    }).then((response) => {
        const authToken = response.body.data.token;
        return {
            authToken,
            data: response.body,
        };
    });
});

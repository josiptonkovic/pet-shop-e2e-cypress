import cypress = require("cypress");
import { homePage } from "../pages/Homepge";

declare global {
    namespace Cypress {
        interface Chainable {
            retrieveToken(): Cypress.Chainable<{ authToken: any; data: any; }>
            retrieveUsers(): Cypress.Chainable<{ body: { data: any[] } }>
            loginUser(loginCase: 'validUser' | 'invalidEmail' | 'invalidUser' | 'invalidPassword'): Cypress.Chainable<{}>
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

Cypress.Commands.add('retrieveUsers', () => {
    cy.retrieveToken().then(({ authToken }) => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env('STORE_URL')}api/v1/admin/user-listing`,
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        }).then((response) => {
            const retrievedUsers = response.body.data;
            cy.writeFile('cypress/fixtures/users.json', JSON.stringify(retrievedUsers, null, 2));
        });
    });
});

Cypress.Commands.add('loginUser', (loginCase: 'validUser' | 'invalidEmail' | 'invalidUser' | 'invalidPassword' = 'validUser') => {
    return cy.retrieveUsers().then(() => {
        let user: string;
        let password: string;
        const userList = 'users.json';
        
        const loginSteps = (user: string, password: string) => {
            homePage.loginBtn1Element.click();
            homePage.usernameElement.type(user);
            homePage.passwordElement.type(password);
            homePage.loginBtn2Element.click();
        };

        switch (loginCase) {

            case 'invalidEmail':
                user = 'wrong@user.com';
                password = `${Cypress.env('USER_PASSWORD')}`;
                loginSteps(user, password);
            break;
  
            case 'invalidUser':
                user = 'wrong@user.com';
                password = 'wrongpassword';
                loginSteps(user, password);
            break;
  
            case 'invalidPassword':
                return cy.fixture(userList).then((availableUsers: { email: string }[]) => {
                    const randomIndex = Math.floor(Math.random() * availableUsers.length);
                    user = availableUsers[randomIndex].email;
                    password = 'wrongpassword';
                    loginSteps(user, password);
                });
  
            default:
                return cy.fixture(userList).then((availableUsers: { email: string }[]) => {
                    const randomIndex = Math.floor(Math.random() * availableUsers.length);
                    user = availableUsers[randomIndex].email;
                    password = `${Cypress.env('USER_PASSWORD')}`;
                    loginSteps(user, password);
                });
        }
    });
});

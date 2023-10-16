import cypress = require("cypress");
import { homePage } from "../pages/Homepge";
import { shopPage } from "../pages/Shop";

declare global {
    namespace Cypress {
        interface Chainable {
            retrieveToken(): Cypress.Chainable<{ authToken: any; data: any; }>
            retrieveUsers(): Cypress.Chainable<{ body: { data: any[] } }>
            loginUser(loginCase: 'validUser' | 'invalidEmail' | 'invalidUser' | 'invalidPassword'): Cypress.Chainable<{}>
            sortProducts(sortBy: 'price' | 'brand' | 'category' ): Cypress.Chainable<{}>
            verifySortedProducts(sortBy: 'price' | 'brand' | 'category' ): Cypress.Chainable<{}>
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

Cypress.Commands.add('sortProducts', (sortBy: 'price' | 'brand' | 'category' ) => {

    switch (sortBy) {
  
        case 'price':
            shopPage.priceElement.type('500')
        break;
  
        case 'brand':
            shopPage.brandElement.click();
            shopPage.titleElement.should('contain', 'kitzy');
        break;
  
        case 'category':
            shopPage.categoryElement.click();
            shopPage.titleElement.should('contain', 'pet oral care');
        break;
    };
});

Cypress.Commands.add('verifySortedProducts', (sortBy: 'price' | 'brand' | 'category' ) => {

    switch (sortBy) {

        case 'price':
            cy.request({
                method: 'GET',
                url: `${Cypress.env('STORE_URL')}api/v1/products?price=500`,
            }).then((response) => {
                const retrievedProducts = response.body.data;
                retrievedProducts.forEach((product) => {
                    const productName = product.title;
                    cy.get('.product-card').contains(productName).should('be.visible');
                });
            });
        break;
        
        case 'brand':
            cy.request({
                method: 'GET',
                url: `${Cypress.env('STORE_URL')}api/v1/products?brand=8c396991-1e61-3ba6-8ba9-9c17bde33a29`,
            }).then((response) => {
                const retrievedProducts = response.body.data;
                retrievedProducts.forEach((product) => {
                    const productName = product.title;
                    cy.get('.product-card').contains(productName).should('be.visible');
                });
            });
        break;

        case 'brand':
            cy.request({
                method: 'GET',
                url: `${Cypress.env('STORE_URL')}api/v1/products?category=34930287-3116-3006-8709-a13c56c76721`,
            }).then((response) => {
                const retrievedProducts = response.body.data;
                retrievedProducts.forEach((product) => {
                    const productName = product.title;
                    cy.get('.product-card').contains(productName).should('be.visible');
                });
            });
        break;
    }
});



  Cypress.Commands.add('verifySortedProducts', (sortBy: 'price' | 'brand' | 'category' ) => {

    switch (sortBy) {
  
      case 'price':
        cy.request({
          method: 'GET',
          url: `${Cypress.env('STORE_URL')}api/v1/products?price=500`,
    
        }).then((response) => {
          const retrievedProducts = response.body.data;
          
          retrievedProducts.forEach((product) => {
            const productName = product.title;
            cy.get('.product-card').contains(productName).should('be.visible')
          })
        });
        break;
  
      case 'brand':
        cy.request({
          method: 'GET',
          url: `${Cypress.env('STORE_URL')}api/v1/products?brand=8c396991-1e61-3ba6-8ba9-9c17bde33a29`,
    
        }).then((response) => {
          const retrievedProducts = response.body.data;
          
          retrievedProducts.forEach((product) => {
            const productName = product.title;
            cy.get('.product-card').contains(productName).should('be.visible')
          })
        });
        break;
  
      case 'category':
        cy.request({
          method: 'GET',
          url: `${Cypress.env('STORE_URL')}api/v1/products?category=34930287-3116-3006-8709-a13c56c76721`,
    
        }).then((response) => {
          const retrievedProducts = response.body.data;
          
          retrievedProducts.forEach((product) => {
            const productName = product.title;
            cy.get('.product-card').contains(productName).should('be.visible')
          })
        });
        break;
    };
  });
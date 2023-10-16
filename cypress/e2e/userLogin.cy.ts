import { homePage } from "../pages/Homepge";

describe("Verify LogIn functionality", () => {

  beforeEach(() => {
    cy.visit(Cypress.env('STORE_URL'));
    cy.intercept('POST', `${Cypress.env('STORE_URL')}api/v1/user/login`).as('loginStatus');
  });

  it("Verify user can LogIn", () => {
    cy.loginUser('validUser');
    homePage.avatarElement.should('exist').should('be.visible');
    homePage.errorElement.should('not.exist');
    cy.wait('@loginStatus').then((request) => {
      expect(request.response.statusCode).to.eq(200);
    });
  });
  
  it("Verify user can not LogIn with invalid credentials", () => {
    cy.loginUser('invalidEmail');
    homePage.errorElement.should('exist').should('be.visible');
    homePage.avatarElement.should('not.exist');
    cy.wait('@loginStatus').then((request) => {
      expect(request.response.statusCode).to.eq(422);
    });
  });
  
  it("Verify user can not LogIn with invalid credentials", () => {
    cy.loginUser('invalidPassword');
    homePage.errorElement.should('exist').should('be.visible');
    homePage.avatarElement.should('not.exist');
    cy.wait('@loginStatus').then((request) => {
      expect(request.response.statusCode).to.eq(422);
    });
  });

  it("Verify user can not LogIn with invalid credentials", () => {
    cy.loginUser('invalidUser');
    homePage.errorElement.should('exist').should('be.visible');
    homePage.avatarElement.should('not.exist');
    cy.wait('@loginStatus').then((request) => {
      expect(request.response.statusCode).to.eq(422);
    });
  });

});

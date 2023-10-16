class Homepage {
    private loginBtn1: string = 'LOGIN';
    private username: string = '.login__form input[type="text"]';
    private password: string = '.login__form input[type="password"]';
    private loginBtn2: string = 'Log in';
    private error: string = '.login__error-message';
    private avatar: string = '.v-avatar'

    get loginBtn1Element(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains(this.loginBtn1);
    }
  
    get usernameElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.username);
    }

    get passwordElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.password);
    }

    get loginBtn2Element(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains(this.loginBtn2);
    }
  
    get errorElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.error);
    }

    get avatarElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.avatar);
    }
  }
  
  export const homePage = new Homepage();

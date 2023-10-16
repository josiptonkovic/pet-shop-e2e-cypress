class Shop {
    private title: string = 'h1.shop__title'
    private price: string = '.price-box-wrapper input';
    private brand: string = 'kitzy';
    private category: string = 'pet oral care';

    get titleElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.title);
    }

    get priceElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.get(this.price);
    }
  
    get brandElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains(this.brand);
    }

    get categoryElement(): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.contains(this.category);
    }
  }
  
  export const shopPage = new Shop();

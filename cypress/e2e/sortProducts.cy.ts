describe("Verify sorting products functionality", () => {

    beforeEach(() => {
        cy.visit(`${Cypress.env('STORE_URL')}shop`);
    });

    it("Verify Products are sorted by Price", () => {
        cy.sortProducts('price');
        cy.verifySortedProducts('price');
    });
  
    it("Verify Products are sorted by Brand", () => {
        cy.sortProducts('brand');
        cy.verifySortedProducts('brand');
    });
  
    it("Verify Products are sorted by Category", () => {
        cy.sortProducts('category');
        cy.verifySortedProducts('category');

    });

  });

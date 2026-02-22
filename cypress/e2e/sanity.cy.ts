describe("Sanity Check", () => {
    it("should visit the home page", () => {
        cy.visit("/");
        cy.url().should("include", "rizqifauzan.com");
    });
});

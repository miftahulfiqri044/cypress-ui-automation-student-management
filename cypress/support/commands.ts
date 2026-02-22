import LoginPage from "./pages/LoginPage";

Cypress.Commands.add("login", (email, password) => {
    cy.session(
        [email, password],
        () => {
            LoginPage.visit();
            LoginPage.login(email, password);
            cy.url({ timeout: 15000 }).should("include", "/dashboard");
        }
    );
});

declare global {
    namespace Cypress {
        interface Chainable {
            /**
             * Custom command to login using UI and session caching.
             * @example cy.login('email@example.com', 'password123')
             */
            login(email: string, password: string): Chainable<void>;
        }
    }
}
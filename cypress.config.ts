import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        baseUrl: "https://api.rizqifauzan.com",
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
        viewportWidth: 1280,
        viewportHeight: 720,
        video: false,
        screenshotOnRunFailure: true,
    },
});

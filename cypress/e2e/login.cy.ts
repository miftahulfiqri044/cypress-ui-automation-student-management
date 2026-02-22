import LoginPage from "../support/pages/LoginPage";
import DashboardPage from "../support/pages/DashboardPage";

describe("Login and Session Caching Tests", () => {
    let userData: any;

    before(() => {
        cy.fixture("userData").then((data) => {
            userData = data;
        });
    });

    it("should fail to login with incorrect password", () => {
        LoginPage.visit();
        LoginPage.login(userData.validUser.email, "wrongpassword");
        cy.contains("Email atau password salah").should("be.visible");
    });

    it("should fail to login with non-existent email", () => {
        LoginPage.visit();
        LoginPage.login("nonexistent@example.com", "password123");
        cy.contains("Email atau password salah").should("be.visible");
    });

    it("should show validation error for empty fields", () => {
        LoginPage.visit();
        LoginPage.loginButton.click();
        // Browser validation check
        cy.get("input#email:invalid").should("exist");
    });

    it("should successfully login with valid credentials (first time)", () => {
        cy.login(userData.validUser.email, userData.validUser.password);
        cy.visit("/dashboard");
        DashboardPage.headerVisible();
    });

    it("should reuse the session for subsequent valid login", () => {
        // This test will use the cached session from the previous test
        cy.login(userData.validUser.email, userData.validUser.password);
        cy.visit("/dashboard");
        DashboardPage.headerVisible();

        // Check if we are still on dashboard without re-logging in UI
        cy.url().should("include", "/dashboard");
    });
});

import RegisterPage from "../support/pages/RegisterPage";
import LoginPage from "../support/pages/LoginPage";
import DashboardPage from "../support/pages/DashboardPage";

describe("Registration and Login Flow", () => {
    let userData: any;
    let dynamicEmail: string;

    before(() => {
        cy.fixture("userData").then((data) => {
            userData = data;
        });

        // Read and increment counter for dynamic sequential email
        cy.readFile("cypress/fixtures/registrationCounter.json").then((data) => {
            const nextCounter = data.counter;
            const sequence = nextCounter.toString().padStart(2, "0");
            dynamicEmail = `tarunahulu${sequence}@gmail.com`;

            // Update counter for next run
            cy.writeFile("cypress/fixtures/registrationCounter.json", {
                counter: nextCounter + 1,
            });
        });
    });

    it("should successfully register a new account", () => {
        RegisterPage.visit();
        RegisterPage.register(
            userData.newUser.name,
            dynamicEmail,
            userData.newUser.password,
            userData.newUser.password
        );

        cy.url().should("include", "/login");
    });

    it("should fail to register with an already existing email", () => {
        RegisterPage.visit();
        RegisterPage.register(
            userData.newUser.name,
            dynamicEmail,
            userData.newUser.password,
            userData.newUser.password
        );
        cy.contains("Email sudah terdaftar").should("be.visible");
    });

    it("should fail to register when passwords do not match", () => {
        RegisterPage.visit();
        RegisterPage.register(
            "Test User",
            "test_mismatch@example.com",
            "Password123",
            "Mismatch123"
        );
        // Check for specific validation message or browser validation
        cy.get("#confirmPassword").invoke("prop", "validationMessage").should("not.be.empty");
    });

    it("should show validation errors for empty registration fields", () => {
        RegisterPage.visit();
        RegisterPage.registerButton.click();
        cy.get("input#nama:invalid").should("exist");
        cy.get("input#email:invalid").should("exist");
    });

    it("should successfully login with the new account", () => {
        LoginPage.visit();
        LoginPage.login(dynamicEmail, userData.newUser.password);
        cy.url().should("include", "/dashboard");
        DashboardPage.headerVisible();
    });
});

class LoginPage {
    get emailInput() {
        return cy.get("#email");
    }

    get passwordInput() {
        return cy.get("#password");
    }

    get loginButton() {
        return cy.get("#login-submit-btn");
    }

    get errorMessage() {
        return cy.get(".alert-danger"); // Standard class for error alerts, I'll verify this or use a generic selector if needed
    }

    visit() {
        cy.visit("/login");
    }

    login(email: string, password: string) {
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.loginButton.click();
    }
}

export default new LoginPage();

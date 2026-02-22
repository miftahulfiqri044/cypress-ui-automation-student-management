class RegisterPage {
    get nameInput() {
        return cy.get("#nama");
    }

    get emailInput() {
        return cy.get("#email");
    }

    get passwordInput() {
        return cy.get("#password");
    }

    get confirmPasswordInput() {
        return cy.get("#confirmPassword");
    }

    get registerButton() {
        return cy.get("#register-submit-btn");
    }

    visit() {
        cy.visit("/register");
    }

    register(name: string, email: string, pass: string, confirmPass: string) {
        this.nameInput.type(name);
        this.emailInput.type(email);
        this.passwordInput.type(pass);
        this.confirmPasswordInput.type(confirmPass);
        this.registerButton.click();
    }
}

export default new RegisterPage();

class DashboardPage {
    get navbarBrand() {
        return cy.get(".navbar-brand");
    }

    get logoutButton() {
        return cy.get("#logout-btn"); // Assuming logout button id
    }

    get studentListTable() {
        return cy.get("table");
    }

    headerVisible() {
        this.navbarBrand.should("be.visible");
    }

    logout() {
        this.logoutButton.click();
    }
}

export default new DashboardPage();

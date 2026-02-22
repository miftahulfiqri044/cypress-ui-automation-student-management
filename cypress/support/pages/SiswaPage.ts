class SiswaPage {
    get addSiswaButton() {
        return cy.get("#dashboard-add-siswa-btn");
    }

    get searchInput() {
        return cy.get("#search");
    }

    get kelasFilter() {
        return cy.get("input#kelas");
    }

    get jurusanFilter() {
        return cy.get("input#jurusan");
    }

    get namaInput() {
        return cy.get("#nama");
    }

    get nisInput() {
        return cy.get("#nis");
    }

    get kelasInput() {
        return cy.get("#kelas");
    }

    get jurusanInput() {
        return cy.get("#jurusan");
    }

    get emailInput() {
        return cy.get("#email");
    }

    get teleponInput() {
        return cy.get("#telepon");
    }

    get alamatInput() {
        return cy.get("#alamat");
    }

    get simpanButton() {
        return cy.contains("button", "Simpan");
    }

    get successToast() {
        return cy.contains("Berhasil");
    }

    get konfirmasiHapusButton() {
        return cy.get("#delete-dialog-confirm-btn");
    }

    visit() {
        cy.visit("/dashboard");
    }

    fillForm(student: {
        nama: string;
        nis: string;
        kelas: string;
        jurusan: string;
        email: string;
        telp: string;
        alamat: string;
    }) {
        this.namaInput.clear().type(student.nama);
        this.nisInput.clear().type(student.nis);
        this.kelasInput.clear().type(student.kelas);
        this.jurusanInput.clear().type(student.jurusan);
        this.emailInput.clear().type(student.email);
        this.teleponInput.clear().type(student.telp);
        this.alamatInput.clear().type(student.alamat);
    }

    createSiswa(student: any) {
        this.addSiswaButton.click();
        this.fillForm(student);
        this.simpanButton.click();
    }

    updateSiswa(oldName: string, newData: any) {
        cy.contains("tr", oldName).within(() => {
            cy.get("#dashboard-edit-siswa-btn").click();
        });
        this.fillForm(newData);
        this.simpanButton.click();
    }

    deleteSiswa(name: string) {
        cy.contains("tr", name).within(() => {
            cy.get("#dashboard-delete-siswa-btn").click();
        });
        this.konfirmasiHapusButton.click();
    }

    search(query: string) {
        this.searchInput.clear().type(query);
        cy.get("table", { timeout: 10000 }).should("be.visible");
        // Wait a bit for real-time filter
        cy.wait(1000);
    }

    filterByKelas(kelas: string) {
        this.kelasFilter.clear().type(`${kelas}{enter}`);
    }

    filterByJurusan(jurusan: string) {
        this.jurusanFilter.clear().type(`${jurusan}{enter}`);
    }
}

export default new SiswaPage();

import SiswaPage from "../support/pages/SiswaPage";
import LoginPage from "../support/pages/LoginPage";

describe("Siswa Management CRUD Tests", () => {
    let userData: any;
    let studentData: any;

    before(() => {
        // Load fixtures
        cy.fixture("userData").then((uData) => {
            userData = uData;
        });
        cy.fixture("studentData").then((sData) => {
            studentData = sData;
        });
    });

    beforeEach(() => {
        // Login before each test using custom command with session
        cy.login(userData.validUser.email, userData.validUser.password);
        SiswaPage.visit();
    });

    it("should create a new student", () => {
        SiswaPage.createSiswa(studentData.newStudent);
        SiswaPage.successToast.should("be.visible");

        // Verify in list via search
        SiswaPage.search(studentData.newStudent.nama);
        cy.contains("td", studentData.newStudent.nama).should("be.visible");
    });

    it("should update an existing student", () => {
        // Search for the student created in the previous test (or any existing)
        SiswaPage.search(studentData.newStudent.nama);
        SiswaPage.updateSiswa(studentData.newStudent.nama, studentData.updatedStudent);
        SiswaPage.successToast.should("be.visible");

        // Verify update
        SiswaPage.search(studentData.updatedStudent.nama);
        cy.contains("td", studentData.updatedStudent.nama).should("be.visible");
    });

    it("should delete a student", () => {
        SiswaPage.search(studentData.updatedStudent.nama);
        SiswaPage.deleteSiswa(studentData.updatedStudent.nama);
        SiswaPage.successToast.should("be.visible");

        // Verify deletion
        SiswaPage.search(studentData.updatedStudent.nama);
        cy.contains("td", studentData.updatedStudent.nama).should("not.exist");
    });

    it("should filter and search student data", () => {
        // Search
        SiswaPage.search(studentData.newStudent.nis); // Search by NIS
        cy.contains("td", studentData.newStudent.nama).should("be.visible");

        // Filter by Kelas
        SiswaPage.visit(); // Reset filters
        SiswaPage.filterByKelas(studentData.newStudent.kelas);
        cy.contains("td", studentData.newStudent.nama).should("be.visible");

        // Filter by Jurusan
        SiswaPage.visit(); // Reset filters
        SiswaPage.filterByJurusan(studentData.newStudent.jurusan);
        cy.contains("td", studentData.newStudent.nama).should("be.visible");
    });

    it("should show validation errors for empty student form", () => {
        SiswaPage.addSiswaButton.click();
        SiswaPage.simpanButton.click();
        cy.get("input#nama:invalid").should("exist");
        cy.get("input#nis:invalid").should("exist");
    });

    it("should display a message when no students are found in search", () => {
        SiswaPage.search("NonExistentStudentName12345");
        cy.contains("Tidak ada data siswa").should("be.visible");
    });
});

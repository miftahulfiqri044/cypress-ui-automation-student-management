# Cypress UI Automation – Student Management System

## 📌 Project Overview
This repository contains a robust UI automation testing framework built using **Cypress** and **TypeScript** for a Student Management System web application. It implements modern automation patterns like the **Page Object Model (POM)** and **Session Caching** for high performance and maintainability.

---

## 🛠 Tech Stack
- **Cypress 13.17.0** (Core Testing Framework)
- **TypeScript** (Type Safety & Better Developer Experience)
- **Page Object Model (POM)** (Design Pattern)
- **Session Caching** (Optimized Login Flow)

---

## 🧪 Test Scope
- **User Authentication**: Positive/Negative login scenarios and session reuse.
- **Sequential Registration**: Automated registration using a dynamic sequence counter for unique emails.
- **Student CRUD**: Full lifecycle tests (Create, Read/Search, Filter, Update, Delete) with row-based verification.
- **Validation Testing**: Error message assertions for empty fields and invalid inputs.

---

## � Getting Started

### 1. Prerequisites
- Node.js (v18 or higher recommended)

### 2. Installation
```bash
npm install
```

### 3. Running Tests
Due to common environment conflicts (e.g., `ELECTRON_RUN_AS_NODE`), it is recommended to run Cypress using the following commands:

**Headless Mode (All Tests):**
```bash
cmd /c "set ELECTRON_RUN_AS_NODE=& npx cypress run"
```

**Cypress UI Runner:**
```bash
cmd /c "set ELECTRON_RUN_AS_NODE=& npx cypress open"
```

---

## 🏗 Project Structure
- `cypress/e2e/`: Contains test specification files.
- `cypress/support/pages/`: Page Object Model implementation.
- `cypress/fixtures/`: Test data in JSON format (including sequence counters).
- `tsconfig.json`: TypeScript configuration.

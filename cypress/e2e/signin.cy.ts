import { AUTH_SELECTORS } from "./selectors/auth";

describe("SignIn", () => {
  beforeEach(() => {
    cy.visit(
      "https://user-management-1global-cjl3qqk80-adrian-lemes-projects.vercel.app/signin",
    );
  });

  it("Should test all fields validation", () => {
    cy.contains("Sign In").click();

    // Validate required fields
    cy.contains("Email is required").should("exist");
    cy.contains("Password is required").should("exist");

    // Validate invalid email
    cy.get(AUTH_SELECTORS.email).type("invalid-email");
    cy.contains("Invalid email address").should("exist");
  });

  it("Should submit the form when all fields are valid", () => {
    cy.get(AUTH_SELECTORS.email).type("eve.holt@reqres.in");
    cy.get(AUTH_SELECTORS.password).type("Asd1234567");

    cy.contains("Sign In").click();

    cy.url().should("include", "/dashboard");

    cy.contains("Welcome eve.holt@reqres.in").should("exist");
  });

  it("Should display a toast with the error message when the sign in fails", () => {
    cy.get(AUTH_SELECTORS.email).type("invalid-email@email.com");
    cy.get(AUTH_SELECTORS.password).type("Asd1234567");

    cy.contains("Sign In").click();

    // wait for the toast to appear role="status"
    cy.get('[role="status"]').should("exist");

    cy.contains(
      "User not found, please sign up or try a different email.",
    ).should("exist");
  });

  it('Should show / hide password and current password when "Show / Hide" button is clicked', () => {
    cy.get(AUTH_SELECTORS.showPasswordButton).click();

    cy.get(AUTH_SELECTORS.password).should("have.attr", "type", "text");

    cy.get(AUTH_SELECTORS.showPasswordButton).click();

    cy.get(AUTH_SELECTORS.password).should("have.attr", "type", "password");
  });
});

export {};
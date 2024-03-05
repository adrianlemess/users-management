import { CONFIG_VAR } from "./config";
import { AUTH_SELECTORS } from "./selectors/auth";

describe("SignUp", () => {
  beforeEach(() => {
    cy.visit(`${CONFIG_VAR.app_url}/signup`);
  });

  it("Should test all fields validation", () => {
    cy.get(AUTH_SELECTORS.submitButton).click();

    // Validate required fields
    cy.contains("First Name is required").should("exist");
    cy.contains("Last Name is required").should("exist");
    cy.contains("Email is required").should("exist");
    cy.contains("Password is required").should("exist");
    cy.contains("Confirmation Password is required").should("exist");

    // Validate invalid email
    cy.get(AUTH_SELECTORS.email).type("invalid-email");
    cy.contains("Invalid email address").should("exist");

    // Validate password mismatch
    cy.get(AUTH_SELECTORS.password).type("password123");
    cy.get(AUTH_SELECTORS.confirmationPassword).type("password1234");

    cy.contains("Passwords must match").should("exist");

    // clean up password fields first
    cy.get(AUTH_SELECTORS.password).clear();
    cy.get(AUTH_SELECTORS.confirmationPassword).clear();

    // Validate password minimum length
    cy.get(AUTH_SELECTORS.password).type("Asd123");
    cy.get(AUTH_SELECTORS.confirmationPassword).type("Asd123");

    cy.contains("Password is too short - should be 8 chars minimum").should(
      "exist",
    );

    // clean up password fields first
    cy.get(AUTH_SELECTORS.password).clear();
    cy.get(AUTH_SELECTORS.confirmationPassword).clear();

    // Validate password without uppercase letter
    cy.get(AUTH_SELECTORS.password).type("asd1234567");
    cy.get(AUTH_SELECTORS.confirmationPassword).type("asd1234567");

    cy.contains("Password must contain at least one uppercase letter").should(
      "exist",
    );
  });

  it("Should submit the form when all fields are valid", () => {
    cy.get(AUTH_SELECTORS.firstName).type(CONFIG_VAR.validUser.firstName);
    cy.get(AUTH_SELECTORS.lastName).type(CONFIG_VAR.validUser.lastName);
    cy.get(AUTH_SELECTORS.email).type(CONFIG_VAR.validUser.email);
    cy.get(AUTH_SELECTORS.password).type(CONFIG_VAR.validUser.password);
    cy.get(AUTH_SELECTORS.confirmationPassword).type(
      CONFIG_VAR.validUser.password,
    );

    cy.contains("Sign Up").click();

    cy.url().should("include", "/dashboard");

    cy.contains(`Welcome ${CONFIG_VAR.validUser.firstName}`).should("exist");
  });

  it("Should display a toast with the error message when the sign up fails", () => {
    cy.get(AUTH_SELECTORS.firstName).type(CONFIG_VAR.invalidUser.firstName);
    cy.get(AUTH_SELECTORS.lastName).type(CONFIG_VAR.invalidUser.lastName);
    cy.get(AUTH_SELECTORS.email).type(CONFIG_VAR.invalidUser.email);
    cy.get(AUTH_SELECTORS.password).type(CONFIG_VAR.invalidUser.password);
    cy.get(AUTH_SELECTORS.confirmationPassword).type(
      CONFIG_VAR.invalidUser.password,
    );

    cy.contains("Sign Up").click();

    // wait for the toast to appear role="status"
    cy.get('[role="status"]').should("exist");

    cy.contains("Only defined users succeed registration").should("exist");
  });

  it('Should show / hide password and current password when "Show / Hide" button is clicked', () => {
    cy.get(AUTH_SELECTORS.showPasswordButton).click();

    cy.get(AUTH_SELECTORS.password).should("have.attr", "type", "text");

    cy.get(AUTH_SELECTORS.showPasswordButton).click();

    cy.get(AUTH_SELECTORS.password).should("have.attr", "type", "password");

    cy.get(AUTH_SELECTORS.showConfirmationPasswordButton).click();

    cy.get(AUTH_SELECTORS.confirmationPassword).should(
      "have.attr",
      "type",
      "text",
    );

    cy.get(AUTH_SELECTORS.showConfirmationPasswordButton).click();

    cy.get(AUTH_SELECTORS.confirmationPassword).should(
      "have.attr",
      "type",
      "password",
    );
  });

  it("When the user is not logged in, the user should be redirected to the SignUp page", () => {
    cy.visit(`${CONFIG_VAR.app_url}`);

    cy.url().should("include", "/signup");
  });
});

export {};

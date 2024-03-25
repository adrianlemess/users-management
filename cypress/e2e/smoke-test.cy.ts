import { DASHBOARD_SELECTORS } from "./selectors/dashboard";

describe("Smoke test", () => {
  beforeEach(() => {
    cy.signin();
  });

  it("Should navigate through the page", () => {
    // Expect Skeleton to be in the page
    cy.get(DASHBOARD_SELECTORS.skeleton).should("exist");

    // Click on create new user button
    cy.contains("Create a new user").click();

    // Expect all fields to be invalid
    cy.get(DASHBOARD_SELECTORS.submitButton).click();
    cy.contains("Name is required").should("exist");
    cy.contains("Email is required").should("exist");

    // Click outside the drawer
    cy.contains("Cancel").click();

    // Expect the drawer to be closed
    cy.get("Create User").should("not.exist");

    // Click in the Theme Toggle
    cy.get(DASHBOARD_SELECTORS.lightToggleTheme).click();

    // Click in the Theme Toggle
    cy.get(DASHBOARD_SELECTORS.darkToggleTheme).click();

    // Click in the logout button
    cy.contains("Logout").click();

    // Click in the Sign up button
    cy.contains("Sign Up").click();
  });
});

export {};

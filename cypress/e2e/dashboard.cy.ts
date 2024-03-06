import { DASHBOARD_SELECTORS } from "./selectors/dashboard";

describe("Dashboard", () => {
  beforeEach(() => {
    cy.signin();
  });

  it("Should navigate through the pagination", () => {
    // Wait for the skeleton to disappear
    cy.get(DASHBOARD_SELECTORS.skeleton).should("not.exist");

    // Get first User Card and check if it exists
    cy.get(DASHBOARD_SELECTORS.userCard).first().should("exist");

    // Move to the next page
    cy.get('[data-testid="pagination-button-2"]').click();

    // Check if the name Michael Lawson exist
    cy.get(DASHBOARD_SELECTORS.userCard).first().contains("Michael Lawson");
  });

  it("Should test the CRUD of a user", () => {
    // Click on the create button
    cy.contains("Create a new user").click();

    // Fill the form
    cy.get('input[name="first_name"]').type("John");
    cy.get('input[name="last_name"]').type("Snow");
    cy.get('input[name="email"]').type("john.snow@nightwatch.com");

    // Submit the form
    cy.get(DASHBOARD_SELECTORS.submitButton).click();

    // Check the toast
    cy.contains("User created.");

    // Move to page 3
    cy.get('[data-testid="pagination-button-3"]').click();

    // Check if the user card exists
    cy.get(DASHBOARD_SELECTORS.userCard).first().contains("John Snow");

    // Click on the user card update button
    cy.contains("Update User").click();

    // Fill the form
    cy.get('input[name="first_name"]').clear().type("The king");
    cy.get('input[name="last_name"]').clear().type("of the north");

    // Submit the form
    cy.get(DASHBOARD_SELECTORS.submitButton).click();

    // Check the toast
    cy.contains("User updated.");

    // Check the user card
    cy.get(DASHBOARD_SELECTORS.userCard)
      .first()
      .contains("The king of the north");

    // Click on the user card delete button
    cy.contains("Delete User").click();

    // Confirm the delete

    cy.get('[data-testid="delete-confirmation-button"]').click();

    // Check the toast
    cy.contains("User Deleted.");
  });

  it("Should delete all users and show message to create a new user", () => {
    // As long as there are users, delete them
    // Page 1
    cy.get(DASHBOARD_SELECTORS.userCard).each(() => {
      cy.contains("Delete User").click();
      cy.get('[data-testid="delete-confirmation-button"]').click();
    });

    // Page 2
    cy.get(DASHBOARD_SELECTORS.userCard).each(() => {
      cy.contains("Delete User").click();
      cy.get('[data-testid="delete-confirmation-button"]').click();
    });

    // // Check the message
    cy.contains("There are no users, create a new one");
  });
});

export {};

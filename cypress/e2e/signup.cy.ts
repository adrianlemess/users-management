describe("SignUp", () => {
  beforeEach(() => {
    cy.visit(
      "https://user-management-1global-cjl3qqk80-adrian-lemes-projects.vercel.app/signup",
    );
  });

  it("Should test all fields validation", () => {
    cy.contains("Sign Up").click();

    // Validate required fields
    cy.contains("First Name is required").should("exist");
    cy.contains("Last Name is required").should("exist");
    cy.contains("Email is required").should("exist");
    cy.contains("Password is required").should("exist");
    cy.contains("Confirmation Password is required").should("exist");

    // Validate invalid email
    cy.get('input[placeholder="Email address"]').type("invalid-email");
    cy.contains("Invalid email address").should("exist");

    // Validate password mismatch
    cy.get('input[placeholder="Enter password"]').type("password123");
    cy.get('input[placeholder="Enter confirmation password"]').type(
      "password1234",
    );

    cy.contains("Passwords must match").should("exist");

    // clean up password fields first
    cy.get('input[placeholder="Enter password"]').clear();
    cy.get('input[placeholder="Enter confirmation password"]').clear();

    // Validate password minimum length
    cy.get('input[placeholder="Enter password"]').type("Asd123");
    cy.get('input[placeholder="Enter confirmation password"]').type("Asd123");

    cy.contains("Password is too short - should be 8 chars minimum").should(
      "exist",
    );

    // clean up password fields first
    cy.get('input[placeholder="Enter password"]').clear();
    cy.get('input[placeholder="Enter confirmation password"]').clear();

    // Validate password without uppercase letter
    cy.get('input[placeholder="Enter password"]').type("asd1234567");
    cy.get('input[placeholder="Enter confirmation password"]').type(
      "asd1234567",
    );

    cy.contains("Password must contain at least one uppercase letter").should(
      "exist",
    );
  });

  it("should submit the form when all fields are valid", () => {
    cy.get('input[placeholder="First Name"]').type("John");
    cy.get('input[placeholder="Last Name"]').type("Doe");
    cy.get('input[placeholder="Email address"]').type("eve.holt@reqres.in");
    cy.get('input[placeholder="Enter password"]').type("Asd1234567");
    cy.get('input[placeholder="Enter confirmation password"]').type(
      "Asd1234567",
    );

    cy.contains("Sign Up").click();

    cy.url().should("include", "/dashboard");

    cy.contains("Welcome John").should("exist");
  });

  it("should display a toast with the error message when the sign up fails", () => {
    cy.get('input[placeholder="First Name"]').type("John");
    cy.get('input[placeholder="Last Name"]').type("Doe");
    cy.get('input[placeholder="Email address"]').type(
      "invalid-email@email.com",
    );
    cy.get('input[placeholder="Enter password"]').type("Asd1234567");
    cy.get('input[placeholder="Enter confirmation password"]').type(
      "Asd1234567",
    );

    cy.contains("Sign Up").click();

    // wait for the toast to appear role="status"
    cy.get('[role="status"]').should("exist");

    cy.contains("Only defined users succeed registration").should("exist");
  });

  it('should show / hide password and current password when "Show / Hide" button is clicked', () => {
    cy.get('[data-testid="show-password-button"]').click();

    cy.get('input[placeholder="Enter password"]').should(
      "have.attr",
      "type",
      "text",
    );

    cy.get('[data-testid="show-password-button"]').click();

    cy.get('input[placeholder="Enter password"]').should(
      "have.attr",
      "type",
      "password",
    );

    cy.get('[data-testid="show-confirmation-password-button"]').click();

    cy.get('input[placeholder="Enter confirmation password"]').should(
      "have.attr",
      "type",
      "text",
    );

    cy.get('[data-testid="show-confirmation-password-button"]').click();

    cy.get('input[placeholder="Enter confirmation password"]').should(
      "have.attr",
      "type",
      "password",
    );
  });
});

export {};

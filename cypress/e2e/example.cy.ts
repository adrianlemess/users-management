describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/dashboard");
    cy.get("[data-testid='title']").should("contain.text", "Hello Adrian");
  });
});

export {};

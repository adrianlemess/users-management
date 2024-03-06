import { CONFIG_VAR } from "../e2e/config";
import { AUTH_SELECTORS } from "../e2e/selectors/auth";

Cypress.Commands.add("signin", () => {
  cy.visit(`${CONFIG_VAR.app_url}/signin`);
  cy.get(AUTH_SELECTORS.email).type(CONFIG_VAR.validUser.email);
  cy.get(AUTH_SELECTORS.password).type(CONFIG_VAR.validUser.password);

  cy.contains("Sign In").click();

  cy.url().should("include", "/dashboard");

  cy.contains(`Welcome ${CONFIG_VAR.validUser.email}`).should("exist");
});

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable {
      signin(): Chainable<void>;
    }
  }
}

export {};

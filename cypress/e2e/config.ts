export const CONFIG_VAR = {
  app_url:
    Cypress.env("app_url") || "https://user-management-1global.vercel.app/",
  validUser: {
    firstName: "George",
    lastName: "Weasley",
    email: "eve.holt@reqres.in",
    password: "asd123456ASD",
  },
  invalidUser: {
    firstName: "Draco",
    lastName: "Malfoy",
    email: "draco.malfoy@gmail.com",
    password: "asd123456ASD",
  },
};

// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Mock constant to avoid import.meta error: https://stackoverflow.com/a/74882007

// example.test.(js|ts)
jest.mock("@/constants/environment", () => ({
  BASE_URL: "/api",
}));

import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import React from "react";

import { server } from "../../__tests__/msw/server";
import { TestWrapper } from "../../__tests__/test-providers";
import { fillInputByPlaceholder } from "../../__tests__/utils";
import { SignUp } from "./SignUp";

describe("SignUp", () => {
  beforeEach(async () => {
    const toasts = screen.queryAllByRole("listitem");
    await Promise.all(
      toasts.map(toasts =>
        waitFor(() => expect(toasts).not.toBeInTheDocument()),
      ),
    );
  });
  it("Should render a sign up form", () => {
    render(<SignUp />, { wrapper: TestWrapper });

    const firstNameInput = screen.getByPlaceholderText("First Name");
    const lastNameInput = screen.getByPlaceholderText("Last Name");
    const emailInput = screen.getByPlaceholderText("Email address");
    const passwordInput = screen.getByPlaceholderText("Enter password");
    const confirmPasswordInput = screen.getByPlaceholderText(
      "Enter confirmation password",
    );
    const signUpButton = screen.getByText("Sign Up");

    expect(firstNameInput).toBeInTheDocument();
    expect(lastNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(signUpButton).toBeInTheDocument();
  });

  it("Should display error messages for invalid form submission if fields are empty", async () => {
    render(<SignUp />, { wrapper: TestWrapper });

    const signUpButton = screen.getByText("Sign Up");

    await userEvent.click(signUpButton);

    const firstNameError = await screen.findByText("First Name is required");
    const lastNameError = await screen.findByText("Last Name is required");
    const emailError = await screen.findByText("Email is required");
    const passwordError = await screen.findByText("Password is required");
    const confirmPasswordError = await screen.findByText(
      "Confirmation Password is required",
    );

    expect(firstNameError).toBeInTheDocument();
    expect(lastNameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(passwordError).toBeInTheDocument();
    expect(confirmPasswordError).toBeInTheDocument();
  });

  it("Should display error message for invalid email", async () => {
    render(<SignUp />, { wrapper: TestWrapper });

    const signUpButton = screen.getByText("Sign Up");
    await userEvent.click(signUpButton);

    const emailInput = screen.getByPlaceholderText("Email address");
    await userEvent.type(emailInput, "invalid-email");
    await userEvent.tab();

    await waitFor(() => {
      const emailError = screen.getByText("Invalid email address");

      expect(emailError).toBeInTheDocument();
    });
  });

  it("Should display error message for password mismatch", async () => {
    render(<SignUp />, { wrapper: TestWrapper });

    const signUpButton = screen.getByText("Sign Up");
    await userEvent.click(signUpButton);

    fillInputByPlaceholder("Enter password", "password123");
    fillInputByPlaceholder("Enter confirmation password", "password1234");

    const confirmPasswordError = await screen.findByText(
      "Passwords must match",
    );

    expect(confirmPasswordError).toBeInTheDocument();
  });

  it("Should display error message for invalid password", async () => {
    render(<SignUp />, { wrapper: TestWrapper });

    const signUpButton = screen.getByText("Sign Up");
    await userEvent.click(signUpButton);

    fillInputByPlaceholder("Enter password", "Asd123");
    fillInputByPlaceholder("Enter confirmation password", "Asd123");

    const passwordError = await screen.findByText(
      "Password is too short - should be 8 chars minimum",
    );

    expect(passwordError).toBeInTheDocument();
  });

  it("Should display error message for invalid password without uppercase letter", async () => {
    render(<SignUp />, { wrapper: TestWrapper });

    const signUpButton = screen.getByText("Sign Up");
    await userEvent.click(signUpButton);

    fillInputByPlaceholder("Enter password", "asd1234567");
    fillInputByPlaceholder("Enter confirmation password", "asd1234567");

    const passwordError = await screen.findByText(
      "Password must contain at least one uppercase letter",
    );

    expect(passwordError).toBeInTheDocument();
  });

  it("Should submit the form when all fields are valid", async () => {
    render(<SignUp />, { wrapper: TestWrapper });
    const signUpButton = screen.getByText("Sign Up");

    fillInputByPlaceholder("First Name", "John");
    fillInputByPlaceholder("Last Name", "Doe");
    fillInputByPlaceholder("Email address", "adrianlemess@gmail.com");
    fillInputByPlaceholder("Enter password", "Asd1234567");
    fillInputByPlaceholder("Enter confirmation password", "Asd1234567");

    await userEvent.click(signUpButton);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/dashboard");
    });
  });

  it("Should display a toast with the error message when the sign up fails", async () => {
    // Mock error with service worker
    server.use(
      http.post("/api/register", () => {
        return HttpResponse.json(
          { error: "Note: Only defined users succeed registration" },
          { status: 400 },
        );
      }),
    );

    render(<SignUp />, { wrapper: TestWrapper });

    fillInputByPlaceholder("First Name", "John");
    fillInputByPlaceholder("Last Name", "Doe");
    fillInputByPlaceholder("Email address", "adrianlemess@gmail.com");
    fillInputByPlaceholder("Enter password", "Asd1234567");
    fillInputByPlaceholder("Enter confirmation password", "Asd1234567");

    act(() => {
      const button = screen.getByText("Sign Up");
      button.click();
    });
    const toast = await screen.findByText(
      "Only defined users succeed registration",
    );
    expect(toast).toBeInTheDocument();
  });

  it('Should show / hide password when "Show / Hide" button is clicked', async () => {
    render(<SignUp />, { wrapper: TestWrapper });

    const showPasswordButton = screen.getByTestId("show-password-button");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    // Start as password
    expect(passwordInput).toHaveAttribute("type", "password");

    await userEvent.click(showPasswordButton);
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("type", "text");
    });

    await userEvent.click(showPasswordButton);
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  it('Should show / hide confirmation password when "Show / Hide" button is clicked', async () => {
    render(<SignUp />, { wrapper: TestWrapper });

    const showPasswordButton = screen.getByTestId(
      "show-confirmation-password-button",
    );
    const passwordInput = screen.getByPlaceholderText(
      "Enter confirmation password",
    );

    // Start as password
    expect(passwordInput).toHaveAttribute("type", "password");

    await userEvent.click(showPasswordButton);
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("type", "text");
    });

    await userEvent.click(showPasswordButton);
    await waitFor(() => {
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });
});

import { act, render, screen, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import React from "react";

import { SignInResponseMock } from "../../__tests__/msw/mock";
import { server } from "../../__tests__/msw/server";
import { TestWrapper } from "../../__tests__/test-providers";
import { fillInputByPlaceholder } from "../../__tests__/utils";
import SignIn from "./SignIn";

describe("SignIn", () => {
  beforeEach(async () => {
    const toasts = screen.queryAllByRole("listitem");
    await Promise.all(
      toasts.map(toasts =>
        waitFor(() => expect(toasts).not.toBeInTheDocument()),
      ),
    );
  });

  it("should render a Sign In button", () => {
    render(<SignIn />, { wrapper: TestWrapper });
    const button = screen.getByText("Sign In");
    expect(button).toBeInTheDocument();
  });

  it("should show / hide password when Show / Hide button is clicked", () => {
    render(<SignIn />, { wrapper: TestWrapper });

    const showButton = screen.getByText("Show");
    const passwordInput = screen.getByPlaceholderText("Enter password");

    act(() => {
      showButton.click();
    });

    expect(passwordInput).toHaveAttribute("type", "text");

    act(() => {
      showButton.click();
    });

    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("Should show an error message when email is invalid", async () => {
    render(<SignIn />, { wrapper: TestWrapper });

    act(() => {
      const button = screen.getByText("Sign In");
      button.click();
    });

    await fillInputByPlaceholder("Email address", "invalidemail");
    await fillInputByPlaceholder("Enter password", "cityslicka");

    await waitFor(() => {
      const emailError = screen.getByText("Invalid email address");

      expect(emailError).toBeInTheDocument();
    });
  });

  it("Should show a loading button when sign in is pending", async () => {
    // Mock service worker to delay response
    server.use(
      http.post("/api/login", async () => {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return HttpResponse.json(SignInResponseMock);
      }),
    );

    render(<SignIn />, { wrapper: TestWrapper });

    await fillInputByPlaceholder("Email address", "email@email.com");
    await fillInputByPlaceholder("Enter password", "cityslicka");

    act(() => {
      const button = screen.getByText("Sign In");
      button.click();
    });

    const loadingButton = await screen.findByText("Signing In");
    expect(loadingButton).toBeInTheDocument();
  });

  it("Should show an error message when password / email is empty", async () => {
    render(<SignIn />, { wrapper: TestWrapper });

    act(() => {
      const button = screen.getByText("Sign In");
      button.click();
    });

    await waitFor(() => {
      const emailError = screen.getByText("Email is required");

      expect(emailError).toBeInTheDocument();
    });

    const passwordError = screen.getByText("Password is required");
    expect(passwordError).toBeInTheDocument();
  });

  it("should navigate to the dashboard after successful sign in", async () => {
    // arrange
    render(<SignIn />, { wrapper: TestWrapper });

    // Fill form
    // Fill email input
    await fillInputByPlaceholder("Email address", "eve.holt@reqres.in");

    await fillInputByPlaceholder("Enter password", "cityslicka");

    // Click sign in
    act(() => {
      const button = screen.getByText("Sign In");
      button.click();
    });

    await waitFor(() => {
      expect(window.location.pathname).toBe("/dashboard");
    });
  });

  it("should display an error toast when signIn api fails", async () => {
    // Mock error with service worker
    server.use(
      http.post("/api/login", () => {
        return HttpResponse.json({ error: "user not found" }, { status: 400 });
      }),
    );

    render(<SignIn />, { wrapper: TestWrapper });
    // Fill form
    // Fill email input
    await fillInputByPlaceholder("Email address", "eve.holt@reqres.in");

    await fillInputByPlaceholder("Enter password", "cityslicka");

    // Click sign in
    act(() => {
      const button = screen.getByText("Sign In");
      button.click();
    });
    const toasts = await screen.findByText(
      "User not found, please sign up or try a different email.",
    );
    expect(toasts).toBeInTheDocument();
  });
});

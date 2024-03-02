import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import SignIn from "./SignIn";

describe("SignIn", () => {
  it("should renders a msg", () => {
    // arrange
    render(<SignIn />, { wrapper: BrowserRouter });

    // act
    const button = screen.getByText("Sign In");

    // assert
    expect(button).toBeInTheDocument();
  });
});

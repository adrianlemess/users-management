import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import SignUp from "./SignUp";

describe("SignUp", () => {
  it("should renders a msg", () => {
    // arrange
    render(<SignUp />, { wrapper: BrowserRouter });

    // act
    const button = screen.getByText("Sign Up");

    // assert
    expect(button).toBeInTheDocument();
  });
});

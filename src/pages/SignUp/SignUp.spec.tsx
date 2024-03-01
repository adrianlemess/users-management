import { render, screen } from "@testing-library/react";

import SignUp from "./SignUp";

describe("SignUp", () => {
  it("should renders a msg", () => {
    // arrange
    render(<SignUp />);

    // act
    const title = screen.getByText("Sign up page");

    // assert
    expect(title).toBeInTheDocument();
  });
});

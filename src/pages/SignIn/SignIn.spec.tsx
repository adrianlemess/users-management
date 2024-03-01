import { render, screen } from "@testing-library/react";

import SignIn from "./SignIn";

describe("SignIn", () => {
  it("should renders a msg", () => {
    // arrange
    render(<SignIn />);

    // act
    const title = screen.getByText("Sign in page");

    // assert
    expect(title).toBeInTheDocument();
  });
});

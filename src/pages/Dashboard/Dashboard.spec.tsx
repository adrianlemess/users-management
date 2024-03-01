import { render, screen } from "@testing-library/react";

import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("should renders a msg", () => {
    // arrange
    render(<Dashboard msg="Hello React!" />);

    // act
    const title = screen.getByTestId("title");

    // assert
    expect(title).toHaveTextContent(/Hello React!/i);
  });
});

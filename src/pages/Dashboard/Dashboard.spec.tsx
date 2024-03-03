import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Dashboard from "./Dashboard";

describe("Dashboard", () => {
  it("should renders a msg", () => {
    // arrange
    render(<Dashboard />, { wrapper: BrowserRouter });

    // act
    const title = screen.getByTestId("title");

    // assert
    expect(title).toHaveTextContent(/Welcome/i);
  });
});

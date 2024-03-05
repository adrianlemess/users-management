import { render, screen } from "@testing-library/react";
import React from "react";

import { TestWrapper } from "../../__tests__/test-providers";
import { Dashboard } from "./Dashboard";

describe("Dashboard", () => {
  it("should renders a msg", () => {
    // arrange
    render(<Dashboard />, { wrapper: TestWrapper });

    // act
    const title = screen.getByTestId("title");

    // assert
    expect(title).toBeInTheDocument();
  });
});

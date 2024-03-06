import { render, waitFor } from "@testing-library/react";
import React from "react";

import App from "./App";

describe("App", () => {
  it("Should be the Signup the first page when there is no token", async () => {
    render(<App />);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/signup");
    });
  });
});

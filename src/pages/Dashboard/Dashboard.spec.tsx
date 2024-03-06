import {
  act,
  render,
  renderHook,
  screen,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { http, HttpResponse } from "msw";
import React from "react";

import { GetUsersResponseMock } from "../../__tests__/msw/mock";
import { server } from "../../__tests__/msw/server";
import { TestWrapper } from "../../__tests__/test-providers";
import { fillInputByPlaceholder } from "../../__tests__/utils";
import { ITEMS_PER_PAGE } from "../../constants";
import { useAuthStore } from "../../state";
import { Dashboard } from "./Dashboard";

const renderDashboardAndWaitLoadingFinish = async () => {
  render(<Dashboard />, { wrapper: TestWrapper });

  await waitFor(() => {
    const createButton = screen.getByText("Create a new user");
    expect(createButton).toBeInTheDocument();
  });
};

const closeDrawer = async () => {
  act(() => {
    screen
      .getByRole("button", {
        name: /Cancel/i,
      })
      .click();
  });

  const drawer = screen.getByTestId("user-drawer-form");

  await waitFor(() => {
    expect(drawer).not.toBeInTheDocument();
  });
};

describe("Dashboard", () => {
  it("should renders a msg `Welcome ${email}` when only email is available from userSession", () => {
    // arrange
    // Set userSession in the hook useAuthStore using renderHook
    const { result } = renderHook(() => useAuthStore());
    result.current.setUserSession({
      token: "fake_token",
      email: "khal.drogo@gmail.com",
    });

    render(<Dashboard />, { wrapper: TestWrapper });

    // assert
    expect(
      screen.getByText("Welcome khal.drogo@gmail.com"),
    ).toBeInTheDocument();
  });

  it("should renders a msg `Welcome ${first_name}` when first_name is available from userSession", () => {
    // arrange
    // Set userSession in the hook useAuthStore using renderHook
    const { result } = renderHook(() => useAuthStore());
    result.current.setUserSession({
      token: "fake_token",
      first_name: "Khal",
    });

    render(<Dashboard />, { wrapper: TestWrapper });

    // assert
    expect(screen.getByText("Welcome Khal")).toBeInTheDocument();
  });

  it("Should display an error message if getUsers fails", async () => {
    server.use(
      http.get("/api/users", () => {
        return HttpResponse.json(
          { error: "Error to get users" },
          { status: 400 },
        );
      }),
    );

    // arrange
    render(<Dashboard />, { wrapper: TestWrapper });

    // act

    // assert
    await waitFor(() => {
      const errorMessage = screen.getByText("Something went wrong");
      expect(errorMessage).toBeInTheDocument();
    });
  });

  it("Should display a skeleton while loading", async () => {
    // arrange
    render(<Dashboard />, { wrapper: TestWrapper });

    // act
    const skeletonCards = await screen.findAllByTestId("card-skeleton");

    expect(skeletonCards).toHaveLength(ITEMS_PER_PAGE);
  });

  it("Should display a message to create a user if there are no users", async () => {
    // Mock the response of the getUsers request

    server.use(
      http.get("/api/users", () => {
        return HttpResponse.json({
          page: 1,
          per_page: ITEMS_PER_PAGE,
          total: 0,
          total_pages: 0,
          data: [],
        });
      }),
    );

    // arrange
    await renderDashboardAndWaitLoadingFinish();

    expect(
      screen.getByText("There are no users, create a new one"),
    ).toBeInTheDocument();
  });

  it("Should display a list of users", async () => {
    // arrange
    await renderDashboardAndWaitLoadingFinish();
    // Get the first 6 users from mock
    const users = GetUsersResponseMock.data.slice(0, 6);

    // act
    [...users].forEach(user => {
      expect(
        screen.getByText(`${user.first_name} ${user.last_name}`),
      ).toBeInTheDocument();
      expect(screen.getByText(`Email: ${user.email}`)).toBeInTheDocument();
    });
  });

  it("Should test create / update form validations", async () => {
    // act
    // Wait for the skeleton to disappear
    await renderDashboardAndWaitLoadingFinish();

    // Click on the create button
    screen
      .getByRole("button", {
        name: /Create a new user/i,
      })
      .click();

    // Wait for the Drawer to open
    await waitFor(() => {
      expect(screen.getByText("Create a new user")).toBeInTheDocument();
    });

    // Click on the create button
    act(() => {
      screen.getByTestId("button-create").click();
    });

    // act
    // Click on the create button

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(
      await screen.findByText("First Name is required"),
    ).toBeInTheDocument();
    expect(
      await screen.findByText("Last Name is required"),
    ).toBeInTheDocument();

    // Close modal
    await closeDrawer();
  });

  it("Should create an user", async () => {
    // act
    // Wait for the skeleton to disappear

    await renderDashboardAndWaitLoadingFinish();

    // Wait for the Drawer to open
    await waitFor(() => {
      expect(screen.getByText("Create a new user")).toBeInTheDocument();
    });

    // Click on the create button
    act(() => {
      screen
        .getByRole("button", {
          name: /Create a new user/i,
        })
        .click();
    });

    // Fill the form
    fillInputByPlaceholder("First Name", "Khal");
    fillInputByPlaceholder("Last Name", "Drogo");
    fillInputByPlaceholder("Email address", "khal.drogo@yahoo.com");

    // Click on the create button
    screen.getByTestId("button-create").click();
    await closeDrawer();

    // Check if the toast is displayed
    await waitFor(() => {
      expect(screen.getByText("User created.")).toBeInTheDocument();
    });

    // Go to page 3
    screen.getByText("3").click();

    // Check if the user is in the list
    await waitFor(() => {
      expect(screen.getByText("Khal Drogo")).toBeInTheDocument();
    });
  });

  it("Should update a user", async () => {
    // act
    // Wait for the skeleton to disappear

    await renderDashboardAndWaitLoadingFinish();

    await waitFor(() => {
      expect(screen.getByText("Create a new user")).toBeInTheDocument();
    });

    // Click on the first update button of the list
    const updatedButtons = await screen.findAllByRole("button", {
      name: /Update/i,
    });

    await userEvent.click(updatedButtons[0]);
    const userSelected = GetUsersResponseMock.data[0];
    // Wait for the Drawer to open
    await waitFor(() => {
      expect(
        screen.getByText(`Update user ${userSelected.first_name}`),
      ).toBeInTheDocument();
    });

    const emailInput = screen.getByTestId(`input-email-${userSelected.email}`);

    await userEvent.clear(emailInput);

    fillInputByPlaceholder("Email address", "khalessi@motherofdragons.com");

    // Press enter
    screen.getByTestId("button-update").click();

    // Check if the user is in the list
    await waitFor(() => {
      expect(
        screen.getByText("Email: khalessi@motherofdragons.com"),
      ).toBeInTheDocument();
    });
  });

  it("Should delete a user", async () => {
    await renderDashboardAndWaitLoadingFinish();

    // Get the first user from mock
    const user = GetUsersResponseMock.data[0];

    // Get the first Delete user button
    const deleteButton = await screen.findAllByText("Delete User");

    // Click on the delete button
    deleteButton[0].click();

    await waitFor(() => {
      const confirmationButton = screen.getByTestId(
        `delete-confirmation-button-${user.email}`,
      );
      confirmationButton.click();
    });

    // Wait for the toast message to appear
    await waitFor(() => {
      expect(screen.getByText("User Deleted.")).toBeInTheDocument();
    });
  });
});

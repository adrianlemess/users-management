import { create } from "zustand";

import { getUsers } from "@/api/users";
import { AVATAR_URL, ITEMS_PER_PAGE } from "@/constants";
import { NewUser, REQUEST_STATUS, User } from "@/types";

export interface UsersState {
  users: User[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
  requestStatus: REQUEST_STATUS;
  getInitialUsers: (page: number, itemsPerPage: number) => Promise<void>;
  changePage: (page: number) => void;
  createUser: (user: NewUser) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: number) => Promise<void>;
}

const usersInMemoryPerPage = new Map<number, User[]>();

export const useUsersStore = create<UsersState>()((set, get) => ({
  users: [],
  pagination: {
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 0,
  },
  requestStatus: "idle",
  // Store the pages number of the requests that are already made
  getInitialUsers: async (page: number) => {
    if (get().requestStatus === "pending") return;
    try {
      set({ requestStatus: "pending" });

      // @TODO since the operations to mutate data are in memory, I decide to pull all the data at once
      // This is not a good practice, but for the sake of the exercise, I will keep it like this
      const response = await getUsers(1, 12);
      // Set 2 pages with 6 users each. First page will be 1-6 and second page will be 7-12
      const users = response.data || [];

      users.forEach((user, index) => {
        const page = Math.floor(index / ITEMS_PER_PAGE) + 1;
        const usersInCurrentPage = usersInMemoryPerPage.get(page) || [];
        usersInCurrentPage.push(user);
        usersInMemoryPerPage.set(page, usersInCurrentPage);
      });

      set({
        users: usersInMemoryPerPage.get(page) || [],
        pagination: {
          page: response.page,
          per_page: ITEMS_PER_PAGE,
          total: response.total,
          total_pages: response.total / ITEMS_PER_PAGE,
        },
        requestStatus: "resolved",
      });
    } catch (error) {
      set({ requestStatus: "rejected" });
    }
  },
  changePage: (page: number) => {
    if (usersInMemoryPerPage.has(page)) {
      const userResponseCached = usersInMemoryPerPage.get(page);
      console.log("changePage", {
        userResponseCached,
        page,
        pagination: get().pagination,
      });

      if (userResponseCached) {
        set(state => ({
          users: userResponseCached,
          pagination: {
            ...state.pagination,
            page,
          },
        }));
      }
    }
  },
  createUser: async (user: NewUser) => {
    const newUser = { ...user, avatar: AVATAR_URL };
    // Get last page index
    const lastPageIndex = get().pagination.total_pages || 1;

    // Get the last page of users
    const lastPage = usersInMemoryPerPage.get(lastPageIndex);
    if (lastPage && lastPage.length < ITEMS_PER_PAGE) {
      // If the last page is not full, add the new user to the last page
      usersInMemoryPerPage.set(lastPageIndex, [
        ...lastPage,
        { ...newUser, id: Math.random() },
      ]);
    } else {
      // If the last page is full, add a new page with the new user
      usersInMemoryPerPage.set(lastPageIndex + 1, [
        { ...newUser, id: Math.random() },
      ]);
    }

    // If the user is the last page, update the current page to refresh the UI
    if (lastPageIndex === get().pagination.page) {
      get().changePage(lastPageIndex);
    }

    // Calculate the new total pages
    // Math.ceil is used to round up the number, because if we have 7 users and 6 per page, we need 2 pages
    const newTotalPages = Math.ceil(
      (get().pagination.total + 1) / get().pagination.per_page,
    );

    // Update the total count
    set({
      pagination: {
        ...get().pagination,
        total: get().pagination.total + 1,
        total_pages: newTotalPages,
      },
    });
  },
  updateUser: async (user: User) => {
    const updateUserInMemory = (user: User, page: number) => {
      const usersInCurrentPage = usersInMemoryPerPage.get(page);
      if (!usersInCurrentPage) return;
      const oldUserIndex = usersInCurrentPage.findIndex(u => u.id === user.id);
      if (oldUserIndex !== -1) {
        usersInCurrentPage[oldUserIndex] = {
          ...usersInCurrentPage[oldUserIndex],
          ...user,
        };
        usersInMemoryPerPage.set(page, usersInCurrentPage);
      }
    };
    const currentPage = get().pagination.page;
    updateUserInMemory(user, currentPage);

    get().changePage(currentPage);
  },
  deleteUser: async (id: number) => {
    const deleteUserInMemory = (id: number) => {
      const currentPage = get().pagination.page;

      const usersInCurrentPage = usersInMemoryPerPage.get(currentPage);
      if (!usersInCurrentPage) return;

      const newUsers = usersInCurrentPage.filter(u => u.id !== id);
      const usersFromNextPage = usersInMemoryPerPage.get(currentPage + 1);
      // If there is a next page, we need to move the first user from the next page to the current page
      if (usersFromNextPage && usersFromNextPage.length > 0) {
        // Grab users from the next page
        const [user, ...newUsersNextPage] = usersFromNextPage;

        usersInMemoryPerPage.set(currentPage, [...newUsers, user]);
        usersInMemoryPerPage.set(currentPage + 1, newUsersNextPage);
      } else {
        usersInMemoryPerPage.set(currentPage, [...newUsers]);
      }

      console.log({ newUsers, usersFromNextPage, currentPage });

      if (newUsers.length === 0 && currentPage > 1) {
        usersInMemoryPerPage.delete(currentPage);

        get().changePage(currentPage - 1);
      } else {
        get().changePage(currentPage);
      }
    };

    deleteUserInMemory(id);

    // UPDATE PAGINATION
    // Calculate the new total pages
    // Math.ceil is used to round up the number, because if we have 7 users and 6 per page, we need 2 pages
    const newTotalPages = Math.ceil(
      (get().pagination.total - 1) / get().pagination.per_page,
    );
    // Delete the user from the total count
    set({
      pagination: {
        ...get().pagination,
        total: get().pagination.total - 1,
        total_pages: newTotalPages,
      },
    });
  },
}));

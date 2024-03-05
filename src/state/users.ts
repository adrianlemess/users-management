import { create } from "zustand";

import { getUsers } from "@/api/users";
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
  changePage: (page: number) => Promise<void>;
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
  getInitialUsers: async (page: number, itemsPerPage: number) => {
    if (get().requestStatus === "pending") return;
    try {
      set({ requestStatus: "pending" });

      const response = await getUsers(page, itemsPerPage);
      usersInMemoryPerPage.set(page, response.data);
      set({
        users: response.data || [],
        pagination: {
          page: response.page,
          per_page: response.per_page,
          total: response.total,
          total_pages: response.total_pages,
        },
        requestStatus: "resolved",
      });
    } catch (error) {
      set({ requestStatus: "rejected" });
    }
  },
  changePage: async (page: number) => {
    if (usersInMemoryPerPage.has(page)) {
      const userResponseCached = usersInMemoryPerPage.get(page);

      if (userResponseCached) {
        set(state => ({
          users: userResponseCached,
          pagination: {
            ...state.pagination,
            page,
          },
        }));

        return;
      }
    }

    try {
      set({ requestStatus: "pending" });

      const response = await getUsers(page, 6);

      const users = response.data || [];

      usersInMemoryPerPage.set(page, users);
      set(state => ({
        users,
        pagination: {
          ...state.pagination,
          page,
        },
      }));
      // If I update the request status along with the user / pagination state, it will bug the data displayed on the UI
      set({ requestStatus: "resolved" });
    } catch (error) {
      set({ requestStatus: "rejected" });
    }
  },
  createUser: async (user: User) => {
    console.log(user);
  },
  updateUser: async (user: User) => {
    console.log(user);
  },
  deleteUser: async (id: number) => {
    console.log(id);
  },
}));

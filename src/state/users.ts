import { create } from "zustand";

import { getUsers } from "@/api/users";
import { Pagination, REQUEST_STATUS, User } from "@/types";

export interface UsersState {
  users: User[];
  pagination: {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
  };
  localUsers: Map<number, Pagination<User>>;
  requestStatus: REQUEST_STATUS;
  getUsers: (page: number, itemsPerPage: number) => Promise<void>;
  createUser: (user: User) => Promise<void>;
  updateUser: (user: User) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUsersStore = create<UsersState>()((set, get) => ({
  users: [],
  pagination: {
    page: 1,
    per_page: 0,
    total: 0,
    total_pages: 0,
  },
  localUsers: new Map<number, Pagination<User>>(),
  requestStatus: "idle",
  getUsers: async (page: number, itemsPerPage) => {
    set({ requestStatus: "pending" });
    const localUsers = get().localUsers;

    if (localUsers.has(page)) {
      const userResponseCached = localUsers.get(page);

      if (userResponseCached) {
        set({
          users: userResponseCached.data,
          pagination: {
            page: userResponseCached.page,
            per_page: userResponseCached.per_page,
            total: userResponseCached.total,
            total_pages: userResponseCached.total_pages,
          },
          requestStatus: "resolved",
        });
        return;
      }
    }

    try {
      const response = await getUsers(page, itemsPerPage);

      set({
        users: response.data || [],
        localUsers: localUsers.set(page, response),
        pagination: {
          page: response.page,
          per_page: response.per_page,
          total: response.total,
          total_pages: response.total_pages,
        },
      });
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
  deleteUser: async (id: string) => {
    console.log(id);
  },
}));

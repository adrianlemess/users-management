import { AxiosError } from "axios";

import { Pagination, User } from "@/types";

import axios from "./axios";

export const getUsers = async (
  page: number,
  itemsPerPage: number,
): Promise<Pagination<User>> => {
  try {
    const response = await axios.get<Pagination<User>>(
      `/users?page=${page}&&per_page=${itemsPerPage}`,
    );

    return response.data;
  } catch (error) {
    const errorResponse = error as AxiosError<{
      error: string;
    }>;

    if (
      errorResponse?.response?.data?.error &&
      errorResponse?.response?.data?.error.includes("user not found")
    ) {
      // Handle error here

      throw new Error(
        "User not found, please sign up or try a different email.",
      );
    }

    // Handle error here
    throw new Error("An error occurred. Please try again later.");
  }
};

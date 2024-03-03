import { AxiosError } from "axios";

import { UserSignInInput, UserSignResponse, UserSignUpInput } from "@/types";

import axios from "./axios";

export const signInApi = async (
  user: UserSignInInput,
): Promise<UserSignResponse> => {
  try {
    const response = await axios.post<{ token: string }>(`/login`, user);

    return { ...response.data, email: user.email };
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

export const signUpApi = async (
  user: UserSignUpInput,
): Promise<UserSignResponse> => {
  try {
    const response = await axios.post<{ token: string; id: number }>(
      `/register`,
      user,
    );
    // Handle successful response here
    return {
      ...response.data,
      first_name: user.first_name,
      last_name: user.last_name,
    };
  } catch (error) {
    const errorResponse = error as AxiosError<{
      error: string;
    }>;

    if (errorResponse?.response?.data?.error) {
      const errorMessage = errorResponse?.response?.data?.error.replace(
        "Note: ",
        "",
      );

      // Handle error here
      throw new Error(errorMessage);
    }

    // Handle error here
    throw new Error("An error occurred. Please try again later.");
  }
};

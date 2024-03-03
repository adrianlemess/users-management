import {
  UserSignInInput,
  UserSignInResponse,
  UserSignUpInput,
  UserSignUpResponse,
} from "@/types";

import axios from "./axios";
import { AxiosError } from "axios";

export const signInApi = async (
  user: UserSignInInput,
): Promise<UserSignInResponse> => {
  try {
    const response = await axios.post<UserSignInResponse>(`/login`, user);

    return response.data;
  } catch (error) {
    const errorResponse = error as AxiosError<{
      error: string;
    }>;

    console.log({ errorResponse });

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
): Promise<UserSignUpResponse> => {
  try {
    const response = await axios.post<UserSignUpResponse>(`/register`, user);
    // Handle successful response here
    return response.data;
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

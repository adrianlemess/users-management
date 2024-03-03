import {
  UserSignInInput,
  UserSignInResponse,
  UserSignUpInput,
  UserSignUpResponse,
} from "@/types";

import axios from "./axios";

export const signInApi = async (
  user: UserSignInInput,
): Promise<UserSignInResponse> => {
  try {
    const response = await axios.post<UserSignInResponse>(`/login`, user);

    return response.data;
  } catch (error) {
    throw new Error("Sign in failed");
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
    // Handle error here
    throw new Error("Sign up failed");
  }
};

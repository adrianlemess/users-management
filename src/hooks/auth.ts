import { signInApi, signUpApi } from "@/api";
import { USER_SESSION_KEY } from "@/constants";
import { UserSignInInput, UserSignResponse, UserSignUpInput } from "@/types";

import useHttpRequest from "./http-request";

export const useSignIn = () => {
  const { response, error, requestStatus, makeRequest } =
    useHttpRequest<UserSignResponse>();

  if (response) {
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(response));
  }

  const handleSignIn = (userSignIn: UserSignInInput) => {
    makeRequest(signInApi.bind(null, userSignIn));
  };

  return { response, error, requestStatus, handleSignIn };
};

export const useSignUp = () => {
  const { response, error, requestStatus, makeRequest } =
    useHttpRequest<UserSignResponse>();

  if (response) {
    localStorage.setItem(USER_SESSION_KEY, JSON.stringify(response));
  }

  const handleSignUp = (userSignUp: UserSignUpInput) => {
    makeRequest(signUpApi.bind(null, userSignUp));
  };

  return { response, error, requestStatus, handleSignUp };
};

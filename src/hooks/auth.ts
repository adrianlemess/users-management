import { signInApi, signUpApi } from "@/api";
import {
  UserSignInInput,
  UserSignInResponse,
  UserSignUpInput,
  UserSignUpResponse,
} from "@/types";

import useHttpRequest from "./http-request";

export const useSignIn = () => {
  const { response, error, requestStatus, makeRequest } =
    useHttpRequest<UserSignInResponse>();

  if (response && response.token) {
    localStorage.setItem("token", response.token);
  }

  const handleSignIn = (userSignIn: UserSignInInput) => {
    makeRequest(signInApi.bind(null, userSignIn));
  };

  return { response, error, requestStatus, handleSignIn };
};

export const useSignUp = () => {
  const { response, error, requestStatus, makeRequest } =
    useHttpRequest<UserSignUpResponse>();

  if (response && response.token) {
    localStorage.setItem("token", response.token);
  }

  const handleSignUp = (userSignUp: UserSignUpInput) => {
    makeRequest(signUpApi.bind(null, userSignUp));
  };

  return { response, error, requestStatus, handleSignUp };
};

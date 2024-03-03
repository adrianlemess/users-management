import { signInApi } from "@/api";
import { UserSignInInput, UserSignInResponse } from "@/types";

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

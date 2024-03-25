import { signInApi, signUpApi } from "@/api";
import { UserSignInInput, UserSignResponse, UserSignUpInput } from "@/types";

import useHttpRequest from "./http-request";

export const useSignIn = () => {
  const { response, error, requestStatus, makeRequest } =
    useHttpRequest<UserSignResponse>();

  const handleSignIn = (userSignIn: UserSignInInput) => {
    makeRequest(signInApi.bind(null, userSignIn));
  };

  return { userSession: response, error, requestStatus, handleSignIn };
};

export const useSignUp = () => {
  const { response, error, requestStatus, makeRequest } =
    useHttpRequest<UserSignResponse>();

  const handleSignUp = (userSignUp: UserSignUpInput) => {
    makeRequest(signUpApi.bind(null, userSignUp));
  };

  return { userSession: response, error, requestStatus, handleSignUp };
};

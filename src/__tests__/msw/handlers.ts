import { http, HttpResponse } from "msw";

import {
  GetUsersResponseMock,
  SignInResponseMock,
  SignUpResponseMock,
} from "./mock";

export const handlers = [
  http.post("/api/login", () => {
    return HttpResponse.json(SignInResponseMock);
  }),

  http.post("/api/register", () => {
    return HttpResponse.json(SignUpResponseMock);
  }),

  http.post("/api/users", () => {
    return HttpResponse.json(GetUsersResponseMock);
  }),
];

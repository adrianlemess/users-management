import { http, HttpResponse } from "msw";

import { SignInResponseMock, SignUpResponseMock } from "./mock";

export const handlers = [
  http.post("/api/login", () => {
    return HttpResponse.json(SignInResponseMock);
  }),

  http.post("/api/register", () => {
    return HttpResponse.json(SignUpResponseMock);
  }),
];

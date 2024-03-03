import axios from "axios";
import { redirect } from "react-router-dom";

import { USER_SESSION_KEY } from "@/constants";
import { BASE_URL } from "@/constants/environment";

const defaultOptions = {
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

// Create instance
const axiosClient = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosClient.interceptors.request.use(function (config) {
  // Skip if is /login or /register
  if (config.url?.includes("/login") || config.url?.includes("/register")) {
    return config;
  }
  const user = JSON.parse(localStorage.getItem(USER_SESSION_KEY) || "{}");
  const token = user?.token || null;

  // if token is not in local storage redirect to /signup using react-router-dom
  if (!token) {
    redirect("/dashboard");
    return config;
  }
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default axiosClient;

import axios from "axios";
import { redirect } from "react-router-dom";

import { BASE_URL, DELAY_REQUESTS } from "@/constants";

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
  // Add delay to requests if DELAY_REQUESTS is set (for testing purposes)
  // @TODO remove this in production

  if (DELAY_REQUESTS) {
    // update url with delay parameter
    const url = new URL(`${defaultOptions.baseURL}${config.url}` || "");

    url.searchParams.set("delay", `${DELAY_REQUESTS}`);
    config.url = url.toString();
  }
  // Skip if is /login or /register
  if (config.url?.includes("/login") || config.url?.includes("/register")) {
    return config;
  }
  const token = localStorage.getItem("token");

  // if token is not in local storage redirect to /signup using react-router-dom
  if (!token) {
    redirect("/dashboard");
    return config;
  }
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

export default axiosClient;

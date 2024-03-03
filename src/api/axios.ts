import axios from "axios";
import { redirect } from "react-router-dom";

const defaultOptions = {
  baseURL: import.meta?.env?.VITE_API_URL || "",
  delay: import.meta?.env?.VITE_DELAY_REQUESTS || 0,
};

// Create instance
const axiosClient = axios.create(defaultOptions);

// Set the AUTH token for any request
axiosClient.interceptors.request.use(function (config) {
  console.log({ defaultOptions, url: config.url, headers: config.headers });

  // Add delay to requests if DELAY_REQUESTS is set (for testing purposes)
  // @TODO remove this in production

  if (defaultOptions.delay) {
    // update url with delay parameter
    const url = new URL(`${defaultOptions.baseURL}${config.url}` || "");
    console.log({
      url,
      configUrl: config.url,
      baseURL: defaultOptions.baseURL,
    });
    url.searchParams.set("delay", `${defaultOptions.delay}`);
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

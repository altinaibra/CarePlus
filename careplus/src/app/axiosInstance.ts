import axios, { AxiosResponse } from "axios";

const host =
  typeof window !== "undefined" ? window.location.hostname : "localhost";
const apiPort = process.env.REACT_APP_API_PORT || "5142";
const fallbackBaseUrl = `http://${host}:${apiPort}/api`;

const resolveApiBaseUrl = () => {
  const configured = process.env.REACT_APP_API_URL?.trim();
  if (!configured) {
    return fallbackBaseUrl;
  }

  // Handle common typo like "https:/localhost:7208/api".
  const fixedConfigured = configured.replace(/^https?:\/(?!\/)/, "$&/");

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(fixedConfigured);
  } catch {
    return fallbackBaseUrl;
  }

  if (typeof window !== "undefined") {
    const currentHost = window.location.hostname;
    const currentIsLanHost =
      currentHost !== "localhost" && currentHost !== "127.0.0.1";
    const apiIsLocalhost =
      parsedUrl.hostname === "localhost" ||
      parsedUrl.hostname === "127.0.0.1" ||
      parsedUrl.hostname === "::1";

    // On mobile/LAN, replace localhost API with the same host used by frontend.
    if (currentIsLanHost && apiIsLocalhost) {
      return `http://${currentHost}:${apiPort}/api`;
    }
  }

  return parsedUrl.toString().replace(/\/$/, "");
};

export const API_BASE_URL = resolveApiBaseUrl();

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");

  if (token) {
    config.headers = config.headers ?? {};
    if ("set" in config.headers) {
      config.headers.set("Authorization", `Bearer ${token}`);
    } else {
      (config.headers as Record<string, string>)["Authorization"] =
        `Bearer ${token}`;
    }
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("authToken");
      localStorage.removeItem("userRole");
      localStorage.removeItem("username");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;

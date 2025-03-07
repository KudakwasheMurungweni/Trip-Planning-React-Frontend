import axios, { AxiosError, AxiosRequestConfig } from "axios";

// Set your base API URL (change for production)
const API_BASE_URL = "http://localhost:8000";

// Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // You can log or process the error here if needed
    return Promise.reject(error);
  }
);

// Centralized error handling for axios requests
export const handleServiceError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{ message?: string; detail?: string }>; // Typing the response data

    const message =
      axiosError.response?.data?.message ||
      axiosError.response?.data?.detail ||
      "An unexpected error occurred";
    throw new Error(message);
  }
  throw new Error("An unexpected error occurred");
};

// Add an interceptor to automatically refresh tokens if expired
api.interceptors.response.use(
  (response) => response, // Success handler
  async (error: AxiosError) => {
    if (error.response?.status === 401) {
      try {
        // Try to refresh token here if needed
        const newToken = await refreshToken(); // Add refreshToken() logic
        if (newToken && error.config) { // Ensure error.config is not undefined
          // Safe access using optional chaining and type casting
          const config = error.config as AxiosRequestConfig;
          if (config && config.headers) { // Ensure headers is defined
            config.headers.Authorization = `Bearer ${newToken}`;
            return api(config); // Retry request
          }
        }
      } catch (err) {
        // Handle refresh token failure (logout, etc.)
        handleServiceError(err);
      }
    }
    // Handle other errors
    return Promise.reject(error);
  }
);

// Function to refresh token (dummy example, replace with real logic)
const refreshToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await api.post("/api/token/refresh/", {
      refresh: refreshToken,
    });
    const newAccessToken = response.data.access;
    localStorage.setItem("authToken", newAccessToken); // Store new token
    return newAccessToken;
  } catch (err) {
    // Handle refresh token failure, logout user if needed
    handleServiceError(err);
    return null;
  }
};

export default api;

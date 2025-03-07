import axios from "axios";
import api from "./api";
import type { AuthUser } from "../models/profile";

export const authService = {
  login: async (
    credentials: { username: string; password: string }
  ): Promise<{ user: AuthUser; token: string }> => {
    try {
      const response = await api.post<{ access: string; refresh: string }>(
        "/api/token/",
        credentials
      );

      const { access: token, refresh: refreshToken } = response.data;

      // Store tokens securely
      localStorage.setItem("authToken", token);
      localStorage.setItem("refreshToken", refreshToken);

      // Fetch user profile
      const user = await authService.getProfile();
      return { user, token };
    } catch (error) {
      throw authService.handleError(error, "Invalid credentials. Please try again.");
    }
  },

  register: async (
    userData: { username: string; email: string; password: string }
  ): Promise<AuthUser> => {
    try {
      const response = await api.post<{ user: AuthUser }>("/api/users/register/", userData);
      return response.data.user;
    } catch (error) {
      throw authService.handleError(error, "Registration failed.");
    }
  },

  logout: (): void => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
  },

  getProfile: async (): Promise<AuthUser> => {
    try {
      const response = await api.get<AuthUser>("/api/users/profile/");
      return response.data;
    } catch (error) {
      throw authService.handleError(error, "Failed to fetch user profile.");
    }
  },

  refreshToken: async (): Promise<string> => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) throw new Error("No refresh token available.");

      const response = await api.post<{ access: string }>("/api/token/refresh/", { refresh: refreshToken });

      const newAccessToken = response.data.access;
      localStorage.setItem("authToken", newAccessToken);
      return newAccessToken;
    } catch (error) {
      authService.logout();
      throw new Error("Session expired. Please log in again.");
    }
  },

  handleError: (error: unknown, defaultMessage: string): Error => {
    if (axios.isAxiosError(error)) {
      const message =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        error.response?.data?.email?.[0] ||
        error.response?.data?.username?.[0] ||
        defaultMessage;
      return new Error(message);
    }
    return new Error(defaultMessage);
  },
};

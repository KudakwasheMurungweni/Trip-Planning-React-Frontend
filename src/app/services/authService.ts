import axios from 'axios';
import api from './api';
import type { AuthUser } from '../models/profile';

export const authService = {
  login: async (
    credentials: { username: string; password: string }
  ): Promise<{ user: AuthUser; token: string }> => {
    try {
      const response = await api.post<{ access: string; refresh: string }>(
        '/api/token/',
        credentials
      );
      const token = response.data.access;

      // Store tokens
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', response.data.refresh);

      // Fetch the user profile using the stored token
      const user = await authService.getProfile();
      return { user, token };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || 'Invalid credentials. Please try again.'
        );
      }
      throw new Error('Login failed due to an unexpected error.');
    }
  },

  register: async (
    userData: { username: string; email: string; password: string }
  ): Promise<AuthUser> => {
    try {
      const response = await api.post<{ user: AuthUser }>('/api/users/register/', userData);
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.email?.[0] ||
          error.response?.data?.username?.[0] ||
          'Registration failed.';
        throw new Error(message);
      }
      throw new Error('Registration failed due to an unexpected error.');
    }
  },

  logout: (): void => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  },

  getProfile: async (): Promise<AuthUser> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        throw new Error('User not authenticated.');
      }

      const response = await api.get<AuthUser>('/api/users/profile/', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail ||
          error.response?.data?.message ||
          'Failed to fetch user profile.'
        );
      }
      throw new Error('Profile fetch failed due to an unexpected error.');
    }
  },

  refreshToken: async (): Promise<string> => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) throw new Error('No refresh token available.');

      const response = await api.post<{ access: string }>('/api/token/refresh/', {
        refresh: refreshToken,
      });

      const newAccessToken = response.data.access;
      localStorage.setItem('authToken', newAccessToken);
      return newAccessToken;
    } catch (error) {
      authService.logout(); // Clear tokens on failure
      throw new Error('Session expired. Please log in again.');
    }
  },
};

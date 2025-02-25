import axios from 'axios';

import api from './api';
import type { AuthUser } from '../models/profile';

export const authService = {
  login: async (credentials: { username: string; password: string }): Promise<AuthUser> => {
    try {
      const response = await api.post<{ user: AuthUser; token: string }>('/api/auth/login/', credentials);
      // Store token in localStorage
      localStorage.setItem('authToken', response.data.token);
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || 'Invalid credentials. Please try again.'
        );
      }
      throw new Error('Login failed due to an unexpected error');
    }
  },

  register: async (userData: { 
    username: string; 
    email?: string;  // Optional if transitioning 
    password: string 
  }): Promise<AuthUser> => {
    try {
      const response = await api.post<{ user: AuthUser }>('/api/auth/register/', userData);
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.email?.[0] || 
                        error.response?.data?.username?.[0] || 
                        'Registration failed';
        throw new Error(message);
      }
      throw new Error('Registration failed due to an unexpected error');
    }
  },

  logout: async (): Promise<void> => {
    try {
      await api.post('/api/auth/logout/');
      // Clear authentication data
      localStorage.removeItem('authToken');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Failed to logout properly');
      }
      throw new Error('Logout failed due to an unexpected error');
    }
  },

  getProfile: async (): Promise<AuthUser> => {
    try {
      const response = await api.get<AuthUser>('/api/auth/profile/');
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error('Failed to fetch user profile');
      }
      throw new Error('Profile fetch failed due to an unexpected error');
    }
  }
};
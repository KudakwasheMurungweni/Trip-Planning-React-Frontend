import axios from 'axios';
import api from './api'; // Import your axios instance from api.ts
import type { AuthUser } from '../models/profile';

export const authService = {
  login: async (credentials: { username: string; password: string }): Promise<string> => {
    try {
      const response = await api.post<{ access: string; refresh: string }>('/api/token/', credentials); // JWT auth endpoint
      const token = response.data.access;
      
      // Store the tokens
      localStorage.setItem('authToken', token);
      localStorage.setItem('refreshToken', response.data.refresh);
      
      return token;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.detail || 'Invalid credentials. Please try again.');
      }
      throw new Error('Login failed due to an unexpected error.');
    }
  },

  register: async (userData: { username: string; email: string; password: string }): Promise<AuthUser> => {
    try {
      const response = await api.post<{ user: AuthUser }>('/api/users/register/', userData); // ✅ Fixed registration URL
      return response.data.user;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.email?.[0] || 
                        error.response?.data?.username?.[0] || 
                        'Registration failed.';
        throw new Error(message);
      }
      throw new Error('Registration failed due to an unexpected error.');
    }
  },

  logout: (): void => {
    // Simply remove the token from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  },

  getProfile: async (): Promise<AuthUser> => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No auth token found');
        throw new Error('User not authenticated.');
      }
  
      console.log('Attempting to fetch profile with token:', token.substring(0, 10) + '...'); // Log partial token for debugging
  
      const response = await api.get<AuthUser>('/api/users/profile/', {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      console.log('Profile response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Profile fetch error:', error);
      
      if (axios.isAxiosError(error)) {
        console.error('Axios error details:', {
          status: error.response?.status,
          data: error.response?.data,
          headers: error.response?.headers
        });
        
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

// api.ts (Axios instance setup)
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || '/api',
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const handleServiceError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message;
    throw new Error(serverMessage || 'An unexpected error occurred');
  }
  throw new Error('An unexpected error occurred');
};

export default api;
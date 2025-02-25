import axios from 'axios';

// Add this to your existing api.ts file
export function handleServiceError(error: unknown, defaultMessage: string): never {
    if (axios.isAxiosError(error)) {
      const serverMessage = error.response?.data?.message;
      throw new Error(serverMessage || defaultMessage);
    }
    throw new Error(defaultMessage);
  }

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
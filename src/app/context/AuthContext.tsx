import React, { createContext, useContext, ReactNode, useState, useEffect } from 'react';
import { AuthUser } from '../models/profile';

interface AuthContextType {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user data');
        localStorage.removeItem('user');
      }
    }
  }, []);

  const login = (userData: AuthUser) => {
    setUser(userData);
    // Store user data in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(userData));
    // Navigation is now handled by the component
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    // Also clear auth tokens
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    // Navigation is now handled by the component
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
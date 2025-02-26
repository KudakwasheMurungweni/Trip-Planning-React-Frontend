import React, { createContext, useContext, ReactNode, useState } from 'react';
import { AuthUser } from '../models/profile';

interface AuthContextType {
  user: AuthUser | null;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const login = (userData: AuthUser) => setUser(userData);
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
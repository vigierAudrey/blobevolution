// src/components/AuthProvider.tsx

"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  user: string | null;
  role: 'particulier' | 'professionnel' | null;
  login: (user: string, role: 'particulier' | 'professionnel') => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<string | null>(null);
  const [role, setRole] = useState<'particulier' | 'professionnel' | null>(null);
  const router = useRouter();

  // Vérifier l'authentification au chargement
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');

    if (storedUser && storedRole) {
      setUser(storedUser);
      setRole(storedRole as 'particulier' | 'professionnel');
      setIsAuthenticated(true);
    }
  }, []);

  // Fonction de login
  const login = (user: string, role: 'particulier' | 'professionnel') => {
    setUser(user);
    setRole(role);
    setIsAuthenticated(true);
    localStorage.setItem('user', user);
    localStorage.setItem('role', role);
  };

  // Fonction de déconnexion
  const logout = () => {
    setUser(null);
    setRole(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('role');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

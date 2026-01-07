'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface AuthContextType {
  isAuthenticated: boolean;
  login: (name: string) => void;
  logout: () => void;
  user: { name: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<{ name: string } | null>(null);
  const router = useRouter();

  // Basic persistence for "login" session
  useEffect(() => {
    const storedUser = localStorage.getItem('taskzen_user');
    if (storedUser) {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (name: string) => {
    const newUser = { name };
    setUser(newUser);
    localStorage.setItem('taskzen_user', JSON.stringify(newUser));
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('taskzen_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

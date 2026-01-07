'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';

interface User {
  _id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  user: User | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  // Initialize loading based on token existence to prevent flashes
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const logout = React.useCallback(() => {
    setUser(null);
    localStorage.removeItem('taskzen_token');
    router.push('/');
  }, [router]);

  useEffect(() => {
    const token = localStorage.getItem('taskzen_token');
    
    if (token) {
      api.get('/users/me')
        .then((response) => {
          setUser(response.data.data || response.data); 
        })
        .catch(() => {
          logout();
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // eslint-disable-next-line
      setIsLoading(false);
    }
  }, [logout]);

  const login = async (email: string, password: string) => {
    // Clear any existing token before attempting login
    localStorage.removeItem('taskzen_token');
    
    try {
      const response = await api.post('/auth/login', { email, password });
      
      // Fix: Extract from response.data.data
      const { token, ...userData } = response.data.data;
      
      localStorage.setItem('taskzen_token', token);
      setUser(userData);
      
      // Force hard navigation to bypass RSC/Router issues
      window.location.href = '/dashboard';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await api.post('/auth/register', { name, email, password });
      // Fix: Extract from response.data.data
      const { token, ...userData } = response.data.data;
      localStorage.setItem('taskzen_token', token);
      setUser(userData);
      router.push('/dashboard');
    } catch (error) {
       console.error('Register error:', error);
       throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, isLoading, login, register, logout, user }}>
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

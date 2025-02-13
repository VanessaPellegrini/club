import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthContextType, AuthState, User } from '../types/auth';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const STORAGE_KEY = 'auth';

interface JWTPayload {
  exp: number;
  user: User;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    const storedAuth = localStorage.getItem(STORAGE_KEY);
    if (storedAuth) {
      try {
        const { token, user } = JSON.parse(storedAuth);
        if (token && user) {
          const decoded = jwtDecode<JWTPayload>(token);
          const currentTime = Date.now() / 1000;
          
          if (decoded.exp > currentTime) {
            setState({
              user,
              token,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            localStorage.removeItem(STORAGE_KEY);
            setState(prev => ({ ...prev, isLoading: false }));
          }
        }
      } catch (error) {
        console.error('Error parsing auth data:', error);
        localStorage.removeItem(STORAGE_KEY);
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = (token: string, user: User) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
    setState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });
  };

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  const updateUser = (user: User) => {
    const currentAuth = localStorage.getItem(STORAGE_KEY);
    if (currentAuth) {
      const { token } = JSON.parse(currentAuth);
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ token, user }));
    }
    setState(prev => ({ ...prev, user }));
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

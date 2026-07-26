'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, User } from '../types';
import { MOCK_USER_ROLE_CREDENTIALS } from '../lib/api';

interface AuthContextType {
  user: User | null;
  currentRole: UserRole;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  switchRole: (role: UserRole) => void;
  loginAsRole: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentRole, setCurrentRole] = useState<UserRole>('SUPER_ADMIN');
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Initial default user for Super Admin
    const cred = MOCK_USER_ROLE_CREDENTIALS[currentRole];
    setUser({
      id: 'u-current',
      email: cred.email,
      username: cred.email.split('@')[0],
      role: currentRole,
      firstName: cred.name.split(' ')[0],
      lastName: cred.name.split(' ').slice(1).join(' '),
      isActive: true,
    });
  }, [currentRole]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const switchRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const loginAsRole = (role: UserRole) => {
    switchRole(role);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        currentRole,
        theme,
        toggleTheme,
        switchRole,
        loginAsRole,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

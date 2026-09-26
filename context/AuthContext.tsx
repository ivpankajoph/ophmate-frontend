'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IUser, IUserAddress } from '../types';
import { fetchApi } from '../lib/api';

interface AuthContextType {
  user: IUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: { firstName: string; lastName: string; email: string; password: string; phone?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<IUser>) => Promise<boolean>;
  manageAddress: (action: 'add' | 'edit' | 'delete' | 'setDefault', address?: Partial<IUserAddress>, addressId?: string) => Promise<boolean>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCurrentUser = async () => {
    const token = localStorage.getItem('ophmart_token');
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const res = await fetchApi<IUser>('/auth/me');
      if (res.success && res.data) {
        setUser(res.data);
      } else {
        localStorage.removeItem('ophmart_token');
        setUser(null);
      }
    } catch {
      localStorage.removeItem('ophmart_token');
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const login = async (email: string, password: string) => {
    const res = await fetchApi<{ user: IUser; accessToken: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });

    if (res.success && res.data) {
      localStorage.setItem('ophmart_token', res.data.accessToken);
      setUser(res.data.user);
      return { success: true };
    }
    return { success: false, message: res.message || 'Login failed' };
  };

  const register = async (data: { firstName: string; lastName: string; email: string; password: string; phone?: string }) => {
    const res = await fetchApi<{ user: IUser; accessToken: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(data)
    });

    if (res.success && res.data) {
      localStorage.setItem('ophmart_token', res.data.accessToken);
      setUser(res.data.user);
      return { success: true };
    }
    return { success: false, message: res.message || 'Registration failed' };
  };

  const logout = () => {
    localStorage.removeItem('ophmart_token');
    setUser(null);
  };

  const updateProfile = async (data: Partial<IUser>) => {
    const res = await fetchApi<IUser>('/auth/profile', {
      method: 'PATCH',
      body: JSON.stringify(data)
    });
    if (res.success && res.data) {
      setUser(res.data);
      return true;
    }
    return false;
  };

  const manageAddress = async (
    action: 'add' | 'edit' | 'delete' | 'setDefault',
    address?: Partial<IUserAddress>,
    addressId?: string
  ) => {
    const res = await fetchApi<IUserAddress[]>('/auth/addresses', {
      method: 'POST',
      body: JSON.stringify({ action, address, addressId })
    });
    if (res.success && res.data && user) {
      setUser({ ...user, addresses: res.data });
      return true;
    }
    return false;
  };

  const isAdmin = user?.role === 'ADMIN' || user?.role === 'SUPER_ADMIN' || user?.role === 'MANAGER';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        manageAddress,
        isAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { authApi } from '../api/auth.api';
import type { User, LoginCredentials, RegisterCredentials } from '../api/auth.api';
import {
  updateMyProfile,
  uploadMyProfileImage,
  updateMyPassword,
  forgotPassword as apiForgotPassword,
  resetPassword as apiResetPassword,
} from '../api/user.api';
import { toast } from 'sonner';

export interface AuthContextType {
  user: User | null;
  role: 'customer' | 'restaurantOwner' | 'admin' | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<User>;
  registerCustomer: (data: Omit<RegisterCredentials, 'role'>) => Promise<User>;
  registerRestaurant: (userData: RegisterCredentials, restaurantData: any) => Promise<void>;
  logout: () => Promise<void>;
  checkSession: () => Promise<void>;
  // Dashboard methods
  updateProfile: (data: { name?: string; phone?: string }) => Promise<void>;
  uploadProfileImage: (file: File) => Promise<void>;
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const checkSession = useCallback(async () => {
    try {
      setIsLoading(true);
      const sessionUser = await authApi.getMe();
      setUser(sessionUser);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  const login = async (credentials: LoginCredentials) => {
    const { user: loggedInUser } = await authApi.login(credentials);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const registerCustomer = async (data: Omit<RegisterCredentials, 'role'>) => {
    const newUser = await authApi.register({ ...data, role: 'customer' });
    return newUser;
  };

  const registerRestaurant = async (userData: RegisterCredentials, restaurantData: any) => {
    await authApi.register(userData);
    await authApi.login({ email: userData.email, password: userData.password });
    const { apiClient } = await import('../api/apiClient');
    await apiClient('/restaurant', {
      method: 'POST',
      body: JSON.stringify(restaurantData),
    });
    await authApi.logout();
    setUser(null);
  };

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('Logout error:', error);
      toast.error('Failed to logout cleanly from server');
    } finally {
      setUser(null);
    }
  };

  const updateProfile = async (data: { name?: string; phone?: string }) => {
    const updated = await updateMyProfile(data);
    setUser(updated);
  };

  const uploadProfileImage = async (file: File) => {
    const updated = await uploadMyProfileImage(file);
    setUser(updated);
  };

  const updatePassword = async (currentPassword: string, newPassword: string) => {
    await updateMyPassword({ currentPassword, newPassword });
  };

  const forgotPassword = async (email: string) => {
    await apiForgotPassword(email);
  };

  const resetPassword = async (token: string, password: string) => {
    await apiResetPassword(token, password);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role: user?.role || null,
        isAuthenticated: !!user,
        isLoading,
        login,
        registerCustomer,
        registerRestaurant,
        logout,
        checkSession,
        updateProfile,
        uploadProfileImage,
        updatePassword,
        forgotPassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

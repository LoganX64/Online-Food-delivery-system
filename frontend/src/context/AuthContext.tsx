import React, { createContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { authApi } from '../api/auth.api';
import type { User, LoginCredentials, RegisterCredentials } from '../api/auth.api';
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
    } catch (error) {
      // 401 means no valid session, which is expected for guests
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Validate session on first mount
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
    // 1. Create the user account
    await authApi.register(userData);
    
    // 2. Temporarily log in to get the secure session
    await authApi.login({ email: userData.email, password: userData.password });
    
    // 3. Create the restaurant
    const { apiClient } = await import('../api/apiClient');
    await apiClient('/restaurant', {
      method: 'POST',
      body: JSON.stringify(restaurantData),
    });
    
    // 4. Log out to prevent automatic login
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
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

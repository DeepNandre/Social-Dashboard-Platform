import React, { createContext, useState, useEffect, ReactNode } from 'react';

// Define the User type
interface User {
  id: string;
  name: string;
  email: string;
  roles?: string[];
}

// Define the UserContext interface
interface UserContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  error: string | null;
}

// Create the context with a default value
export const UserContext = createContext<UserContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  error: null
});

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        // Check for stored authentication token
        const token = localStorage.getItem('auth_token');
        
        if (token) {
          // For demo purposes, we'll create a mock user
          // In a real app, you would validate the token with your auth service
          setUser({
            id: '1',
            name: 'Demo User',
            email: 'demo@enspecpower.com',
            roles: ['user']
          });
        }
      } catch (err) {
        console.error('Failed to check authentication status:', err);
        setError('Authentication check failed');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      // This is a mock login function
      // In a real app, you would validate credentials with your auth service
      if (email && password) {
        // Simulate successful login
        const userData = {
          id: '1',
          name: 'Demo User',
          email: email,
          roles: ['user']
        };
        
        // Store auth token in local storage
        localStorage.setItem('auth_token', 'mock_token_123');
        
        setUser(userData);
      } else {
        throw new Error('Email and password are required');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Login failed';
      setError(errorMessage);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    // Remove auth token from local storage
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    error
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
} 
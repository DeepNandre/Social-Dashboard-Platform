import React, { createContext, useState, useEffect, ReactNode, useContext } from 'react';

// Define the User type to match what your app expects
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
  preferences?: {
    theme: string;
    favoriteReports: any[];
  };
}

// Define the context interface
interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create the context with a default value
export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
});

// Create a hook for easier context use
export function useUser() {
  return useContext(UserContext);
}

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  // Check if user is already logged in on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (err) {
        console.error('Failed to parse saved user data:', err);
        localStorage.removeItem('user');
      }
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// We'll implement the proper provider when MSAL is installed

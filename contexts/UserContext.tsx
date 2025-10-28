import React, { createContext, useState, useContext, ReactNode } from 'react';
// FIX: Corrected import path for types.ts to be a relative path.
import { Subject, User } from '../types';

interface UserContextType {
  currentSubject: Subject | null;
  setCurrentSubject: (subject: Subject | null) => void;
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentSubject, setCurrentSubject] = useState<Subject | null>(null);
  const [user, setUser] = useState<User | null>(null);

  // Simulate login
  const login = (userData: User) => {
    setUser(userData);
  };

  // Simulate logout
  const logout = () => {
    setUser(null);
    setCurrentSubject(null); // Reset subject on logout
  };


  return (
    <UserContext.Provider value={{ currentSubject, setCurrentSubject, user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
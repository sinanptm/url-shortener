import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  signIn: (userName: string, password: string) => void;
  signOut: () => void;
  signUp: (userName: string, name: string, password: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const token = useMemo(() => localStorage.getItem('token'), []);

  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [token]);

  const signIn = useCallback((userName: string, password: string) => {
    setAuthenticated(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  }, []);

  const signUp = useCallback((userName: string, name: string, password: string) => {

  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  );
};

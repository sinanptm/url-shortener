import React, { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  signOut: () => void;
  setCredentials: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode; }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();


  useEffect(() => {
    if (token) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, [token]);

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    navigate('/');
    setAuthenticated(false);
  }, []);

  const setCredentials = (token: string) => {
    if (token) {
      localStorage.setItem("token", token);
      setAuthenticated(true);
      console.log(token);

    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, signOut, setCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

import { createContext, FC, ReactNode, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isAuthenticated: boolean;
  signOut: () => void;
  setCredentials: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const isAuth = !!token && token.trim() !== '';
    setAuthenticated(isAuth);    
  }, []);   

  const signOut = useCallback(() => {
    localStorage.removeItem('token');
    setAuthenticated(false); 
    navigate('/'); 
  }, [navigate]);

  const setCredentials = useCallback((token: string) => {
    if (token) {
      localStorage.setItem("token", token);
      setAuthenticated(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, signOut, setCredentials }}>
      {children}
    </AuthContext.Provider>
  );
};

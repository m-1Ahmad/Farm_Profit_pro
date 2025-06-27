import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface AuthContextType {
  isAuthenticated: boolean;
  user: { name: string; email: string; is_verified?: boolean } | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string, address: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; is_verified?: boolean } | null>(null);

  // Restore auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    const storedUser = localStorage.getItem('user');
    if (storedAuth === 'true' && storedUser) {
      setIsAuthenticated(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login/', {
        email,
        password
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser({ name: response.data.name, email: response.data.email, is_verified: response.data.is_verified });
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('user', JSON.stringify({ name: response.data.name, email: response.data.email, is_verified: response.data.is_verified }));
      } else {
        setUser(null);
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('user');
        throw new Error('Login failed');
      }
    } catch (error: any) {
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem('isAuthenticated');
      localStorage.removeItem('user');
      if (error.response && error.response.data && error.response.data.error) {
        throw new Error(error.response.data.error);
      } else {
        throw new Error('Login failed. Please try again later.');
      }
    }
  };

  const signup = async (email: string, password: string, name: string, address: string) => {
    await axios.post('http://127.0.0.1:8000/api/signup/', {
     email, password, name, address 
    })
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
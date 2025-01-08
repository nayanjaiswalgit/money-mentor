import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and validate
    const token = localStorage.getItem('auth_token');
    if (token) {
      // Simulate loading user data
      setTimeout(() => {
        setUser({
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User'
        });
        setLoading(false);
      }, 1000);
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email: string, password: string) => {
    // try {
    //   // Simulate API call
    //   await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (email === 'demo@example.com' && password === 'password') {
        const user = {
          id: '1',
          email: 'demo@example.com',
          name: 'Demo User'
        };
        localStorage.setItem('auth_token', 'demo_token');
        setUser(user);
      } else {
        throw new Error('Invalid credentials');
      }
    // } catch (error) {
    //   throw error;
  //   // }
  };

  const signup = async (email: string, password: string, name: string) => {
    // try {
    //   // Simulate API call
    //   await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = {
        id: '1',
        email,
        name
      };
      localStorage.setItem('auth_token', 'demo_token');
      setUser(user);
  //   } catch (error) {
  //     throw error;
  //   }
  };


  const logout = async () => {
    localStorage.removeItem('auth_token');
    setUser(null);
  };

  const forgotPassword = async (email: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // In a real app, this would trigger a password reset email
  };

  return (
    <AuthContext.Provider value={{
      user,
      loading,
      login,
      signup,
      logout,
      forgotPassword
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
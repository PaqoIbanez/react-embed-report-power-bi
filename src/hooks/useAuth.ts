import { useState } from 'react';

export function useAuth() {
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>(() => {
    return Boolean(localStorage.getItem('token'));
  });

  const login = (token: string) => {
    localStorage.setItem('token', token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout
  };
}

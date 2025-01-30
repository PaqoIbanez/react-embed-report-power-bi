import React, { createContext, useContext, useEffect, useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';

interface AuthContextProps {
  isAuthenticated: boolean;
  checkAuthStatus: () => Promise<void>;
  login: ( email: string, password: string ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>( undefined );

export const AuthProvider: React.FC<{ children: React.ReactNode; }> = ( { children } ) => {
  const [ isAuthenticated, setIsAuthenticated ] = useState( false );

  // Verifica si la cookie es válida
  const checkAuthStatus = async () => {
    try {
      const resp = await axiosInstance.get( '/check' );
      if ( resp.data?.isAuthenticated ) {
        setIsAuthenticated( true );
      } else {
        setIsAuthenticated( false );
      }
    } catch {
      setIsAuthenticated( false );
    }
  };

  // Llamar checkAuthStatus cuando cargue la app, para saber si ya hay cookie
  useEffect( () => {
    checkAuthStatus();
  }, [] );

  // Hacer login
  const login = async ( email: string, password: string ) => {
    const resp = await axiosInstance.post( '/login', { email, password } );
    if ( resp.status === 200 ) {
      // Cookie está set en el servidor
      setIsAuthenticated( true );
    } else {
      throw new Error( 'Error al iniciar sesión' );
    }
  };

  // Hacer logout
  const logout = async () => {
    await axiosInstance.post( '/logout' );
    setIsAuthenticated( false );
  };

  return (
    <AuthContext.Provider
      value={ {
        isAuthenticated,
        checkAuthStatus,
        login,
        logout
      } }
    >
      { children }
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext( AuthContext );
  if ( !context ) {
    throw new Error( 'useAuth must be used within an AuthProvider' );
  }
  return context;
};

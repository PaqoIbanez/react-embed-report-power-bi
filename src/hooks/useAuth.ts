import { useState } from 'react';

export function useAuth() {
  const [ isAuthenticated, setIsAuthenticated ] = useState<boolean>( () => {
    // Checa si hay token en localStorage
    return Boolean( localStorage.getItem( 'token' ) );
  } );

  // Función para guardar el token y cambiar el estado de autenticación
  const login = ( token: string ) => {
    localStorage.setItem( 'token', token );
    setIsAuthenticated( true );
  };

  // Función para limpiar el token y actualizar el estado
  const logout = () => {
    localStorage.removeItem( 'token' );
    setIsAuthenticated( false );
  };

  return {
    isAuthenticated,
    login,
    logout
  };
}

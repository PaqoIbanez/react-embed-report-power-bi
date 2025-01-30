import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { axiosInstance } from '../api/axiosInstance';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ errorMessage, setErrorMessage ] = useState( '' );
  const [ isLoading, setIsLoading ] = useState( false );

  // Llamada única al hook
  const { login } = useAuth();

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    setIsLoading( true );
    setErrorMessage( '' );
    try {
      const response = await axiosInstance.post( '/login', { email, password } );
      const { token } = response.data;
      login( token ); // Almacena en localStorage y setIsAuthenticated(true)
    } catch ( err ) {
      setErrorMessage( 'Usuario o contraseña incorrectos.' );
    } finally {
      setIsLoading( false );
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={ { display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' } }
    >
      <Paper elevation={ 3 } sx={ { p: 4, width: '100%' } }>
        <Typography variant="h4" align="center" gutterBottom>
          Iniciar Sesión
        </Typography>

        <Box
          component="form"
          onSubmit={ handleSubmit }
          sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }
        >
          <TextField
            label="Correo electrónico"
            variant="outlined"
            value={ email }
            onChange={ ( e ) => setEmail( e.target.value ) }
            required
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            type="password"
            value={ password }
            onChange={ ( e ) => setPassword( e.target.value ) }
            required
          />

          { errorMessage && (
            <Typography variant="body2" color="error">
              { errorMessage }
            </Typography>
          ) }

          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={ isLoading }
          >
            { isLoading ? 'Cargando...' : 'Acceder' }
          </Button>

        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;

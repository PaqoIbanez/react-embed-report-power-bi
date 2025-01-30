import { Box, Button, Container, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { axiosInstance } from '../api/axiosInstance';
import { useAuth } from '../hooks/useAuth';

const LoginPage: React.FC = () => {
  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ errorMessage, setErrorMessage ] = useState( '' );
  const navigate = useNavigate();

  const { isAuthenticated } = useAuth();

  useEffect( () => {
    if ( isAuthenticated ) {
      navigate( '/report' );
    }
  }, [ isAuthenticated, navigate ] );

  // Instancia local del hook de auth. 
  // (En una app real, podrías tener un AuthContext global, etc.)
  const { login } = useAuth();

  const handleSubmit = async ( e: React.FormEvent ) => {
    e.preventDefault();
    setErrorMessage( '' );

    try {
      const response = await axiosInstance.post( '/login', { email, password } );
      // El backend responde con { token }
      const { token } = response.data;
      if ( token ) {
        // Guardamos el token y redirigimos
        login( token );
        navigate( '/report' );
      }
    } catch ( error: any ) {
      setErrorMessage( 'Usuario o contraseña incorrectos.' );
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
        <Box component="form" onSubmit={ handleSubmit } sx={ { display: 'flex', flexDirection: 'column', gap: 2 } }>
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

          <Button type="submit" variant="contained" size="large" sx={ { mt: 2 } }>
            Acceder
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;

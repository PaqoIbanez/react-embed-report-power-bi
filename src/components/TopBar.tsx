import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const TopBar: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AppBar position="fixed" sx={{ width: '100%', top: 0, left: 0 }}>
      <Toolbar style={{backgroundColor: '#1e2636'}}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mi App Power BI
        </Typography>
        <Button color="inherit" onClick={handleLogout}>
          Cerrar Sesión
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default TopBar;

import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ReportPage from './pages/ReportPage';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Ruta de Login */ }
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/report" replace /> : <LoginPage />
        }
      />

      {/* Ruta de Report: protegida */ }
      <Route
        path="/report"
        element={
          isAuthenticated ? <ReportPage /> : <Navigate to="/login" replace />
        }
      />

      {/* Cualquier otra ruta lleva a /login */ }
      <Route
        path="*"
        element={ <Navigate to="/login" replace /> }
      />
    </Routes>
  );
}


export default App;

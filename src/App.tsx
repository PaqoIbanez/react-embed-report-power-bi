import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import ReportPage from './pages/ReportPage';

function App() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* Si NO estoy autenticado, muestro <LoginPage>. 
          Si SÍ lo estoy, navego a /report de inmediato. */}
      <Route
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/report" replace /> : <LoginPage />
        }
      />

      {/* Si estoy autenticado, muestro <ReportPage>. 
          Si NO lo estoy, navego a /login. */}
      <Route
        path="/report"
        element={
          isAuthenticated ? <ReportPage /> : <Navigate to="/login" replace />
        }
      />


      {/* Ruta por defecto -> redirige a /login */ }
      <Route path="*" element={ <Navigate to="/login" replace /> } />
    </Routes>
  );
}


export default App;

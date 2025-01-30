import { Navigate, Route, Routes } from 'react-router-dom';

import { useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';

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
        path="/login"
        element={
          isAuthenticated ? <Navigate to="/report" /> : <LoginPage />
        }
      />



      {/* Ruta por defecto -> redirige a /login */ }
      <Route path="*" element={ <Navigate to="/login" replace /> } />
    </Routes>
  );
}


export default App;

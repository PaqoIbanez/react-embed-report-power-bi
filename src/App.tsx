import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './hooks/useAuth';
import LoginPage from './pages/LoginPage';
import ReportPage from './pages/ReportPage';

function App() {
  // Si deseas proteger rutas, podrías crear un componente "PrivateRoute"
  // o usar un hook que verifique la presencia del token.
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      {/* RUTA LOGIN (pública) */}
      <Route path="/login" element={<LoginPage />} />

      {/* RUTA PARA MOSTRAR REPORTE POWER BI (protegida) */}
      <Route
        path="/report"
        element={
          isAuthenticated ? <ReportPage /> : <Navigate to="/login" replace />
        }
      />

      {/* Ruta por defecto -> redirige a /login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;

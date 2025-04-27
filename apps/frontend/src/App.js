import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import PrivateRoute from './routes/PrivateRoute';
import RoleRoute    from './routes/RoleRoute';

import LoginPage    from './pages/auth/LoginPage';
import RegisterPage from './pages/auth/RegisterPage';
import RiderDash    from './pages/rider/Dashboard';
import ProDash      from './pages/professional/Dashboard';
import AdminDash    from './pages/admin/Dashboard';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* routes publiques d’auth */}
          <Route path="auth">
            <Route path="login"    element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          {/* toutes les routes privées */}
          <Route element={<PrivateRoute />}>
            {/* Dashboard Rider */}
            <Route element={<RoleRoute allowedRoles={['rider']} />}>
              <Route path="rider/dashboard" element={<RiderDash />} />
            </Route>

            {/* Dashboard Pro */}
            <Route element={<RoleRoute allowedRoles={['professional']} />}>
              <Route path="pro/dashboard" element={<ProDash />} />
            </Route>

            {/* Dashboard Admin */}
            <Route element={<RoleRoute allowedRoles={['admin']} />}>
              <Route path="admin/dashboard" element={<AdminDash />} />
            </Route>
          </Route>

          {/* page 404 */}
          <Route path="*" element={<div>Page non trouvée</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

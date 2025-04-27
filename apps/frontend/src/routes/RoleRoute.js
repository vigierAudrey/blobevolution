import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RoleRoute({ allowedRoles }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/auth/login" replace />;
  return allowedRoles.includes(user.role)
    ? <Outlet />
    : <Navigate to="/" replace />;
}

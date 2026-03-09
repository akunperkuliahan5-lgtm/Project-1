import { Navigate } from 'react-router-dom';

export default function AdminRoute({ children }) {
  const isAuthenticated = localStorage.getItem('kkn_admin_auth') === 'true';
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

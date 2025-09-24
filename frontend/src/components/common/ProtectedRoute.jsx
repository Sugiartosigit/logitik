import { Navigate } from 'react-router-dom';
import { authService } from '../../services/authService';

const ProtectedRoute = ({ children, roles = [] }) => {
  const isAuthenticated = authService.isAuthenticated();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // Check role requirements if specified
  if (roles.length > 0 && !authService.hasAnyRole(roles)) {
    return <Navigate to="/access-denied" replace />;
  }
  
  return children;
};

export default ProtectedRoute;

import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles }) => {
  const token = sessionStorage.getItem("token");
  const userRole = useSelector((state) => state.auth.userRole);

  // ✅ Token missing
  if (!token) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Role not allowed
  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // ✅ Access allowed
  return <Outlet />;
};

export default PrivateRoute;

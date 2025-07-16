import { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import RouteSessionExpiredModal from './RouteSessionExpiredModal';

const PrivateRoute = ({ allowedRoles }) => {
  const token = localStorage.getItem('token');
  const userRole = useSelector((state) => state.auth.userRole);
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle logout from another tab
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === 'token' && e.newValue === null) {
        setModalMessage('Your session has expired. Please log in again.');
        setShowModal(true);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Handle unauthorized or not logged in
  useEffect(() => {
    if (!token) {
      if (userRole) {
        // If userRole exists but token gone (logout)
        setModalMessage('Your session has expired. Please log in again.');
      } else {
        // Direct access without login
        setModalMessage('You need to login first to access this page.');
        navigate('/')
      }
      setShowModal(true);
    }
  }, [token, userRole]);

  const handleRedirect = () => {
    setShowModal(false);
    navigate('/', { replace: true });
  };

  if (showModal) {
    return (
      <RouteSessionExpiredModal
        show={true}
        message={modalMessage}
        onConfirm={handleRedirect}
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;

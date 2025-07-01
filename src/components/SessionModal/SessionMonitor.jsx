// src/components/SessionModal/SessionMonitor.jsx
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import SessionExpiredModal from './SessionExpiredModal';

const SessionMonitor = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const isLoginPage = location.pathname === '/' || location.pathname === '/login';

  const triggerSessionExpiry = () => {
    if (!showModal && !isLoginPage) {
      setShowModal(true);
      dispatch(logout());
    }
  };

  // Polling for same-tab token removal
  useEffect(() => {
    if (isLoginPage) return; // ✅ Skip logic on login page

    const checkToken = () => {
      const token = localStorage.getItem('token');
      if (!token) {
        triggerSessionExpiry();
      }
    };
    const interval = setInterval(checkToken, 1000);
    return () => clearInterval(interval);
  }, [isLoginPage]);

  // Cross-tab token removal detection
  useEffect(() => {
    if (isLoginPage) return;

    const handleStorage = (event) => {
      if (event.key === 'token' && event.newValue === null) {
        triggerSessionExpiry();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [isLoginPage]);

  const handleLoginRedirect = () => {
    setShowModal(false);
    navigate('/');
  };

  return (
    !isLoginPage && (
      <SessionExpiredModal show={showModal} onLogin={handleLoginRedirect} />
    )
  );
};

export default SessionMonitor;

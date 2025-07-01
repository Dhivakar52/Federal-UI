import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light text-center">
      <h1 className="display-4 text-danger">403 - Access Denied</h1>
      <p className="lead">You do not have permission to view this page.</p>
      <Button variant="primary" onClick={() => navigate("/")}>
        Go to Login
      </Button>
    </div>
  );
};

export default Unauthorized;

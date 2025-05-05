import React, { useState } from 'react';
import axios from 'axios';
import {  Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 
import logoIcon from '../../assets/images/logo.png';
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';

import '../../css/Login.css';

const LoginTemplate = () => {
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [lastLogin, setLastLogin] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      const result = await axios.post(`${apiUrl}`, { loginId, password  });
      console.log(loginId, password, result.data.name, result.data);

      if (result.data.message === "Login successful") {
        setLastLogin(result.data.lastLogin);
        setSuccess("Login successful!");
        sessionStorage.removeItem("lastLogout");
        sessionStorage.setItem("userEmail", loginId);
        sessionStorage.setItem("userName", result.data.name);
        dispatch(login({
          userName: result.data.name,
          userEmail: loginId,
        }));
      
        navigate('/summary');  
      }
    } catch (err) {
      console.error('Error during login:', err.response ? err.response.data : err.message);
      setError(err.response ? err.response.data.message : 'Error during login');
    }
  };

  return (
    <div className="loginCenter">
    <Card className="login_box">
      <Card.Body>
        <Card.Title className="text-center">
          <div className="title_logo">
            <span>
              <img src={logoIcon} alt="Logo" className="img-fluid" />
            </span>
          </div>
        </Card.Title>

        {/* Alerts */}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Login ID */}
          <Form.Group controlId="formLoginId">
            <Form.Label>Email or Login ID</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your email or login ID"
              onChange={(e) => setLoginId(e.target.value)}
              value={loginId}
              required
            />
          </Form.Group>

          {/* Password */}
          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-2"
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword((prev) => !prev);
                }}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </Form.Group>

          {/* Remember Me & Forgot Password */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Form.Check type="checkbox" id="rememberMe" label="Remember Me" />
            <a href="#" className="text-primary" style={{ textDecoration: 'none' }}>
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <div className="text-end mt-5">
            <Button variant="primary" type="submit" className='btnColor'>
              Login
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  </div>
  );
};

export default LoginTemplate;

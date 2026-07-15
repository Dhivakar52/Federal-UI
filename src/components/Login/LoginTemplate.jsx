import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 
import { useDispatch } from 'react-redux';
import { login } from '../../redux/authSlice';
import logoIcon from '../../assets/images/logo.png';

import '../../css/Login.css';

const LoginTemplate = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function decodeJWT(token) {
    try {
      const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(base64));
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return {};
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}`, { 
        email: email, 
        password: password 
      });

      console.log("Login Response:", response.data);

      const { token, user } = response.data;

      const userName = user?.name || '';
      const userEmail = user?.email || email;
      const userRole = user?.role || 'user';

      // Store in localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', userEmail);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userRole', userRole);

      // Update Redux
      dispatch(login({
        userName: userName,
        userEmail: userEmail,
        userRole: userRole,
      }));

      // ✅ Show success message
      setSuccess("Login successful!!");

      // ✅ Wait 1.5 seconds before navigating
      setTimeout(() => {
        setLoading(false);
        
        // Navigate based on role
        if (userRole?.toLowerCase() === 'admin') {
          navigate('/admin-dashboard');
        } else {
          navigate('/summary');
        }
      }, 1500);

    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || err.response?.data?.error || 'Login failed');
      setLoading(false);
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

          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formEmail">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>

            <Form.Group controlId="formPassword" className="mt-3">
              <Form.Label>Password</Form.Label>
              <div className="position-relative">
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={loading}
                />
                <span
                  className="position-absolute top-50 end-0 translate-middle-y me-2"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowPassword(prev => !prev)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </span>
              </div>
            </Form.Group>

            <div className="d-flex justify-content-between align-items-center mt-3">
              <Form.Check type="checkbox" id="rememberMe" label="Remember Me" disabled={loading} />
              <a href="/forgot-password" className="text-primary" style={{ textDecoration: 'none' }}>
                Forgot Password?
              </a>
            </div>

            <div className="text-end mt-5">
              <Button 
                variant="primary" 
                type="submit" 
                className='btnColor'
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default LoginTemplate;
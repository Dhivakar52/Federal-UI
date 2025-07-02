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
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function decodeJWT(token) {
  const base64 = token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/');
  return JSON.parse(atob(base64));
}



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // const response = await axios.post(`${apiUrl}/login`, { loginId, password });

       const result = await axios.post(`${apiUrl}/login`, { loginId, password  });


      const { token } = response.data;
      const decoded = decodeJWT(token); 
      console.log("Decoded JWT:", decoded);

      const { name, email, role } = decoded;

      // ✅ Store token and user data in sessionStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userEmail', email || loginId);
      localStorage.setItem('userName', name);
      localStorage.setItem('userRole', role);

      // ✅ Update Redux
      dispatch(login({
        userName: name,
        userEmail: email || loginId,
        userRole: role,
      }));

      setSuccess("Login successful!");

      // ✅ Navigate based on role
     if (result.data.role?.toLowerCase() === 'admin'||
           result.data.name?.toLowerCase() === 'Admin' ) {
          navigate('/admin-dashboard');
        } else {
        navigate('/summary');
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.response?.data?.message || 'Login failed');
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
            <Form.Group controlId="formLoginId">
              <Form.Label>Email or Login ID</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your email or login ID"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
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
              <Form.Check type="checkbox" id="rememberMe" label="Remember Me" />
              <a href="#" className="text-primary" style={{ textDecoration: 'none' }}>
                Forgot Password?
              </a>
            </div>

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

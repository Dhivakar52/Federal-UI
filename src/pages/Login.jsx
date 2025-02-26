import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react'; 
import  logoIcon from '../assets/images/logo.png'
import  sideImg from '../assets/images/sideImg.png'
import { MenuContext, MenuProvider } from '../components/Context/MenuProvider';
import '../css/Login.css';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const {users}= useContext(MenuContext);

  const navigate = useNavigate();

 


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
 
  
    setTimeout(() => {
      const user = users.find(u => u.email === email && u.password === password);
  
      if (user) {
        setSuccess('Login Successful!');
        sessionStorage.setItem("userEmail", user.email);
        sessionStorage.setItem("userName", user.name);
        navigate('/trends');
      } else {
        setError('Invalid email or password');
      }
    }, 2000); 
  };
  

  return (
    <section >
      <Container fluid style={{ height: '100vh' }}>
        <Row >
         
         <Col  xs={12} md={6} xl={8}>
             <div className="login_bg">
               <img src={sideImg} className='img-fluid' alt="" />
             </div>
         </Col>

         <Col xs={12} md={6} xl={3}>
  <div className="loginCenter">
    <Card className="login_box">
      <Card.Body>
        <Card.Title className="text-center">
          <div className="title_logo">
            <span>
              <img src={logoIcon} alt="" className="img-fluid" />
            </span>
          </div>
        </Card.Title>

        {/* Error and Success Alerts */}
        {error && <Alert variant="danger">{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group controlId="formEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mt-3">
            <Form.Label>Password</Form.Label>
            <div className="position-relative">
              <Form.Control
                type={showPassword ? "text" : "password"} // Toggles between text and password
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="pr-5" // Adjust padding for icon space
              />
              <span
                className="position-absolute top-50 end-0 translate-middle-y me-2"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>
          </Form.Group>

          {/* Remember Me and Forgot Password */}
          <div className="d-flex justify-content-between align-items-center mt-3">
            <Form.Check 
              type="checkbox" 
              id="rememberMe" 
              label="Remember Me" 
            />
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
</Col>

        </Row>
      </Container>
    </section>
  );
};

export default LoginPage;

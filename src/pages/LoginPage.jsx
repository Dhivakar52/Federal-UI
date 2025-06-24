import React from 'react';

import { Container, Row, Col, } from 'react-bootstrap';
import sideImg from '../assets/images/sideImg.png';
import '../css/Login.css';
import LoginTemplate from '../components/Login/LoginTemplate';

const LoginPage = () => {

  return (
    <section>
      <Container fluid style={{ height: '100vh' }}>
        <Row>
          {/* Side Image */}
          <Col xs={12} md={6} xl={8}>
            <div className="login_bg">
              <img src={sideImg} className='img-fluid' alt="Login Visual" />
            </div>
          </Col>

          {/* Login Form */}
          <Col xs={12} md={6} xl={3}>
          <LoginTemplate/>
            
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default LoginPage;

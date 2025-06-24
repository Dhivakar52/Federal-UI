import React from 'react'
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import '../css/Footer.css'
const Footer = () => {
  return (
    <Container fluid>
    <Row>
      <Col xs={12}>

    <div className='footer_section'>
     <p>Federal@2025</p>
    </div>
    </Col>
      </Row>
       </Container>
  )
}

export default Footer

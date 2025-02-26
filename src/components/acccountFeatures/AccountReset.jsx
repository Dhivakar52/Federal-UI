import React from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../css/Account.css"
import "../../css/Trending.css"


const AccountReset = () => {
  return (
    <div>
             <Container fluid>
      <Row>
        <Col sm={12} md={12}>
             
             <div className='accounts'>
            
             <Form>
             <Form.Label column >
           Reset Password
        </Form.Label>
             <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
    
        <Col sm="10">
          <Form.Control type='name' defaultValue="" />
        </Col>
      </Form.Group>
     
    </Form>  
     <div>
        </div> 
 
             </div>
        
        </Col>
      </Row>
    </Container>
       
    </div>
  )
}

export default AccountReset

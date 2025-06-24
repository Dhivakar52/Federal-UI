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
              <div>
             <Form.Label column >
           Reset Password
        </Form.Label>
             <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
    
        <Col sm="12">
          <Form.Control type='name' defaultValue="" />
        </Col>
      </Form.Group>
      </div>
      
    </Form>  
     <div>
     <Row className='mt-3'>
                <Col xs={6}>
                  <Button
                    variant="primary"
                    className='clearBtn BtnSize'
                   
                  >
                  Cancel
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    variant="secondary"
                    className='submitBtn BtnSize'
                
                  >
                    Conform
                  </Button>
                </Col>
              </Row>
        </div> 
 
             </div>
        
        </Col>
      </Row>
    </Container>
       
    </div>
  )
}

export default AccountReset

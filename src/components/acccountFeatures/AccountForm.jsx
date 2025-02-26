import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import {Camera } from "lucide-react";
import "../../css/Account.css"
import "../../css/Trending.css"
import { useNavigate } from 'react-router-dom';

const AccountForm = () => {

    const [image, setImage] = useState(null);
    const navigate = useNavigate();
    const userEmail = sessionStorage.getItem("userEmail");
   const userName= sessionStorage.getItem("userName");


   const handleLogout = () => {
    sessionStorage.clear();  
    navigate('/');  
  };
  const handleReset = () => {
   
    navigate('/account/reset');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      console.log(reader)
      reader.onloadend = () => {
        console.log(reader.result)
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
      
    }
  };

  return (
    <div>
         <Container fluid>
      <Row>
        <Col sm={12} md={12}>
             
             <div className='accounts'>
               {/* <div className='accImage'>   
               <Image src={`https://avatar.iran.liara.run/username?username=${userName}`} roundedCircle />
               </div> */}  
               <div className='text-center mb-3'> 
                <div className="profile-image-container">
        {/* Display the current image or default image if none */}
        <Image
          src={image || `https://avatar.iran.liara.run/username?username=${userEmail}`}
          roundedCircle  loading='lazy'
          className="profile-image"
        />
        {/* Camera Icon Overlay */}
        <label htmlFor="fileInput" className="camera-icon-overlay">
          <Camera size={30} color="white" />
        </label>

        {/* Hidden file input for uploading image */}
        <input
          type="file"
          id="fileInput"
          style={{ display: 'none' }}
          accept="image/*"
          onChange={handleImageChange}
        />
      </div></div>
                

                      
             <Form>
             <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="2">
          Name <span>:</span>
        </Form.Label>
        <Col sm="10">
          <Form.Control type='name' defaultValue={userName} />
        </Col>
      </Form.Group>
      <Form.Group as={Row} className="mb-3">
        <Form.Label column sm="2">
          Email
        </Form.Label>
        <Col sm="10">
          <Form.Control type='email' defaultValue={userEmail} />
        </Col>
      </Form.Group>
    </Form>  
     <div>
     <Row className='mt-3'>
        <Col xs={6}>
          <div>
            <Button
              variant="primary"
              className='clearBtn BtnSize'
              onClick={handleLogout}
            >
               Logout
            </Button>
          </div>
        </Col>
        <Col xs={6}>
          <Button
            variant="secondary"
            className='submitBtn BtnSize'
             onClick={handleReset}
            type='submit'
          >
          Reset 
          </Button>
        </Col>
      </Row>
         {/* <TrendingBtn submitBtnName="Reset Password" clearBtnName="Logout" logout={handleLogout} /> */}
        </div> 
 
             </div>
        
        </Col>
      </Row>
    </Container>
    </div>
  )
}

export default AccountForm

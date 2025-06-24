import React, { useContext, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import { Camera } from "lucide-react";

import { useNavigate } from 'react-router-dom';
import { MenuContext } from "../Context/MenuProvider";

const AccountForm = () => {
  const navigate = useNavigate();

  // Get initial values from sessionStorage
  const { userName, setUserName, userEmail } = useContext(MenuContext);
  const [image, setImage] = useState(null);

  // Function to handle username change dynamically
  const handleUserNameChange = (e) => {
    const newName = e.target.value;
    setUserName(newName);
    sessionStorage.setItem("userName", newName); 
  };

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
      reader.onloadend = () => {
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
              <div className='text-center mb-3'>
                <div className="profile-image-container">
                  <Image
                    src={image || `https://avatar.iran.liara.run/username?username=${userEmail}`}
                    roundedCircle
                    loading='lazy'
                    className="profile-image"
                  />
                  <label htmlFor="fileInput" className="camera-icon-overlay">
                    <Camera size={30} color="white" />
                  </label>
                  <input
                    type="file"
                    id="fileInput"
                    style={{ display: 'none' }}
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <Form>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Name <span>:</span>
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control 
                      type="text"
                      value={userName} 
                      onChange={handleUserNameChange}
                      disabled
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Email
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control type="email" defaultValue={userEmail} disabled />
                  </Col>
                </Form.Group>
              </Form>

              <Row className='mt-3'>
                <Col xs={6}>
                  <Button
                    variant="primary"
                    className='clearBtn BtnSize'
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Col>
                <Col xs={6}>
                  <Button
                    variant="secondary"
                    className='submitBtn BtnSize'
                    onClick={handleReset}
                  >
                    Reset
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountForm;

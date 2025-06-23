import React, { useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import { Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


import '../../css/Account.css';
import '../../css/Trending.css';

const AccountReset = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async () => {
    try {
      const email = sessionStorage.getItem("userEmail");

      const response = await axios.post('http://localhost:5000/reset-password', {
        email,
        oldPassword,
        newPassword,
      });

      Swal.fire('Success', response.data.message, 'success');
      setOldPassword('');
      setNewPassword('');
    } catch (error) {
      Swal.fire('Error', error.response?.data?.message || 'Something went wrong', 'error');
    }
  };
const handleCancel= ()=>{
  setOldPassword('');
   setNewPassword('');
  navigate('/account')
}
  return (
    <Container fluid>
      <Row>
        <Col sm={12} md={12}>
          <div className='accounts'>
            <Form>
              <Form.Label className='resetTitle'>Reset Password</Form.Label>

              {/* Old Password Field */}
              <Form.Group as={Row} className="mb-3 position-relative">
                <Form.Label column sm="12">Old Password</Form.Label>
                <Col sm="12" className="position-relative">
                  <Form.Control
                    type={showOldPassword ? 'text' : 'password'}
                    placeholder="Enter old password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowOldPassword(!showOldPassword)}
                    style={{
                      position: 'absolute',
                      right: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer'
                    }}
                  >
                    {showOldPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </Col>
              </Form.Group>

              {/* New Password Field */}
              <Form.Group as={Row} className="mb-3 position-relative">
                <Form.Label column sm="12">New Password</Form.Label>
                <Col sm="12" className="position-relative">
                  <Form.Control
                    type={showNewPassword ? 'text' : 'password'}
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                  <span
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    style={{
                      position: 'absolute',
                      right: '15px',
                      top: '50%',
                      transform: 'translateY(-50%)',
                      cursor: 'pointer'
                    }}
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </span>
                </Col>
              </Form.Group>
            </Form>

            {/* Buttons */}
            <Row className='mt-4'>
              <Col xs={6}>
                <Button
                  variant="primary"
                  className='clearBtn BtnSize'
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  variant="secondary"
                  className='submitBtn BtnSize'
                  onClick={handleSubmit}
                >
                  Confirm
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default AccountReset;

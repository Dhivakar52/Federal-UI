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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Get API URL from environment
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5005';

  const handleSubmit = async () => {
    // ✅ Validation
    if (!oldPassword || !newPassword) {
      Swal.fire('Warning', 'Please fill in all fields', 'warning');
      return;
    }

    if (newPassword.length < 6) {
      Swal.fire('Warning', 'New password must be at least 6 characters long', 'warning');
      return;
    }

    if (oldPassword === newPassword) {
      Swal.fire('Warning', 'New password must be different from old password', 'warning');
      return;
    }

    try {
      setLoading(true);
      
      // ✅ Get email from localStorage (not sessionStorage)
      const email = localStorage.getItem("userEmail") || sessionStorage.getItem("userEmail");

      if (!email) {
        Swal.fire('Error', 'User email not found. Please login again.', 'error');
        navigate('/');
        return;
      }

      console.log('📝 Resetting password for:', email);

      const response = await axios.post(`${apiUrl}/reset-password`, {
        email: email,
        oldPassword: oldPassword,
        newPassword: newPassword,
      });

      console.log('✅ Password reset response:', response.data);

      Swal.fire({
        title: 'Success!',
        text: response.data.message || 'Password updated successfully',
        icon: 'success',
        confirmButtonText: 'OK'
      }).then(() => {
        setOldPassword('');
        setNewPassword('');
        navigate('/account');
      });

    } catch (error) {
      console.error('❌ Password reset error:', error);
      
      const errorMessage = error.response?.data?.message || 
                          error.response?.data?.error || 
                          'Something went wrong. Please try again.';
      
      Swal.fire({
        title: 'Error',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOldPassword('');
    setNewPassword('');
    navigate('/account');
  };

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
                    disabled={loading}
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
                    placeholder="Enter new password (min 6 characters)"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    disabled={loading}
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

              {/* Password Requirements */}
              <div className="password-requirements mb-3">
                <small className="text-muted">
                  Password must be at least 6 characters long
                </small>
              </div>
            </Form>

            {/* Buttons */}
            <Row className='mt-4'>
              <Col xs={6}>
                <Button
                  variant="primary"
                  className='clearBtn BtnSize'
                  onClick={handleCancel}
                  disabled={loading}
                >
                  Cancel
                </Button>
              </Col>
              <Col xs={6}>
                <Button
                  variant="secondary"
                  className='submitBtn BtnSize'
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  {loading ? 'Updating...' : 'Confirm'}
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
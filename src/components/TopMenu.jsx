import React, { useState, useEffect, useContext } from "react";
import { useSelector } from 'react-redux';
import { Navbar, Nav, Dropdown, Container, Tooltip, OverlayTrigger, Row, Col, Breadcrumb } from "react-bootstrap";
import { Bell, Settings, User } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import '../css/TopMenu.css';
import { MenuContext } from "./Context/MenuProvider";
import axios from 'axios';

const TopMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;
  const { userName, userEmail } = useSelector((state) => state.auth);

  console.log(userName, "Topmenu");

  const getLabel = () => {
    switch (location.pathname) {
      case '/trends': return 'Trends';
      case '/summary': return 'Summary';
      case '/flashcard': return 'Flash-Card';
      case '/peer': return 'Peer News';
      case '/account': return 'Profile Account';
      case '/account/reset': return 'Reset Password';
      case '/press-pivot': return 'Press-Pivot';
      case '/youtube-script': return 'Tube Scribe';
      case '/tube-script': return 'Tube Scribe';
      case '/seo-guru': return 'SEO Guru';
      case '/editor-mosaic': return 'Editorial Mosaic';
      case '/option-junction': return 'Opinion Junction';
      case '/custom-gpt': return 'Custom GPT';
      case '/custom-gpt/federal-assist': return 'Federal Assistant';
      case '/custom-gpt/federal-editorial': return 'Federal Editorial';
      case '/federal-bot': return 'The Federal Bot';
      case '/admin-dashboard': return 'Admin Panel';
      case '/full-story': return 'Full Story';
      case '/analyst': return 'News Analyst';
      default: return '';
    }
  };

  // ✅ FIXED: Logout with email
  const handleLogout = async () => {
    try {
      // ✅ Get email from localStorage (not loginId)
      const email = localStorage.getItem("userEmail");

      if (!email) {
        console.error('No email found in localStorage');
        // Clear everything and redirect
        localStorage.clear();
        navigate('/');
        return;
      }

      console.log('📤 Logging out user:', email);

      // ✅ Send email to backend (matches backend expectation)
      const response = await axios.post(`${apiUrl}/logout`, { 
        email: email  // ✅ Changed from loginId to email
      });

      if (response.status === 200) {
        const { lastLogout } = response.data;
        console.log('Logout successful:', lastLogout);

        // Store last logout time
        localStorage.setItem("lastLogout", lastLogout);

        // Clear all user data
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userName");
        localStorage.removeItem("token");
        localStorage.removeItem("userRole");
        localStorage.removeItem("lastLogout");

        // Redirect to login
        navigate('/');
      }
    } catch (error) {
      console.error('Logout error:', error.response?.data || error.message);
      
      // Even if API fails, clear local data
      localStorage.clear();
      navigate('/');
    }
  };

  const AccountNavigation = () => {
    navigate('/account');
  };

  return (
    <Navbar bg="light" variant="light" className="shadow-sm mb-4">
      <Container fluid>
        <Row className="w-100 align-items-end">
          <Col xl={3} md={6} xs={9}>
            <Breadcrumb>
              <Breadcrumb.Item className="breadCrumbMain">Dashboard</Breadcrumb.Item>
              <span className="mx-2">&gt;</span>
              <Breadcrumb.Item active className="custom-breadcrumb">{getLabel()}</Breadcrumb.Item>
            </Breadcrumb>
          </Col>
          <Col xl={9} md={6} xs={3}>
            <Navbar.Toggle aria-controls="navbar-nav" />
            <Navbar.Collapse id="navbar-nav" className="justify-content-end">
              <Nav className="align-items-center">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="" id="dropdown-profile" className="d-flex align-items-center border-0">
                    <div className="d-flex align-items-center gap-3 me-2">
                      <Image
                        src={`https://ui-avatars.com/api/?name=${userName || 'User'}&background=0D8ABC&color=fff`}
                        width="40"
                        roundedCircle
                      />
                      <div className="text-start fw-medium">
                        <p className="mb-0 d-none d-md-block">{userEmail || 'user@email.com'}</p>
                        <small className="mb-0 d-none d-md-block">{userName || 'User'}</small>
                      </div>
                    </div>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={AccountNavigation}>
                      <User size={20} className="me-2" />
                      View Profile
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>
                      <Bell size={20} className="me-2" />
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default TopMenu;
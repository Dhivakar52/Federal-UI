import React,{useState,useEffect,useContext} from "react";
import { useSelector } from 'react-redux';
import { Navbar, Nav, Dropdown, Container, Tooltip, OverlayTrigger, Row, Col,Breadcrumb } from "react-bootstrap";
import { Bell, Settings, User } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import '../css/TopMenu.css';
import { MenuContext } from "./Context/MenuProvider";
import axios from 'axios';

const TopMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  //  const { userName, userEmail } = useContext(MenuContext);
   const apiUrl = import.meta.env.VITE_API_URL;
   const { userName, userEmail } = useSelector((state) => state.auth);

console.log(userName, "Topmenu")

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
      case '/seo-guru': return 'SEO Guru';
      case '/editor-mosaic': return 'Editorial Mosaic';
      case '/option-junction': return 'Opinion Junction';
      case '/custom-gpt': return 'Custom GPT';
      case '/custom-gpt/federal-assist': return 'Federal Assistant';
      case '/custom-gpt/federal-editorial': return 'Federal Editorial';
      case '/federal-bot': return 'The Federal Bot';
      default: return '';
    }
  };

  // const handleLogout = () => {
  //   navigate('/');
  //   sessionStorage.clear();
  // };




  const handleLogout = async () => {
    try {
        const loginId = sessionStorage.getItem("userEmail");

        const response = await axios.post(`${apiUrl}/logout`, { loginId });

        if (response.status === 200) {
            const { lastLogout } = response.data;
            console.log(response.data)

            // Store last logout time
            sessionStorage.setItem("lastLogout", lastLogout);

            console.log('Logout successful:', lastLogout);

            // Clear session storage
            sessionStorage.removeItem("userEmail");
            sessionStorage.removeItem("userName");

            navigate('/'); // Redirect to login
        }
    } catch (error) {
        console.error('Logout error:', error.response?.data || error.message);
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
  <Breadcrumb className="topTitle">
    <Breadcrumb.Item className="breadCrumbMain">Dashboard</Breadcrumb.Item>
     <span className="mx-2">&gt;</span>
    <Breadcrumb.Item active className="custom-breadcrumb "> {getLabel()}</Breadcrumb.Item>
  </Breadcrumb>
</Col>
             <Col xl={9} md={6} xs={3}>
             <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-notifications">Notifications</Tooltip>}>
              <Nav.Link href="#notifications" className="d-flex align-items-center">
                <Bell size={20} className="me-2 d-none d-lg-block" />
              </Nav.Link>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-settings">Settings</Tooltip>}>
              <Nav.Link href="#settings" className="d-flex align-items-center">
                <Settings size={20} className="me-2 d-none d-lg-block" />
              </Nav.Link>
            </OverlayTrigger>

            {/* Profile Dropdown with Letter Avatar */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="" id="dropdown-profile" className="d-flex align-items-center border-0">
                <div className="d-flex align-items-center gap-3 me-2">
                  {/* <span className="avatar-text">{initial}</span> */}
                  <Image src={`https://avatar.iran.liara.run/username?username=${userName}`} width="40" roundedCircle />
                  <div className=" text-start fw-medium userAcc">
                  <p className="mb-0 d-none d-md-block">{userEmail}</p>
                  <small className="mb-0 d-none d-md-block">{userName}</small>
                  </div>
                 
                </div>
                <div>

                </div>
                {/* <span className="d-none d-md-inline">Profile</span> */}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#profile" onClick={AccountNavigation}>
                  <User size={20} className="me-2" />
                  View Profile
                </Dropdown.Item>
                {/* <Dropdown.Item href="#settings" >
                  <Settings size={20} className="me-2" />
                  Account Settings
                </Dropdown.Item> */}
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

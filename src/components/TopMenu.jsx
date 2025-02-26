import React,{useState,useEffect} from "react";
import { Navbar, Nav, Dropdown, Container, Tooltip, OverlayTrigger } from "react-bootstrap";
import { Bell, Settings, User } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';
import Image from 'react-bootstrap/Image';
import '../css/TopMenu.css';

const TopMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  

  const [initial, setInitial] = useState("");


  const userEmail = sessionStorage.getItem("userEmail");
  const userName= sessionStorage.getItem("userName");

  useEffect(() => {
    const userEmail = sessionStorage.getItem("userEmail");
    if (userEmail) {
      setInitial(userEmail.charAt(0).toUpperCase());
    }
  }, []);




  const getLabel = () => {
    switch (location.pathname) {
      case '/trends': return 'Trends';
      case '/summary': return 'Summary';
      case '/flashcard': return 'Flash-Card';
      case '/peer': return 'Peer News';
      case '/account': return 'Profie Account';
      case '/account/reset': return 'Reset Password';
      case '/press-pivot': return 'Press-Pivot';
      case '/youtube-script': return 'Tube Scribe';
      case '/seo-guru': return 'SEO Guru';
      case '/editor-mosaic': return 'Editorial Mosaic';
      case '/option-junction': return 'Opinion Junction';
      case '/custom-gpt': return 'Custom GPT';
      case '/federal-bot': return 'The Federal Bot';
      default: return '';
    }
  };

  const handleLogout = () => {
    navigate('/');
    sessionStorage.clear();
  };

  const AccountNavigation = () => {
    navigate('/account');
  };
  return (
    <Navbar bg="light" variant="light" className="shadow-sm mb-4">
      <Container fluid>
        <Navbar.Brand className="fw-normal">
          Dashboard / <span className="sideLabel">{getLabel()}</span>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav className="align-items-center">
            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-notifications">Notifications</Tooltip>}>
              <Nav.Link href="#notifications" className="d-flex align-items-center">
                <Bell size={20} className="me-2" />
              </Nav.Link>
            </OverlayTrigger>

            <OverlayTrigger placement="bottom" overlay={<Tooltip id="tooltip-settings">Settings</Tooltip>}>
              <Nav.Link href="#settings" className="d-flex align-items-center">
                <Settings size={20} className="me-2" />
              </Nav.Link>
            </OverlayTrigger>

            {/* Profile Dropdown with Letter Avatar */}
            <Dropdown align="end">
              <Dropdown.Toggle variant="" id="dropdown-profile" className="d-flex align-items-center border-0">
                <div className="d-flex align-items-center gap-3 me-2">
                  {/* <span className="avatar-text">{initial}</span> */}
                  <Image src={`https://avatar.iran.liara.run/username?username=${userEmail}`} width="40" roundedCircle />
                  <div className="mt-3 text-start fw-medium">
                  <p className="mb-0">{userEmail}</p>
                  <p>{userName}</p>
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
                <Dropdown.Item href="#settings" >
                  <Settings size={20} className="me-2" />
                  Account Settings
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
      </Container>
    </Navbar>
  );
};

export default TopMenu;

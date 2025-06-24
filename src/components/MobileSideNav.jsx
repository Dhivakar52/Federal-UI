import { useState, useContext } from "react";
import { Navbar, Container, Offcanvas, Nav, Button, Row, Col } from "react-bootstrap";
import { Menu, ChevronDown, ChevronRight } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/images/logo_federal_white.png";
import "../css/Mobile.css";
import { MenuContext } from "./Context/MenuProvider";

function MobileSideNav() {
  const [show, setShow] = useState(false);
  const { menuItems: menuSideBar } = useContext(MenuContext);
  const [openSubMenu, setOpenSubMenu] = useState(null);
  const location = useLocation();

  return (
    <>
      {/* Mobile Navbar */}
      <Navbar expand="lg" className="bg-body-dark text-light mobieNavBg d-block d-lg-none">
        <Container>
            <Row>
                <Col xs={10}>
                <Navbar.Brand href="/">
            <img src={logo} alt="Federal Logo" className="mobile_logo" />
          </Navbar.Brand>
                </Col>
                <Col xs={2}>
                <Button className="border-0 bg-transparent text-light" variant="outline-light" onClick={() => setShow(true)}>
            <Menu size={24} />
          </Button>
                </Col>
            </Row>
        
          
        </Container>
      </Navbar>

      {/* Offcanvas Sidebar */}
      <Offcanvas className="canvasBg" show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
          <img src={logo} alt="Federal Logo" className="mobile_menu_logo" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            {menuSideBar.map((item, index) => {
              const isActive = location.pathname === item.path;
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isSubmenuOpen = openSubMenu === index;

              return (
                <div key={index}>
                  {/* Main Menu Item */}
                  <NavLink
                    to={item.path}
                    onClick={() => {
                      if (hasSubmenu) {
                        setOpenSubMenu(isSubmenuOpen ? null : index);
                      } else {
                        setShow(false); // Close sidebar on click
                      }
                    }}
                    className="sideMenuList"
                    style={{
                      backgroundColor: isActive ? "#fff" : "transparent",
                      color: isActive ? "black" : "white",
                      padding: "12px 20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      textDecoration: "none",
                      borderRadius:  isActive ? "0px" : "0px",
                      borderBottom: '1px solid #ffff',
                    }}
                  >
                          <span> <span className="me-3">
                          {item.icon}
                            </span>
                            {item.label}</span>
                    {hasSubmenu && (isSubmenuOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />)}
                  </NavLink>

                  {/* Submenu Items */}
                  {hasSubmenu && isSubmenuOpen && (
                    <div className="submenu-container" style={{ marginLeft: "20px",backgroundColor:"#ffff" }}>
                      {item.submenu.map((sub, subIndex) => (
                        <NavLink
                          key={subIndex}
                          to={sub.path}
                          className="submenu-item"
                          style={{
                            display: "block",
                            padding: "8px 12px",
                            color: location.pathname === sub.path ? "#ffff" : "black",
                            backgroundColor: location.pathname === sub.path ? "#fff" : "transparent",
                            textDecoration: "none",
                            borderRadius: "0px",
                          
                          }}
                          onClick={() => setShow(false)} 
                        >
                          {sub.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default MobileSideNav;

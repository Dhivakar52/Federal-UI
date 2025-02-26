import React, { useContext, useState } from "react";
import { Button, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom"; 
import { Menu, X } from "lucide-react";
import logo from '../assets/images/logo_federal_white.png';
import '../css/SideNavBar.css';
import { MenuContext } from "./Context/MenuProvider";

const SideNavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { menuItems: menuSideBar } = useContext(MenuContext);
  const location = useLocation(); // Get current path

  return (
    <>
      <div
        className="text-dark vh-100 sideNavBg"
        style={{
          position: "fixed",
          top: "0",
          left: "0",
          width: isSidebarOpen ? "145px" : "80px",
          height: "100vh",
          transition: "all 0.3s ease",
          boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px',
        }}
      >
        <div className="sideNavInnerColor">
          {/* Sidebar Header */}
          <div
            className="d-flex align-items-center"
            style={{
              padding: "0px 1px 1px 7px",
              height: "70px",
              borderBottom: "1px solid #ddd",
              marginBottom: "20px",
            }}
          >
            <div
              style={{
                width: isSidebarOpen ? "145px" : "0",
                transition: "width 0.3s ease",
                overflow: "hidden",
              }}
            >
              <img
                src={logo}
                alt="Federal_Logo"
                className="img-fluid"
                style={{
                  maxHeight: "40px",
                  opacity: isSidebarOpen ? 1 : 0,
                  transition: "opacity 0.3s ease",
                  width: '100%',
                  height: '40%',
                }}
              />
            </div>
            <Button
              variant=""
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-circle"
              style={{
                border: "none",
                minWidth: "40px",
                height: "40px",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginLeft: "auto",
                color: "white"
              }}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Menu Items */}
          <Nav className="flex-column sideMenu">
            {menuSideBar.map((item, index) => {
              const isActive = location.pathname === item.path; // Check active state
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  className="sideMenuList"
                  style={{
                    textDecoration: "none",
                    whiteSpace: "nowrap",
                    backgroundColor: isActive ? "#fff" : "transparent",
                    transition: "all 0.3s ease",
                    width: '100%',
                    height: '65px',
                    display: 'inline-block',
                    justifyContent: 'end',
                    borderRadius: '50px 0px 0px 50px',
                    color: isActive ? "black" : "white",
                    marginLeft: '10px',
                    padding: isSidebarOpen ? '12px 20px' : "23px",
                  }}
                >
                  <div
                    className="d-flex align-items-center"
                    style={{ justifyContent: 'center' }}
                  >
                    {/* Change icon dynamically */}
                    {isActive ? item.activeIcon : item.icon}
                  </div>
                  <div
                    style={{
                      marginLeft: "12px",
                      opacity: isSidebarOpen ? 1 : 0,
                      transition: "opacity 0.2s ease",
                      overflow: "hidden",
                      textAlign: 'center',
                      textWrap: 'auto'
                    }}
                  >
                    {item.label}
                  </div>
                </NavLink>
              );
            })}
          </Nav>
        </div>
      </div>

      {/* Side Content (scrollable) */}
      <div
        style={{
          marginLeft: isSidebarOpen ? "145px" : "80px",
          padding: "0px",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Your content goes here */}
      </div>
    </>
  );
};

export default SideNavBar;

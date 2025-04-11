import React, { useContext, useState } from "react";
import { Button, Nav, Offcanvas } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom"; 
import { Menu, X,ChevronDown, ChevronRight } from "lucide-react";
import logo from '../assets/images/logo_federal_white.png';
import '../css/SideNavBar.css';
import { MenuContext } from "./Context/MenuProvider";


const SideNavBar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { menuItems: menuSideBar } = useContext(MenuContext);
  const location = useLocation(); 
  const [openSubMenu, setOpenSubMenu] = useState(null);

  return (
    <>


      

      <div
        className="text-dark vh-100 sideNavBg d-lg-block d-none"
        style={{
          width: isSidebarOpen ? "250px" : "80px",

        }}
      >
        <div className="sideNavInnerColor">
          {/* Sidebar Header */}
          <div
            className="d-flex align-items-center sideFlex"
          >
            <div className="logoImg"
              style={{
                width: isSidebarOpen ? "250px" : "0",
              }}
            >
              <img
                src={logo}
                alt="Federal_Logo"
                className="img-fluid"
                style={{
                  opacity: isSidebarOpen ? 1 : 0,
                }}
              />
            </div>
            <Button
              variant=""
              size="sm"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="rounded-circle  logoXbutton"
              style={{
              }}
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </Button>
          </div>

          {/* Menu Items */}
          <Nav className="flex-column sideMenu">
            {menuSideBar.map((item, index) => {
              const isActive = location.pathname === item.path;
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const isSubmenuOpen = openSubMenu === index;
              return (
                <NavLink
                  key={index}
                  to={item.path}
                  
                  onClick={(e) => {
                    if (hasSubmenu) {
                     
                      setOpenSubMenu(isSubmenuOpen ? null : index); 
                    }
                  }}
                
                >

                  <div className="sideMenuList"  style={{
                    backgroundColor: isActive ? "#fff" : "transparent",
                    transition: isSidebarOpen ? "transform 0.3s ease": "transform 0.3s ease-in-out",
                    color: isActive ? "black" : "white",
                    padding: isSidebarOpen ? '12px 20px' : "10px 20px",
                  }}>


                  <div
                    className="d-flex align-items-center"
                    style={{ justifyContent: 'center' }}
                  >
                    {/* Change icon dynamically */}
                    {isActive ? item.activeIcon : item.icon}
                  </div>
                  <div   className="itemLabel"
                    style={{
                      display: isSidebarOpen ? 'block':'none',       
                    }}
                  >
                    {item.label}
                  </div>


                  {hasSubmenu && (
                      <div style={{ color: isActive? "black": 'white', width:'40%', textAlign:'end' }}>
                        {isSubmenuOpen ? <ChevronDown size={16}  /> : <ChevronRight size={16} />}
                      </div>
                    )}
 
                  </div>
                 


     {/* Submenu Items */}
     {hasSubmenu && (
  <div 
    className="submenu-container"
    style={{ position: "relative" }}
    onMouseEnter={() => setOpenSubMenu(index)}
  onMouseLeave={() => setTimeout(() => setOpenSubMenu(null), 1000)}
   
  >
   
    {isSubmenuOpen && (
      <div
      onClick={(e)=>e.preventDefault()}
        className="submenu"
        style={{
          left: isSidebarOpen ? "105%" : "80px",

        }}
      >
        {item.submenu.map((sub, subIndex) => (
          <NavLink
            key={subIndex}
            // onClick={(e)=> e.preventDefault()}
            to={sub.path}
            className="submenu-item"
            style={{
              display: "block",
              padding: "8px 12px",
              color: location.pathname === sub.path ? "black" : "white",
              backgroundColor: location.pathname === sub.path ? "#fff" : "transparent",
              textDecoration: "none",
              borderRadius: "5px",
            }}
          >
            {sub.label}
          </NavLink>
        ))}
      </div>
    )}
  </div>
)}

      



















                </NavLink>
              );
            })}
          </Nav>
        </div>
      </div>









      {/* Side Content (scrollable) */}
      <div className="sideContent d-lg-block d-none"
        style={{
          marginLeft: isSidebarOpen ? "250px" : "80px",
        }}
      >
        {/* Your content goes here */}
      </div>
    </>
  );
};

export default SideNavBar;

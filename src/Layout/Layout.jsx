import React from 'react';
import SideNavBar from '../components/SideNavBar';
import TopMenu from '../components/TopMenu';
import Footer from '../components/Footer';



const Layout = ({ children }) => {
 console.log(children)
  

    return (
        <div className="d-flex">
            {/* Sidebar */}
            <SideNavBar/>
            
            {/* Main Content */}
            <div className="flex-grow-1 p-4 vh-100">
                <TopMenu />
                <div>
                    {children}
                </div>
                <div>
                   {/* <Footer/> */}
                </div>
            </div>
        </div>
    );
};

export default Layout;

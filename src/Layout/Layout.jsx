import React from 'react';
import SideNavBar from '../components/SideNavBar';
import TopMenu from '../components/TopMenu';
import Footer from '../components/Footer';
import MobileSideNav from '../components/MobileSideNav';
import '../css/Layout.css'



const Layout = ({ children }) => { 

    return (

        <>
       <MobileSideNav/>
        <div className="flexTop">
            {/* Sidebar */}
            <SideNavBar/>
            
            {/* Main Content */}
            <div className="flex-grow-1 p-3 p-md-4 vh-100">
                <TopMenu />
                <div>
                    {children}
                </div>
                <div>
                   {/* <Footer/> */}
                </div>
            </div>
        </div>
        </>
    );
};

export default Layout;

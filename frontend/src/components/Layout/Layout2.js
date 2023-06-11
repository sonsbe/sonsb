import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar2 from '../common/Navbar2';
import Footer from '../common/Footer'
const Layout2 = () => {
  return (
    
    <div >
      
      <Navbar2 />
      <main> 
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout2;
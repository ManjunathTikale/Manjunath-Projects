import React from 'react'
import { Outlet } from 'react-router-dom';

import Navbar from './Navbar'
import Footer from './Footer';
import { Box } from '@mui/material';
import backgroundImg from '../assets/images/Government-Schemes-in-India.png'


const Layout = () => {
  
  return (
    <Box   sx={{
      backgroundImage: `url(${backgroundImg})`,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
    }}
  >
        <Navbar />
        <Box 
            sx={{ 
              minHeight: "100vh",
              paddingTop: "100px",
            }}
        >
            <Outlet/>
        </Box>
        <Footer />
    </Box>
                
  )
}

export default Layout
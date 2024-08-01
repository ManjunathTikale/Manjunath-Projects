// APPBAR COPIED FROM MUI DOCUMENTATION

import { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const drawerWidth = 240;

function DrawerAppBar({ window }) {
    const navigate = useNavigate()
    const location = useLocation()

  // const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const { user, logout } = useContext(AuthContext)

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar component="nav" position="fixed" sx={{ backgroundColor: '#FFCC01' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            Mobile Menu
          </IconButton>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }, color: '#000' }}
          >
            Goverment Scheme Portal
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button sx={{ color: '#000' }}  onClick={() => navigate("/")}>
                Home
              </Button>
              {user
                ? 
                  <>
                   <Button sx={{ color: '#000' }}  onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </Button>
                    <Button 
                      sx={{ 
                        backgroundColor: '#fff',
                        color: '#000',
                        '&:hover': {
                          backgroundColor: '#fff',
                          color: "#000"
                        }
                      }}
                      size="small"
                      onClick={logout}
                    >
                      {user?.firstName} {user?.lastName} Logout
                    </Button>   

                  </>
                :  location.pathname === "/register"
                    ?
                      <Button sx={{ color: '#000' }}  onClick={() => navigate("/login")}>
                        Login
                      </Button>
                    :
                      <Button sx={{ color: '#000' }}  onClick={() => navigate("/register")}>
                        Register
                      </Button>
                  
                }
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  );
}

DrawerAppBar.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default DrawerAppBar;
// NavBar.js
import React from 'react';
import 'typeface-bebas-neue';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Box } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

// Import the SVG image
import TurboIcon from '../Image/turbo.svg';

const NavBar = ({ handleSignOut }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static" sx={{
        background: '#C0C0C0',
        boxShadow: '0 3px 5px 2px rgba(192, 192, 192, 0.5)',
      }}>
        <Toolbar sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '10px',
        }}>
          <div>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenuClick} sx={{
              backgroundColor: '#D3D3D3',
              borderRadius: '5px',
            }}>
              <MenuIcon />
            </IconButton>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img src={TurboIcon} alt="Icon" style={{ width: 30, height: 30, marginBottom: 4 }} />
            <Typography variant="h6" component="div" sx={{
              fontFamily: 'Bebas Neue, cursive',
              fontSize: 28,
              textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
              color: '#696969',
            }}>
              Turbo SpyLink
            </Typography>
          </Box>
          <div>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose}>
                Home
              </MenuItem>
              <MenuItem component={Link} to="/library" onClick={handleMenuClose}>
                Library
              </MenuItem>
              {/* Add the new MenuItem for "Ip Info" */}
              <MenuItem component={Link} to="/ip-info" onClick={handleMenuClose}>
                Ip Info
              </MenuItem>
              <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;

// NavBar.jsx
import React, { useState } from 'react';
import 'typeface-bebas-neue';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

import TurboIcon from '../Image/turbo.svg';

const NavBar = ({ handleSignOut, isLoggedIn }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
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
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleDrawerOpen} sx={{
              backgroundColor: '#D3D3D3',
              borderRadius: '5px',
            }}>
              <MenuIcon />
            </IconButton>
            <Drawer
              anchor="left"
              open={drawerOpen}
              onClose={handleDrawerClose}
              sx={{
                '& .MuiDrawer-paper': {
                  width: '200px',
                  background: '#C0C0C0',
                },
              }}
            >
              <List>
              <ListItem button component={Link} to="/" onClick={handleDrawerClose} sx={{ padding: '10px', transition: '0.3s' }}>
                  <ListItemText primary="Home" />
                </ListItem>
                <ListItem button component={Link} to="/library" onClick={handleDrawerClose} sx={{ padding: '10px', transition: '0.3s' }}>
                  <ListItemText primary="Library" />
                </ListItem>
                <ListItem button component={Link} to="/ip-info" onClick={handleDrawerClose} sx={{ padding: '10px', transition: '0.3s' }}>
                  <ListItemText primary="Ip Info" />
                </ListItem>
                {isLoggedIn ? (
                  <ListItem button onClick={handleSignOut} sx={{ padding: '10px', transition: '0.3s' }}>
                    <ListItemText primary="Sign Out" />
                  </ListItem>
                ) : (
                  <ListItem button component={Link} to="/login" onClick={handleDrawerClose} sx={{ padding: '10px', transition: '0.3s' }}>
                    <ListItemText primary="Login" />
                  </ListItem>
                )}
              </List>
            </Drawer>
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
          <div></div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default NavBar;

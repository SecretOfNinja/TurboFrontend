// NavBar.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton } from '@mui/material';
import { Link } from 'react-router-dom'; // If using React Router

const NavBar = ({ handleSignOut }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          {/* You can add a menu icon here if needed */}
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Your App Name
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/library">
          Library
        </Button>
        <Button color="inherit" onClick={handleSignOut}>
          Sign Out
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;

import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import { Link, useNavigate } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { login } from './api'; // Import the login service function
import './Login.css';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      // Make the login API call
      const userData = { email, password };
      await login(userData);
      onLogin();
      navigate('/');
      console.log('User logged in successfully');
    } catch (error) {
      console.error('Login error:', error.message);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper elevation={3} className="login-container">
        <Box display="flex" flexDirection="column" alignItems="center" p={3}>
          <Typography variant="h5" gutterBottom></Typography>
          <Box mt={3} mb={2}>
            <Typography component="h2" variant="h6">
              Login
            </Typography>
          </Box>
          <form>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ marginBottom: '20px' }}
            />
            <Box mt={2} style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                className='btnx'
                variant="contained"
                color="primary"
                onClick={handleLogin}
                sx={{
                  background: 'linear-gradient(to bottom,  #626262, #040404)',
                  borderRadius: '1px',
                  padding: '7px 30px', // Adjusted padding for a smaller width
                  transition: 'background 0.3s ease',
                  '&:hover': {
                    background: 'linear-gradient(to bottom, #0a0a0a, #b9b1b1)',
                  },
                  '&:active': {
                    background: 'linear-gradient(to bottom, #626262, #040404)',
                  },
                }}
              >
                Log In
              </Button>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default Login;

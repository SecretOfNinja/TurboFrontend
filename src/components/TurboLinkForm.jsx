// TurboLinkForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  TextField,
  Button,
  Link as MUILink,
  Collapse,
} from '@mui/material';
import { StyledContainer, StyledBox, StyledGeneratedLinkBox, StyledDetailsBox } from './styles';
import 'typeface-bebas-neue'; // Import Bebas Neue font


function Turbo() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [details, setDetails] = useState(null);
  const [expandedShortCode, setExpandedShortCode] = useState(null);

  const handleMoreInfo = async (shortCode) => {
    if (shortCode === expandedShortCode) {
      setExpandedShortCode(null);
    } else {
      setExpandedShortCode(shortCode);
      await fetchDetails(shortCode);
    }
  };

  const generateLink = async () => {
    try {
      const response = await axios.post(
        'https://turbobackend.onrender.com/api/v1/turbo/generateLink',
        { originalUrl }
      );

      setGeneratedLink(response.data.link);
      setDetails(null);
    } catch (error) {
      console.error('Error generating link:', error);
    }
  };

  const goToOriginalLink = async () => {
    try {
      const isAbsoluteUrl = /^https?:\/\//i.test(generatedLink);

      const shortCode = isAbsoluteUrl
        ? new URL(generatedLink).pathname.split('/').pop()
        : generatedLink.split('/').pop();

      if (!shortCode) {
        console.error('Short code is undefined');
        return;
      }

      const fullUrl = isAbsoluteUrl ? generatedLink : `http://${generatedLink}`;

      const newWindow = window.open('', '_blank');

      if (newWindow) {
        newWindow.location.href = fullUrl;
        fetchDetails(shortCode);
      } else {
        window.location.href = fullUrl;
      }
    } catch (error) {
      console.error('Error opening link:', error);
    }
  };

  const fetchDetails = async (shortCode) => {
    try {
      const codeWithoutPrefix = shortCode.replace('bit.ly/', '');
      const response = await axios.get(
        `https://turbobackend.onrender.com/api/v1/turbo/${codeWithoutPrefix}`
      );
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (generatedLink) {
        const isAbsoluteUrl = /^https?:\/\//i.test(generatedLink);
        const shortCode = isAbsoluteUrl
          ? new URL(generatedLink).pathname.split('/').pop()
          : generatedLink.split('/').pop();

        if (shortCode) {
          fetchDetails(shortCode);
        }
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [generatedLink]);

  return (
    <StyledContainer sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'flex-start', // Adjust the vertical alignment
      height: '55vh', // Adjust the height as needed
      marginTop: '90px', // Adjust the margin from the top/header
    }}>
      <Typography variant="h4" gutterBottom sx={{
        fontFamily: 'Bebas Neue, cursive',
        fontSize: '3rem', // Adjust the font size as needed
        textAlign: 'center',
        marginBottom: '20px', // Adjust the margin as needed
      }}>
        Link Generator
      </Typography>
      <StyledBox>
        <TextField
          sx={{
            width: '50%',
            borderRadius: '10px',
            border: '2px solid #000', // Set the border color to black
          }}
          id="originalUrl"
          label="Original URL"
          variant="outlined"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
      </StyledBox>
      <Button
        variant="contained"
        sx={{
          color: 'white',
          background: 'linear-gradient(45deg, #000 30%, #444 90%)', // Set the linear gradient
          borderRadius: 3,
          border: 0,
          height: 48,
          marginTop: '20px', // Adjust the margin from the top
          boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        }}
        onClick={generateLink}
      >
        Generate Link
      </Button>
      {generatedLink && (
        <StyledGeneratedLinkBox sx={{
          background: 'linear-gradient(45deg, #000 30%, #444 90%)', // Set the same gradient as the button
          borderRadius: '5px',
          padding: '10px',
          marginTop: '20px', // Adjust the margin from the top
          width: '50%', // Adjust the width as needed
        }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
            Generated Link
          </Typography>
          <MUILink href="#" onClick={goToOriginalLink} sx={{ color: 'white' }}>
            {generatedLink}
          </MUILink>
        </StyledGeneratedLinkBox>
      )}
      {details && (
        <StyledDetailsBox sx={{
          background: 'linear-gradient(45deg, #000 30%, #444 90%)',
          borderRadius: '15px',
          padding: '10px',
          marginTop: '20px',
          width: '20%',
          textAlign: 'left',
          margin: 'auto', // Center the StyledDetailsBox
        }}>
          <Typography variant="h5" gutterBottom sx={{ color: 'white' }}>
            Details
          </Typography>
          <Typography sx={{ color: 'white' }}>Engagements: {details.engagements}</Typography>
          <Typography sx={{ color: 'white' }}>Earnings: ${details.earnings.toFixed(2)}</Typography>
          <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
            Countries:
          </Typography>
          <ul>
            {details.location.metrics.map((country) => (
              <li key={country.value}>
                <span style={{ color: 'white' }}>
                  {country.country} - Engagements: {country.engagements}
                </span>
              </li>
            ))}
          </ul>
        </StyledDetailsBox>
      )}
    </StyledContainer>
  );
}

export default Turbo;

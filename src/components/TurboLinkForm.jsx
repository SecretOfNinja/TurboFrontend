// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  TextField,
  Button,
  Link as MUILink,
  Collapse,
} from '@mui/material';
import { StyledContainer, StyledBox, StyledGeneratedLinkBox, StyledDetailsBox } from './styles';



// Import necessary modules

// ... existing imports ...

function App() {
  const [originalUrl, setOriginalUrl] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');
  const [details, setDetails] = useState(null);
  const [allDetails, setAllDetails] = useState([]);
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
      // Remove 'bit.ly/' from the short code
      const codeWithoutPrefix = shortCode.replace('bit.ly/', '');
      const response = await axios.get(
        `https://turbobackend.onrender.com/api/v1/turbo/${codeWithoutPrefix}`
      );
      setDetails(response.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  const fetchAllDetails = async () => {
    try {
      const response = await axios.get(
        'https://turbobackend.onrender.com/api/v1/turbo/getAllDetails'
      );
      setAllDetails(response.data);
    } catch (error) {
      console.error('Error fetching all details:', error);
    }
  };
  
  const handleFetchAllDetails = async () => {
    await fetchAllDetails();
    // Now allDetails has been updated, you can use it.
  };
  

  // Use useEffect to fetch details periodically
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
    }, 1000); // Fetch details every 1000 milliseconds (1 second)

    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, [generatedLink]);

  return (
    <StyledContainer>
      <Typography variant="h2" gutterBottom>
        Turbo Link Generator
      </Typography>
      <StyledBox>
        <TextField
          fullWidth
          id="originalUrl"
          label="Original URL"
          variant="outlined"
          value={originalUrl}
          onChange={(e) => setOriginalUrl(e.target.value)}
        />
      </StyledBox>
      <Button variant="contained" color="primary" onClick={generateLink}>
        Generate Link
      </Button>
      {generatedLink && (
        <StyledGeneratedLinkBox>
          <Typography variant="h5" gutterBottom>
            Generated Link
          </Typography>
          <MUILink href="#" onClick={goToOriginalLink}>
            {generatedLink}
          </MUILink>
        </StyledGeneratedLinkBox>
      )}
      <Button variant="contained" color="secondary" onClick={handleFetchAllDetails}>
        Fetch All Details
      </Button>
      {allDetails.length > 0 && (
        <div>
          <Typography variant="h5" gutterBottom>
            All Details
          </Typography>
          <ul>
            {allDetails.map((detail, index) => (
              <li key={`detail-${index}`}>
                <Typography>
                  Short Code: {detail.link}
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleMoreInfo(detail.link)}
                  >
                    More Info
                  </Button>
                </Typography>
                <Collapse in={expandedShortCode === detail.link}>
                  <div>
                    <Typography>Original URL: {detail.originalUrl}</Typography>
                    <Typography>Engagements: {detail.engagements}</Typography>
                    <Typography>Earnings: ${detail.earnings.toFixed(2)}</Typography>
                    <Typography>Created At: {detail.createdAt}</Typography>
                    <Typography variant="h6" gutterBottom>
                      Countries:
                    </Typography>
                    <ul>
                      {detail.location.metrics.map((country, countryIndex) => (
                        <li key={`${country.value}-${index}-${countryIndex}`}>
                          {country.country} - Engagements: {country.engagements}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Collapse>
              </li>
            ))}
          </ul>
        </div>
      )}
      {details && (
        <StyledDetailsBox>
          <Typography variant="h5" gutterBottom>
            Details
          </Typography>
          <Typography>Engagements: {details.engagements}</Typography>
          <Typography>Earnings: ${details.earnings.toFixed(2)}</Typography>
          <Typography variant="h6" gutterBottom>
            Countries:
          </Typography>
          <ul>
            {details.location.metrics.map((country) => (
              <li key={country.value}>
                {country.country} - Engagements: {country.engagements}
              </li>
            ))}
          </ul>
        </StyledDetailsBox>
      )}
    </StyledContainer>
  );
}

export default App;

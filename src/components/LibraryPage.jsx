// LibraryPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  Collapse,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

const LibraryPage = () => {
  const [allDetails, setAllDetails] = useState([]);
  const [expandedShortCode, setExpandedShortCode] = useState(null);

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

  useEffect(() => {
    fetchAllDetails();
    // Now allDetails has been updated, you can use it.
  }, []);

  const handleMoreInfo = async (shortCode) => {
    if (shortCode === expandedShortCode) {
      setExpandedShortCode(null);
    } else {
      setExpandedShortCode(shortCode);
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Library
      </Typography>
      {allDetails.length > 0 && (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Short Code</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allDetails.map((detail, index) => (
                <TableRow key={`detail-${index}`}>
                  <TableCell>{detail.link}</TableCell>
                  <TableCell>
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleMoreInfo(detail.link)}
                    >
                      More Info
                    </Button>
                  </TableCell>
                  <Collapse in={expandedShortCode === detail.link} timeout="auto" unmountOnExit>
                    <TableCell colSpan={2}>
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
                    </TableCell>
                  </Collapse>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </div>
  );
};

export default LibraryPage;

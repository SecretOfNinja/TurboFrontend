import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { IconButton, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { Refresh, NavigateBefore, NavigateNext } from '@mui/icons-material';
import Slider from 'react-slick';
import styled from 'styled-components';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Styled component 
const StyledDetailsBox = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 30px; /* Increased margin to prevent white background issue */
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  & > ul {
    list-style: none;
    padding: 0;
  }

  & > ul > li {
    margin-bottom: 8px;
  }
`;

function Library() {
  const [allDetails, setAllDetails] = useState([]);
  const [expandedShortCode, setExpandedShortCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderRef = useRef(null);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [deletingShortcut, setDeletingShortcut] = useState(null);

  const handleMoreInfo = async (shortCode) => {
    if (shortCode === expandedShortCode) {
      setExpandedShortCode(null);
      setSelectedDetail(null);
    } else {
      setExpandedShortCode(shortCode);
      await fetchDetails(shortCode);
      setOpenDetailsModal(true);
    }
  };

  const handleDetailsModalClose = () => {
    setOpenDetailsModal(false);
  };
  const handleDeleteClick = (shortCode) => {
    setDeletingShortcut(shortCode);
    setDeleteConfirmationOpen(true);
  };

  const handleDeleteConfirmation = async (confirmed) => {
    setDeleteConfirmationOpen(false);

    if (confirmed && deletingShortcut) {
      try {
        // Extract the unique identifier without the 'bit.ly/' prefix
        const uniqueIdentifier = deletingShortcut.replace('bit.ly/', '');

        await axios.delete(
          `https://turbobackend.onrender.com/api/v1/turbo/${uniqueIdentifier}`
        );
        await fetchAllDetails();
      } catch (error) {
        console.error('Error deleting shortcut:', error);
      } finally {
        setDeletingShortcut(null);
      }
    }
  };

  const fetchAllDetails = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        'https://turbobackend.onrender.com/api/v1/turbo/getAllDetails'
      );
      setAllDetails(response.data);
    } catch (error) {
      console.error('Error fetching all details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAllDetails = async () => {
    await fetchAllDetails();
  };

  const fetchDetails = async (shortCode) => {
    try {
      const codeWithoutPrefix = shortCode.replace('bit.ly/', '');
      const response = await axios.get(
        `https://turbobackend.onrender.com/api/v1/turbo/${codeWithoutPrefix}`
      );
      setSelectedDetail(response.data);
    } catch (error) {
      console.error('Error fetching details:', error);
    }
  };

  useEffect(() => {
    // Fetch data initially
    fetchAllDetails();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // Set arrows to false to hide navigation arrows
  };

  const handleNext = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };

  const handlePrev = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  return (
    <div style={{ margin: '20px', padding: '20px' }}> {/* Increased margin and padding to prevent scroller */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <Typography variant="h5">
          All Details
          <IconButton
            color="secondary"
            onClick={handleFetchAllDetails}
            disabled={loading}
            style={{ marginLeft: '10px' }}
          >
            {loading ? <CircularProgress size={15} /> : <Refresh />}
          </IconButton>
        </Typography>
      </div>
      {allDetails.length > 0 && (
        <div>
          <Slider ref={sliderRef} {...settings}>
            {Array.from({ length: Math.ceil(allDetails.length / 3) }).map((_, rowIndex) => (
              <div key={`row-${rowIndex}`}>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                  {Array.from({ length: 3 }).map((_, colIndex) => {
                    const dataIndex = rowIndex * 3 + colIndex;
                    const detail = allDetails[dataIndex];
                    return (
                      detail && (
                        <Typography key={`detail-${dataIndex}`}>
                          Short Code: {detail.link}
                          <Button
                            variant="outlined"
                            color="primary"
                            onClick={() => handleMoreInfo(detail.link)}
                          >
                            More Info
                          </Button>
                          <Button
                            variant="outlined"
                            color="secondary"
                            onClick={() => handleDeleteClick(detail.link)}
                          >
                            Delete
                          </Button>
                        </Typography>
                      )
                    );
                  })}
                </div>
              </div>
            ))}
          </Slider>

          <Dialog open={openDetailsModal} onClose={handleDetailsModalClose}>
            <DialogTitle>Details</DialogTitle>
            <DialogContent>
              {selectedDetail && (
                <StyledDetailsBox>
                  <Typography>Original URL: {selectedDetail.originalUrl}</Typography>
                  <Typography>Engagements: {selectedDetail.engagements}</Typography>
                  <Typography>Earnings: ${selectedDetail.earnings.toFixed(2)}</Typography>
                  <Typography>Created At: {selectedDetail.createdAt}</Typography>
                  <Typography variant="h6" gutterBottom>
                    Countries:
                  </Typography>
                  <ul>
                    {selectedDetail.location.metrics.map((country, countryIndex) => (
                      <li key={`${country.value}-${countryIndex}`}>
                        {country.country} - Engagements: {country.engagements}
                      </li>
                    ))}
                  </ul>
                </StyledDetailsBox>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDetailsModalClose}>Close</Button>
            </DialogActions>
          </Dialog>
          <Dialog
            open={deleteConfirmationOpen}
            onClose={() => handleDeleteConfirmation(false)}
          >
            <DialogTitle>Confirmation</DialogTitle>
            <DialogContent>
              <Typography>
                Are you sure you want to delete this details?
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleDeleteConfirmation(false)}>No</Button>
              <Button onClick={() => handleDeleteConfirmation(true)} color="secondary">
                Yes
              </Button>
            </DialogActions>
          </Dialog>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            {currentSlide % 3 === 0 && currentSlide !== 0 ? (
              <Typography variant="h6">Continue for {currentSlide + 1}, {currentSlide + 2}, ...</Typography>
            ) : null}
          </div>
          <div style={{ textAlign: 'center', marginTop: '10px' }}>
            <IconButton
              onClick={handlePrev}
              disabled={currentSlide === allDetails.length - 0}
            >
              <NavigateBefore />
            </IconButton>
            <IconButton
              onClick={handleNext}
              disabled={currentSlide === allDetails.length - 1}
            >
              <NavigateNext />
            </IconButton>
          </div>
        </div>
      )}
    </div>
  );
}

export default Library;

// Import React, useState, useEffect, axios, and other necessary libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './IpInfoDisplay.css';
import markerIconUrl from '../Image/location-2955.svg'; // Adjust the path

const IpInfoDisplay = () => {
  const [ipInfo, setIpInfo] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedInfo, setSelectedInfo] = useState(null);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const response = await axios.get('https://turbobackend.onrender.com/AllDetails/getAllDetails');
        setIpInfo(response.data);
      } catch (error) {
        console.error('Error fetching IP information:', error);
      }
    };

    fetchIpInfo();
  }, []);

  const toggleDetails = (info) => {
    setSelectedInfo(info);
    setShowDetails(!showDetails);
  };

  const handleDeleteClick = (info) => {
    setSelectedInfo(info);
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(`https://turbobackend.onrender.com/${selectedInfo._id}`);
      setOpenDeleteDialog(false);
      const response = await axios.get('https://turbobackend.onrender.com/AllDetails/getAllDetails');
      setIpInfo(response.data);
    } catch (error) {
      console.error('Error deleting IP information:', error);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  const customIcon = new L.Icon({
    iconUrl: markerIconUrl,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  if (ipInfo.length === 0) {
    return <p>No IP information available.</p>;
  }

  return (
    <div className="ip-info-container">
      <h2 className="ip-info-title">IP Information</h2>
      <Slider {...sliderSettings}>
        {ipInfo.map((info) => (
          <div key={info._id} className="ip-info-card">
            <MapContainer
              center={[info.lat, info.lon]}
              zoom={10}
              style={{ width: '100%', height: '265px' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

              <Marker position={[info.lat, info.lon]} icon={customIcon}>
                <Popup>{info.city}</Popup>
              </Marker>
            </MapContainer>
            <div className="ip-info-details">
              <p>
                Client IP: {info.query}{' '}
                <Button variant="contained" color="primary" onClick={toggleDetails}>
                  {showDetails ? 'Less Info' : 'More Info'}
                </Button>
                <Button variant="contained" color="error" onClick={() => handleDeleteClick(info)}>
                  Delete
                </Button>
              </p>
              {showDetails && (
                <div className="details-container">
                  <p>Country: {info.country}</p>
                  <p>Device: {info.device}</p>
                  <p>Country Code: {info.countryCode}</p>
                  <p>Region: {info.region}</p>
                  <p>Region Name: {info.regionName}</p>
                  <p>City: {info.city}</p>
                  <p>Timezone: {info.timezone}</p>
                  {/* Add more details as needed */}
                </div>
              )}
            </div>
          </div>
        ))}
      </Slider>

      {/* Delete confirmation dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this information?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>No</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IpInfoDisplay;

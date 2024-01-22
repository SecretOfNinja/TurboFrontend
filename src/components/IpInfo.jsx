import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import './IpInfoDisplay.css'; // Create a CSS file for styling

const IpInfoDisplay = () => {
  const [ipInfo, setIpInfo] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const response = await axios.get('https://turbobackend.onrender.com/api/v1/turbo/ip/ipinfo');
        setIpInfo(response.data);

        // Wait for 10 seconds before navigating to /turboform
        setTimeout(() => {
          navigate('/turboform');
        }, 60000); // 10000 milliseconds = 10 seconds
      } catch (error) {
        console.error('Error fetching IP information:', error);
      }
    };

    fetchIpInfo();
  }, [navigate]);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (!ipInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div className="ip-info-container">
      <h2 className="ip-info-title">IP Information</h2>
      <div className="ip-info-content">
        <MapContainer
          center={[ipInfo.lat, ipInfo.lon]}
          zoom={10}
          style={{ width: '100%', height: '200px' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={[ipInfo.lat, ipInfo.lon]}>
            <Popup>{ipInfo.city}</Popup>
          </Marker>
        </MapContainer>
        <div className="ip-info-details">
          <p>
            Client IP: {ipInfo.query}{' '}
            <button className="more-info-button" onClick={toggleDetails}>
              More Info
            </button>
          </p>
          {showDetails && (
            <div className="details-container">
              <p>Country: {ipInfo.country}</p>
              <p>Country Code: {ipInfo.countryCode}</p>
              <p>Region: {ipInfo.region}</p>
              <p>Region Name: {ipInfo.regionName}</p>
              <p>City: {ipInfo.city}</p>
              <p>Timezone: {ipInfo.timezone}</p>
              {/* Add more details as needed */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IpInfoDisplay;

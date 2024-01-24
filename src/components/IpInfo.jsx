import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './IpInfoDisplay.css'; // Create a CSS file for styling

const IpInfoDisplay = () => {
  const [ipInfo, setIpInfo] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchIpInfo = async () => {
      try {
        const response = await axios.get('https://turbobackend.onrender.com/api/v1/turbo/ip/ipinfo/AllDetails/getAllDetails');
        setIpInfo(response.data);
      } catch (error) {
        console.error('Error fetching IP information:', error);
      }
    };

    fetchIpInfo();
  }, []);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

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
              style={{ width: '100%', height: '200px' }}
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[info.lat, info.lon]}>
                <Popup>{info.city}</Popup>
              </Marker>
            </MapContainer>
            <div className="ip-info-details">
              <p>
                Client IP: {info.query}{' '}
                <button className="more-info-button" onClick={toggleDetails}>
                  More Info
                </button>
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
    </div>
  );
};

export default IpInfoDisplay;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './IpInfoDisplay.css';
const IpInfoDisplay = () => {
  const [ipInfoList, setIpInfoList] = useState([]);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    const fetchAllIpInfo = async () => {
      try {
        const response = await axios.get('https://turbobackend.onrender.com/api/v1/turbo/ip/ipinfo/getAllDetails');
        setIpInfoList(response.data);
      } catch (error) {
        console.error('Error fetching all IP information:', error);
      }
    };

    fetchAllIpInfo();
  }, []);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  if (ipInfoList.length === 0) {
    return <p>No IP information available.</p>;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="ip-info-container">
      <h2 className="ip-info-title">All IP Information</h2>
      <Slider {...settings}>
        {ipInfoList.map((ipInfo, index) => (
          <div key={`ip-info-${index}`}>
            {ipInfo.lat && ipInfo.lon ? ( // Check if lat and lon are available
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
            ) : (
              <p>No location information available.</p>
            )}
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
                  <p>Device: {ipInfo.device}</p>
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
        ))}
      </Slider>
    </div>
  );
};

export default IpInfoDisplay;
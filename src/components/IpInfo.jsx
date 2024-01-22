
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const IpInfoDisplay = () => {
  const [ipInfo, setIpInfo] = useState(null);
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

  if (!ipInfo) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>IP Information</h2>
      <p>Client IP: {ipInfo.query}</p>
      <p>Status: {ipInfo.status}</p>
      <p>Country: {ipInfo.country}</p>
      <p>Country Code: {ipInfo.countryCode}</p>
      <p>Region: {ipInfo.region}</p>
      <p>Region Name: {ipInfo.regionName}</p>
      <p>City: {ipInfo.city}</p>
      <p>ZIP: {ipInfo.zip}</p>
      <p>Latitude: {ipInfo.lat}</p>
      <p>Longitude: {ipInfo.lon}</p>
      <p>Timezone: {ipInfo.timezone}</p>
      <p>ISP: {ipInfo.isp}</p>
      <p>Organization: {ipInfo.org}</p>
      <p>AS: {ipInfo.as}</p>
    </div>
  );
};

export default IpInfoDisplay;


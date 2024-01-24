// App.js
import React from 'react';
import { HashRouter  as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import TurboLinkForm from './components/TurboLinkForm'; // Import TurboLinkForm component
import Library from './components/LibraryPage';
import IpInfo from './components/IpInfo';
import './App.css';

const App = () => {
  const handleSignOut = () => {
    // Implement your sign-out logic here
    console.log('Signing out...');
  };

  return (
    <Router>
      <div className="app-container">
      <NavBar handleSignOut={handleSignOut} />
      <Routes>
        <Route path="/" element={<TurboLinkForm />} />
        <Route path="/library" element={<Library />} />
        <Route path="/ip-info" element={<IpInfo />} />
      </Routes>
      </div>
    </Router>
  );
};

export default App;

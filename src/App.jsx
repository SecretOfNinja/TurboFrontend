// App.js
import React, { useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import TurboLinkForm from './components/TurboLinkForm';
import Library from './components/LibraryPage';
import IpInfo from './components/IpInfo';
import Login from './components/Login';
import './App.css';

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleSignOut = () => {
    setLoggedIn(false);
    console.log('Signing out...');
  };

  return (
    <Router>
      <div className="app-container">
        <NavBar handleSignOut={handleSignOut} isLoggedIn={isLoggedIn} />
        <Routes>
          {!isLoggedIn && (
            <Route path="/login" element={<Login onLogin={() => setLoggedIn(true)} />} />
          )}
          <Route path="/library" element={<Library />} />
          <Route path="/ip-info" element={<IpInfo />} />
          <Route path="/" element={<TurboLinkForm />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar';
import TurboLinkForm from './components/TurboLinkForm'; // Import TurboLinkForm component
import './App.css';
const Library = () => <div>Library Page</div>;

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
      </Routes>
      </div>
    </Router>
  );
};

export default App;

// App.jsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import IpInfoDisplay from './components/IpInfo';
import TurboLinkForm from './components/TurboLinkForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IpInfoDisplay />} />
        <Route path="/turboform" element={<TurboLinkForm />} />
      </Routes>
    </Router>
  );
};

export default App;

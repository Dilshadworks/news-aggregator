import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import PreferencesPage from './pages/PreferencesPage';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/preferences" element={<PreferencesPage />} />
      </Routes>
    </Router>
  );
};

export default App;

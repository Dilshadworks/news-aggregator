import React, { useState, useEffect } from 'react';
import FeedPreferences from '../components/FeedPreferences';
import { CATEGORIES, SOURCES, AUTHORS } from '../constants';
import { Box } from '@mui/material';

const PreferencesPage = () => {
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    const savedPreferences = localStorage.getItem('preferences');
    if (savedPreferences) {
      setPreferences(JSON.parse(savedPreferences));
    }
  }, []);

  const handleSavePreferences = (newPreferences) => {
    localStorage.setItem('preferences', JSON.stringify(newPreferences));
    setPreferences(newPreferences);
  };

  const handleClearPreferences = () => {
    localStorage.removeItem('preferences');
    setPreferences(null);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <FeedPreferences
        categories={CATEGORIES}
        sources={SOURCES}
        authors={AUTHORS}
        onSavePreferences={handleSavePreferences}
        onClearPreferences={handleClearPreferences}
        initialPreferences={preferences}
      />
    </Box>
  );
};

export default PreferencesPage;

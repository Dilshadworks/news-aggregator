import React, { useState, useEffect } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Button, Box, Chip } from '@mui/material';

const FeedPreferences = ({ categories, sources, authors, onSavePreferences, onClearPreferences, initialPreferences }) => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedSources, setSelectedSources] = useState([]);
  const [selectedAuthors, setSelectedAuthors] = useState([]);

  useEffect(() => {
    if (initialPreferences) {
      setSelectedCategories(initialPreferences.categories || []);
      setSelectedSources(initialPreferences.sources || []);
      setSelectedAuthors(initialPreferences.authors || []);
    } else {
      setSelectedCategories([]);
      setSelectedSources([]);
      setSelectedAuthors([]);
    }
  }, [initialPreferences]);

  const handleSavePreferences = () => {
    onSavePreferences({ categories: selectedCategories, sources: selectedSources, authors: selectedAuthors });
  };

  const handleClearPreferences = () => {
    onClearPreferences();
    setSelectedCategories([]);
    setSelectedSources([]);
    setSelectedAuthors([]);
  };

  const renderChips = (selected, options) => (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
      {selected.map((value) => (
        <Chip key={value} label={options.find(option => option.id === value).name} />
      ))}
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: '400px', margin: 'auto', p: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={selectedCategories}
          onChange={(e) => setSelectedCategories(e.target.value)}
          label="Categories"
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {categories.map((category) => (
            <MenuItem key={category} value={category}>{category}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Sources</InputLabel>
        <Select
          multiple
          value={selectedSources}
          onChange={(e) => setSelectedSources(e.target.value)}
          label="Sources"
          renderValue={(selected) => renderChips(selected, sources)}
        >
          {sources.map((source) => (
            <MenuItem key={source.id} value={source.id}>{source.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel>Authors</InputLabel>
        <Select
          multiple
          value={selectedAuthors}
          onChange={(e) => setSelectedAuthors(e.target.value)}
          label="Authors"
          renderValue={(selected) => renderChips(selected, authors)}
        >
          {authors.map((author) => (
            <MenuItem key={author.id} value={author.id}>{author.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button variant="contained" color="primary" onClick={handleSavePreferences} sx={{ flexGrow: 1, mx: 0.5 }}>
          Save
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleClearPreferences} sx={{ flexGrow: 1, mx: 0.5 }}>
          Clear
        </Button>
      </Box>
    </Box>
  );
};

export default FeedPreferences;

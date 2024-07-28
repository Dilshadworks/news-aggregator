import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

const SearchBar = ({ onSearch }) => {
  const [keyword, setKeyword] = useState('');

  const handleSearch = () => {
    onSearch(keyword);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, padding: 2, m: 1 }}>
      <TextField
        label="Search articles"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyPress={handleKeyPress}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
};

export default SearchBar;

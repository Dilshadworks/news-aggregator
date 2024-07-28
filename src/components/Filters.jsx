import React, { useEffect, useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem, TextField, Box } from '@mui/material';
import { CATEGORIES, SOURCES, AUTHORS } from '../constants';

const Filters = ({ onFilterChange, initialFilters, preferences }) => {
  const [filters, setFilters] = useState(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleChange = (filterType, value) => {
    setFilters(prevFilters => {
      const newFilters = { ...prevFilters, [filterType]: value };
      onFilterChange(filterType, value);
      return newFilters;
    });
  };

  const renderSelect = (label, options, filterType) => (
    <FormControl sx={{ m: 1, minWidth: 200 }}>
      <InputLabel id={`${filterType}-select-label`}>{label}</InputLabel>
      <Select
        multiple
        labelId={`${filterType}-select-label`}
        id={`${filterType}-select`}
        value={filters[filterType] || []}
        label={label}
        onChange={(e) => handleChange(filterType, e.target.value)}
      >
        {options.map((option) => (
          <MenuItem value={option.id || option} key={option.id || option}>
            {option.name || option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 2 }}>
      {renderSelect('Categories', preferences?.categories || CATEGORIES, 'categories')}
      {renderSelect('Sources', preferences?.sources || SOURCES, 'sources')}
      {renderSelect('Authors', preferences?.authors || AUTHORS, 'authors')}

      <TextField
        label="Keyword"
        value={filters.keyword || ''}
        onChange={(e) => handleChange('keyword', e.target.value)}
        sx={{ m: 1, minWidth: 200 }}
      />

      <TextField
        label="Date"
        type="date"
        value={filters.date || ''}
        InputLabelProps={{ shrink: true }}
        onChange={(e) => handleChange('date', e.target.value)}
        sx={{ m: 1, minWidth: 200 }}
      />
    </Box>
  );
};

export default Filters;

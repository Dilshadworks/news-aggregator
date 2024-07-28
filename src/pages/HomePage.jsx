import React, { useState, useEffect } from 'react';
import { fetchArticles } from '../services/api';
import ArticleList from '../components/ArticleList';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import { CircularProgress, Box } from '@mui/material';

const HomePage = () => {
  const [articles, setArticles] = useState([]);
  const [filters, setFilters] = useState({
    keyword: '',
    category: '',
    source: '',
    author: '',
    date: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [preferences, setPreferences] = useState(null);

  useEffect(() => {
    // Load preferences from localStorage when the component mounts
    const savedPreferences = localStorage.getItem('preferences');
    if (savedPreferences) {
      const parsedPreferences = JSON.parse(savedPreferences);
      setPreferences(parsedPreferences);
      // Set initial filters based on preferences
      setFilters(prevFilters => ({
        ...prevFilters,
        category: parsedPreferences.categories[0] || '',
        source: parsedPreferences.sources[0] || '',
        author: parsedPreferences.authors[0] || '',
      }));
    }
  }, []);

  const handleSearch = (keyword) => {
    setFilters(prevFilters => ({ ...prevFilters, keyword }));
  };

  const handleFiltersChange = (filterType, value) => {
    setFilters(prevFilters => ({ ...prevFilters, [filterType]: value }));
  };

  useEffect(() => {
    const getArticles = async () => {
      setIsLoading(true);
      try {
        const articles = await fetchArticles(filters);
        setArticles(articles);
      } catch (error) {
        console.error('Error fetching articles:', error);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch articles if preferences exist or if there are no filters set
    if (preferences || (!filters.category && !filters.source && !filters.author)) {
      getArticles();
    }
  }, [filters, preferences]);

  return (
    <Box sx={{ padding: 2 }}>
      <SearchBar onSearch={handleSearch} />
      <Filters
        onFilterChange={handleFiltersChange}
        initialFilters={filters}
        preferences={preferences}
      />
      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <ArticleList articles={articles} />
      )}
    </Box>
  );
};

export default HomePage;

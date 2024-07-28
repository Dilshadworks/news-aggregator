import axios from 'axios';

const API_KEYS = {
  newsAPI: process.env.REACT_APP_NEWS_API_KEY,
  guardianAPI: process.env.REACT_APP_GUARDIAN_API_KEY,
  nytimesAPI: process.env.REACT_APP_NYTIMES_API_KEY
};

const fetchNewsAPI = async ({ keyword = 'news', categories, sources, date }) => {
  const params = {
    apiKey: API_KEYS.newsAPI,
    q: keyword || 'latest',
    from: date,
  };

  if (sources && sources.length > 0) {
    params.sources = sources.join(',');
  }

  if (categories && categories.length > 0) {
    params.category = categories[0]; // NewsAPI only allows one category
  }

  const endpoint = categories && categories.length > 0
    ? 'https://newsapi.org/v2/top-headlines'
    : 'https://newsapi.org/v2/everything';

  const response = await axios.get(endpoint, { params });
  return response.data.articles;
};

const fetchGuardianArticles = async ({ keyword = 'news', categories, date }) => {
  const params = {
    'api-key': API_KEYS.guardianAPI,
    q: keyword,
    fromDate: date
  };

  if (categories && categories.length > 0) {
    params.section = categories.join('|');
  }

  // Remove empty params
  Object.keys(params).forEach(key => {
    if (!params[key]) {
      delete params[key];
    }
  });

  const response = await axios.get('https://content.guardianapis.com/search', { params });
  return response.data.response.results;
};

const fetchNYTimesArticles = async ({ keyword = 'news', date, categories }) => {
  const currentDate = new Date().toISOString().split('T')[0].replace(/-/g, '');
  const formattedDate = date ? date.split('T')[0].replace(/-/g, '') : currentDate;
  const params = {
    'api-key': API_KEYS.nytimesAPI,
    q: keyword,
    begin_date: formattedDate
  };

  if (categories && categories.length > 0) {
    params.fq = `news_desk:(${categories.join(' ')})`;
  }

  const response = await axios.get('https://api.nytimes.com/svc/search/v2/articlesearch.json', { params });
  return response.data.response.docs;
};

export const fetchArticles = async ({ keyword, categories, sources, authors, date }) => {
  const results = await Promise.allSettled([
    fetchNewsAPI({ keyword, categories, sources, date }),
    fetchGuardianArticles({ keyword, categories, date }),
    fetchNYTimesArticles({ keyword, categories, date })
  ]);

  let articles = results
    .filter(result => result.status === 'fulfilled')
    .flatMap(result => result.value);

  // Filter by authors if provided
  if (authors && authors.length > 0) {
    articles = articles.filter(article =>
      authors.some(author =>
        article.author && article.author.toLowerCase().includes(author.toLowerCase())
      )
    );
  }

  return articles;
};

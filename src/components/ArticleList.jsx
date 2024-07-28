import React from 'react';
import { Grid } from '@material-ui/core';
import Article from './Article';

const ArticleList = ({ articles }) => {
  return (
    <Grid container spacing={3}>
      {articles.map((article, index) => (
        <Grid item xs={12} sm={6} md={4} key={article.url || index}>
          <Article article={article} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ArticleList;

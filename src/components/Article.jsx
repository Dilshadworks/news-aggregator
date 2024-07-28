import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActions, Button } from '@material-ui/core';

const Article = ({ article }) => {
  const { title, description, url, urlToImage } = article;

  return (
    <Card style={{ maxWidth: 345, margin: '1em' }}>
      <CardMedia
        style={{ height: 140 }}
        image={urlToImage || "https://via.placeholder.com/140"}
        title={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" href={url} target="_blank" rel="noopener noreferrer">
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Article;

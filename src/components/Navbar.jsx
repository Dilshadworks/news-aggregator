import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          News Aggregator
        </Typography>
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
        <Button color="inherit" component={Link} to="/preferences">
          Preferences
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

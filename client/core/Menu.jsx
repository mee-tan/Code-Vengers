import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
  useMediaQuery,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import auth from '../lib/auth-helper'
import { makeStyles } from '@material-ui/core/styles';

const isActive = (location, path) => {
  return location.pathname === path ? { color: '#ff4081' } : { color: 'black' };
};

const styles = {
  fontFamily: 'Oswald',
  marginLeft: 'auto',
  color:'black',
};

const signOut = {
  fontFamily : 'Oswald',
  color: 'blue',
}

const fonts = {
  fontFamily: 'Oswald, sans-serif',
  color:'black',
};

const login = {
  marginLeft:'5',
  fontFamily: 'Oswald, sans-serif',
  color:'black',
};

const signup = {
  fontFamily: 'Oswald',
  marginLeft: 'auto',
  color:'black',
  marginLeft: '10',
};
export default function Menu() {
  const navigate = useNavigate();
  const location = useLocation();
  const isSmallScreen = useMediaQuery('(max-width:600px)');
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const drawerContent = (
    <List>
      <ListItem button onClick={() => navigate('/')}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button onClick={() => navigate('/resources')}>
        <ListItemText primary="Resources" />
      </ListItem>
      <ListItem button onClick={() => navigate('/users')}>
        <ListItemText primary="Users" />
      </ListItem>
    </List>
  );

  return (
    <AppBar position="static" style={{ backgroundColor: '#696969' }}>
      <Toolbar>
        {isSmallScreen ? (
          <>
            <IconButton color="inherit" onClick={handleDrawerOpen}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
              <div onClick={handleDrawerClose} onKeyDown={handleDrawerClose}>
                {drawerContent}
              </div>
            </Drawer>
          </>
        ) : (
          <>
            <Typography variant="h6" color="inherit" style={{...fonts}}>
              CODE VENGERS
            </Typography>
            <Hidden xsDown>
              <Link to="/">
                <IconButton aria-label="Home" style={isActive(location, '/')}>
                </IconButton>
              </Link>
              <Link to="/resources">
                <Button style={{ ...isActive('/resources'), ...fonts }}>Resources</Button>
              </Link>
              <Link to="/users">
                <Button style={{ ...isActive('/users'), ...fonts }}>Users</Button>
              </Link>
            </Hidden>
            {!auth.isAuthenticated() && (
          <Hidden xsDown>
            <span>
              <Link to="/signin">
                <Button style={{ ...isActive('/signin'), ...login }}>Log In</Button>
              </Link>
            <Link to="/signup">
              <Button style={{ ...isActive('/signup'), ...signup }}>Sign up</Button>
            </Link>
            </span>
          </Hidden>
        )}
        {auth.isAuthenticated() && (
          <Hidden xsDown>
            <span>
              <Link to={`/user/${auth.isAuthenticated().user._id}`}>
                <Button style={isActive(location, `/user/${auth.isAuthenticated().user._id}`)}> My Profile</Button>
              </Link>
              
              <Link to="/product">
                <Button style={{...isActive('/products'), ...signup}}> Products</Button>
              </Link>  
              
              <Link to="/products">
                <Button style={{ ...isActive('/products'), ...fonts }}>Our Products</Button>
              </Link>    
              
              <Button
                color="inherit"
                style={signOut}
                onClick={() => {
                  auth.clearJWT(() => navigate('/'));
                }}
              >
                Sign out
              </Button>        
            </span>
          </Hidden>
        )}
          </>
        )}
      </Toolbar>
    </AppBar>
    );
};
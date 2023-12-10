
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, TextField, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import CardMedia from '@material-ui/core/CardMedia';
import contentimg from './../assets/images/content.png';
import coursesimg from './../assets/images/courses.png';
import homeimg from './../assets/images/home.jpg';
const useStyles = makeStyles(theme => ({
    root: {
    backgroundImage: `url(${homeimg})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    maxWidth: 1000,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(5),
    textAlign: 'center',
    backgroundColor: 'white',
  },
  textField: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  error: {
    color: 'red',
  },
  submit: {
    margin: '0 auto',
    marginBottom: theme.spacing(2),
  },
  title: {
    fontSize: '1.5rem',
    fontFamily: 'Oswald, sans-serif',
  },
  footer: {
    backgroundColor:'#696969',
    fontFamily: 'Oswald, sans-serif',
    padding: theme.spacing(2),
    marginTop: '5',
    textAlign: 'center',
    color:'black',
  },
  media: {
    minHeight: 400,
    minWidth: 400,
  },
  media2: {
    minHeight: 200,
    minWidth: 200,
  },
}));

export default function Resources() {
  const classes = useStyles();
  return (
    <div>
      <Card className={classes.card}> 
      <Typography variant="h6" className={classes.title}> 
      Build the Skills You Need
    </Typography>
        <CardContent>
          <Typography variant = "para" className={classes.title} component="p">
  
          </Typography>       
          <Typography variant = "h2" className={classes.title} component="p">
          Created by industry experts, our course catalog covers all of the most sought-after technical skills and languages 
          (like Python, React, and SQL).
          </Typography>
          <br/>
          
          <CardMedia className={classes.media2}
            image={coursesimg} title="Code Vengers"/>
            
            <br/>
          
          <CardMedia className={classes.media}
            image={contentimg} title="Code Vengers"/>
            

        </CardContent>
      </Card>
      <footer  position="static" className={classes.footer}>
      <Typography variant="body2" color="inherit">
          Made with ❤️© 2023 CodeVengers
      </Typography>
  </footer>
      </div>
  );
}


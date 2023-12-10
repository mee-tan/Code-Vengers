
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import codevengersimg from './../assets/images/codevengersimg.png';
import { Link } from 'react-router-dom';
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
    maxWidth: 700,
    margin: 'auto',
    marginTop: theme.spacing(5),
    color: '#444444',
    backgroundColor: '#D9D9D6',
  },
  card2: {
    maxWidth: 900,
    margin: 'auto',
    marginTop: theme.spacing(5),
    color: '#444444',
    backgroundColor: '#D9D9D6',
  },
  title: {
    padding: theme.spacing(3, 2.5, 2),
    color: theme.palette.openTitle,
  },
  media: {
    minHeight: 400,
    minWidth: 400,
  },
  paragraph: {
    fontFamily: 'Oswald, sans-serif',
  },
  h1: {
    fontFamily: 'Oswald, sans-serif',
    fontSize: '2rem',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  footer: {
    backgroundColor:'#696969',
    fontFamily: 'Oswald, sans-serif',
    padding: theme.spacing(2),
    marginTop: 'auto',
    textAlign: 'center',
    color:'black',
  },
}));

export default function Home(){ 
const classes = useStyles()
return (
<div  className={classes.root}>
<Card className={classes.card2}>
  <Card class={classes.card}>
<CardContent>
  <Typography variant="body2"  className= {classes.h1} component="h1"> 
    Welcome to the Code Vengers Online Marketplace
  </Typography> 
  <Typography variant= "body1" className= {classes.paragraph}component="p">
  <br/>
    Build your tech career
    With CodeVengers plans, you can achieve your school project or career goals. sign up today and join our team
    we will do our very best to set you up for the real world.
  </Typography>
</CardContent>
</Card>

<Typography variant="h6" className={classes.title}></Typography>
<CardMedia className={classes.media}
image={codevengersimg} title="Code Vengers"/>

<Card className={classes.card}>
</Card>
<footer  position="static" className={classes.footer}>
  <Typography variant="body2" color="inherit">
  Made with ❤️© 2023 CodeVengers
  </Typography>
  </footer>
</Card> 
</div>
)
}


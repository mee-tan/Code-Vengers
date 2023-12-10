import React from 'react'
import {useState} from 'react'
import {useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import {list} from './api-product.js'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import ArrowForward from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: 700,
    margin: 'auto',
    marginTop: theme.spacing(5),
    color: '#444444',
    backgroundColor: '#D9D9D6',
  },
  textField: {},
  error: {},
  submit: {},
  title: {
    fontSize: 18,
    fontFamily: 'Oswald, sans-serif',
  },
  root: {},
}));

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    list(signal).then((data) => {
      if (data && data.error) {
        console.log(data.error);
      } else {
        console.log(data);
        setProducts(data);
      }
    });

    return function cleanup() {
      abortController.abort();
    };
  }, []);

  const classes = useStyles();

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Our Products
      </Typography>
      <List dense>
        {products.map((item, i) => {
          return <Link component={RouterLink} to={"/product/" + item._id} key={i}>
          {/* <Link component={RouterLink} to={`/products/${item._id}`} key={i}> */}
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={item.name} />
              <ListItemSecondaryAction>
                <IconButton>
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </Link>
})}
      </List>
    </Paper>
  );
}

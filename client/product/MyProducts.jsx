
import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import ListItemText from '@material-ui/core/ListItemText'
import Avatar from '@material-ui/core/Avatar'
import Typography from '@material-ui/core/Typography'
import Person from '@material-ui/icons/Person'
import Divider from '@material-ui/core/Divider'
import auth from '../lib/auth-helper.js'
import {read} from './api-product.js'
import {useLocation, Navigate, Link} from 'react-router-dom'
import { useParams } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import Edit from '@material-ui/icons/Edit';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import DeleteProduct from './DeleteProduct';


const useStyles = makeStyles(theme => ({
  root: theme.mixins.gutters({
    maxWidth: 700,
    margin: 'auto',
    padding: theme.spacing(3),
    marginTop: theme.spacing(20),
    backgroundColor:'white',
  }),
  title: {
    marginTop: theme.spacing(3),
    color: theme.palette.protectedTitle,
    fontFamily: 'Oswald, sans-serif',
  }
}))
export default function ProductDetails({ match }) {
  const location = useLocation();
  const classes = useStyles()
  const [product, setProduct] = useState({})
  const [redirectToSignin, setRedirectToSignin] = useState(false)
  const jwt = auth.isAuthenticated()
  const { productId } = useParams();

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read(
      {
      productId: productId
    }, 
      { 
       t: jwt.token 
       }, 
      signal
      ).then((data) => {
      if (data && data.error) {
        setRedirectToSignin(true)
      } else {
        console.log(data);
        setProduct(data)
      }
    })

    return function cleanup() {
      abortController.abort()
    }

  }, [productId])

  if (redirectToSignin) {
    return <Navigate to="/product" state={{ from: location.pathname }} replace />;
  }

  return (
    <Paper className={classes.root} elevation={4}>
      <Typography variant="h6" className={classes.title}>
        Our Product
      </Typography>
      {product && product.name && product.description && (
        <List dense>
          <ListItem>
            <ListItemAvatar>
              <Avatar>
                <Person />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={product.name} secondary={product.description} />
            <ListItemSecondaryAction>
                  <Link to={`/product/edit/${product._id}`}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit/>
                  </IconButton>
                </Link>
                <DeleteProduct productId={product._id}/>
              </ListItemSecondaryAction>
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary={product.category} secondary={`$${product.price}`}/>
          </ListItem>
        </List>
      )}
    </Paper>
  )
}

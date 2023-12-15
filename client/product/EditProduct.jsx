import React, {useEffect, useState} from 'react'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import Icon from '@material-ui/core/Icon'
import auth from './../lib/auth-helper'
import { makeStyles } from '@material-ui/core/styles'
import {read, update} from './api-product.js'
import { useParams } from 'react-router-dom';
import {Navigate} from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    maxWidth: 500,
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
  },
  submit: {
    margin: 'auto',
    marginBottom: theme.spacing(2)
  },
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename:{
    marginLeft:'10px'
  }
}))

export default function EditProduct () {
  const classes = useStyles()
  const { productId } = useParams();
  const [values, setValues] = useState({
      name: '',
      description: '',
      category: '',
      quantity: '',
      price: '',
      redirect: false,
      error: '',
      open: false,
    })

    const jwt = auth.isAuthenticated()
    
    useEffect(() => {
      const abortController = new AbortController()
      const signal = abortController.signal
      
      read({
        productId: productId
      }, signal).then((data) => {
        if (data.error) {
          setValues({...values, error: data.error})
        } else {
          setValues({...values, 
                     id: data._id, 
                     name: data.name, 
                     description: data.description, 
                     category: data.category, 
                     quantity:data.quantity, 
                     price: data.price
                     });
            }
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
        setValues({ ...values, error: 'Error fetching product details' });
      });
      
    return function cleanup(){
      abortController.abort()
    }
  }, [productId])
    
    
  const clickSubmit = () => {
    let productData = new FormData();
    values.name && productData.append('name', values.name);
    values.description && productData.append('description', values.description);
    values.category && productData.append('category', values.category);
    values.quantity && productData.append('quantity', values.quantity);
    values.price && productData.append('price', values.price);
    update(
      {
        productId: productId,
      },
      {
        t: jwt.token,
      },
      productData
    )
    .then((data) => {
      console.log('Data received from the server:', data);
      
        if (data.error) {
          setValues((prevValues) => ({ ...prevValues, error: data.error }));
        } else {
          setValues((prevValues) => ({
            ...prevValues,
            productId: data._id,
            redirect: true,
          }));
        }
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        setValues((prevValues) => ({
          ...prevValues,
          error: 'Error updating product',
        }));
      });
  };
  
    
/*   const clickSubmit = () => {
    let productData = new FormData()
    values.name && productData.append('name', values.name)
    values.description && productData.append('description', values.description)
    values.category && productData.append('category', values.category)
    values.quantity && productData.append('quantity', values.quantity)
    values.price && productData.append('price', values.price)
  
    update({
      productId: productId
    }, {
      t: jwt.token
    }, productData).then((data) => {
      if (data.error) {
        setValues({...values, error: data.error})
      } else {
        setValues({...values, productId: data._id, redirect: true})
      }
    })
    .catch((error) => {
      console.error('Error updating product:', error);
      setValues({ ...values, error: 'Error updating product' });
    });
    
  } */
  
  
  const handleChange = name => event => {
    setValues({ ...values, [name]: event.target.value });
  }
    if (values.redirect) {
      return (<Navigate to={'/product/'+ values.productId}/>)
    }
    
    return (<div>
      <Card className={classes.card}>
        <CardContent>
          <Typography type="headline" component="h2" className={classes.title}>
            Edit Product
          </Typography>
          <TextField id="name" label="Name" className={classes.textField} value={values.name} 
          onChange={handleChange('name')} margin="normal"/><br/>
          <TextField
            id="multiline-flexible"
            label="Description"
            value={values.description}
            onChange={handleChange('description')}
            className={classes.textField}
            margin="normal"
          />
          <br/>
         <select
          className={classes.textField}
          label="Category"
          value={values.category}
          id="category"
          onChange={handleChange('category')} 
          margin="normal"
      >
          <option value="Men"> Men</option>
          <option value="Women"> Women</option>
          <option value="Teen/Kids">Teen/Kids</option>
      </select> 
      <br/>
      
          <TextField id="quantity" label="Quantity" className={classes.textField} value={values.quantity} onChange={handleChange('quantity')} type="number" margin="normal"/><br/>
          <TextField id="price" label="Price" className={classes.textField} value={values.price} onChange={handleChange('price')} type="number" margin="normal"/><br/>
          {
            values.error && (<Typography component="p" color="error">
              <Icon color="error" className={classes.error}>error</Icon>
              {values.error}</Typography>)
          }
        </CardContent>
        <CardActions>
          <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Update</Button>
        </CardActions>
      </Card>
    </div>)
}

import React, { useState } from 'react';
import { validData } from "./util";
import { makeStyles } from '@material-ui/core/styles';
import { Card, CardContent, Typography, TextField, CardActions, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {createProduct} from './api-product';
import backgroundimg from './../assets/images/home.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundImage: `url(${backgroundimg})`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    maxWidth: 400,
    margin: '0 auto',
    marginTop: theme.spacing(3),
    padding: theme.spacing(2),
    textAlign: 'center',
    backgroundColor: 'grey',
    borderWidth: '2px',
    borderStyle: 'dashed',
    borderColor: 'black',
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
    fontSize: 18,
    fontFamily: 'Oswald, sans-serif',
    textAlign:'center',
  },
}));

/**
* function for product use state
 */
 export default function Product() {
    const classes = useStyles();
     const [productname, setProductName] = useState('');
     const [description, setDescription] = useState('');
     const [category, setCategory] = useState('Men');
     const [isLoading, showLoader] = useState(false);
     const [quantity, setQuantity] = useState('');
     const [price, setPrice] = useState(0);
     const [isValid, setIsValid] = useState(false);
     const [error, setError] = useState('');
     
     /**
      * submit button click 
      * @param {e} e 
      */
     const onSubmit = async(e) => {
        console.log(e)
         e.preventDefault();
         
         setError('');
         showLoader(true);
         
        try {
            await validData({productname, description, category, quantity, price});
            const response = await createProduct({
              name: productname,
              description,
              category,
              quantity,
              price: parseFloat(price),
            });
      
            // Handle success
            console.log('Product added successfully:', response);
            
            setIsValid(true);
        } catch (error) {
            setError('Invalid data! Please Try Again');
            showLoader(false);
            setProductName('');
            setDescription('');
            setCategory('Men');
            setQuantity('');
            setPrice(0);
        }
    };
     
     /**
      * Cancel button click 
      */
    const handleCancel= () => {
        setProductName('');
        setDescription('');
        setCategory('Men');
        setQuantity('');
        setPrice(0);
     }
    
    /**
     * handling categpries 
     * @param {event} event 
     */
    const handleCategories = (event) => {
        setCategory(event.target.value);
    }
    
//Form 
return (
    <div className={classes.root}>
        <div className='login-container'>
        {isValid ? (
          <>
            <h1>Successfully Added!</h1>
          </>
        ) : (
        <div class = "border">
          <Typography variant="h6" className={classes.title}> 
          New Products
          </Typography>
            {error && <p className='error'>{error}</p>}
            <form className='form' onSubmit={onSubmit}>
            <Card className={classes.card}> 
            <CardContent>
                <div class = "labels"> 
                <TextField
                  id="name"
                  label="Name"
                  className={classes.textField}
                  value={productname}
                  onChange={(e) => setProductName(e.currentTarget.value)}
                  margin="normal"
                  />
                </div>
                
                <div class = "labels"> 
                <TextField
                  id="description"
                  label="Description"
                  className={classes.textField}
                  value={description}
                  onChange={(e) => setDescription(e.currentTarget.value)}
                  margin="normal"
                  />
                  </div>
                  
                  <div class = "labels"> 
                  <select
                       className={classes.textField}
                        value={category}
                        onChange={handleCategories}
                    >
                        <option value="Men"> Men</option>
                        <option value="Women"> Women</option>
                        <option value="Teen/Kids">Teen/Kids</option>
                    </select> 
                </div>
                
                <div class = "labels"> 
                <TextField 
                    id="quantity"
                    label="Quantity"
                    className={classes.textField}
                    value={quantity}
                    onChange={(e) => setQuantity(e.currentTarget.value)}
                    margin="normal"
                />
                </div>
                
                <div class = "labels"> 
                <TextField 
                    id = "price"
                    label="Price"
                    placeholder=''
                    className={classes.textField}
                    value={price}
                    onChange={(e) => setPrice(e.currentTarget.value)}
                />
                </div>
              </CardContent> 
              <div class = "submit_button">
                <button color = 'primary' type='submit' className={classes.submit} onClick={onSubmit}>
                    Submit
                </button>
                <button className = 'Cancel' class ="cancel" type='button' onClick={handleCancel}> Cancel </button>
                </div>
            </Card>
            </form>
            </div>          
        )}
        </div>
    </div>
    
    );
}
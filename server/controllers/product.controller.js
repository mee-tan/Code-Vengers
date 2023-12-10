/**
* Name:  Code Vengers
* Date: 10 December 2023
* Description: controller for product 
 */
import Product from '../models/product.model.js'
import extend from 'lodash/extend.js';
import errorHandler from './error.controller.js'

/**
 * creating new product
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const createProduct = async (req, res) => {
    const product = new Product(req.body); // Creating a new Product instance with data from the request body.
    try {
        await product.save(); // Saving the new product to the database.
        return res.status(200).json({
            message: "Successfully signed up!"
    })
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
        })
}
};

/**
 * query for finding all product.
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const list = async (req, res) => {
    try {
        let product = await Product.find({});
        res.json(product);
    } catch (err) {
        return res.status(400).json({
        error: errorHandler.getErrorMessage(err)
        });
    }
};

/**
 * query for finding product by ID
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const productByID = async (req, res, next, id) => { 
    try {
    let product = await Product.findById(id) 
    if (!product)
    return res.status('400').json({ 
    error: "Product not found"
    })
    req.profile = product 
    next()
    } catch (err) {
    return res.status('400').json({ 
    error: "Could not retrieve product"
    }); 
    }
};

/**
 * CRUD operation Reading data 
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const read = (req, res) => {
	return res.json(req.profile) 
};

/**
 * CRUD operation Update data
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const update = async (req, res) => { 
    try {
        let product = req.profile; // Assuming req.profile contains the product to be updated
        product = extend(product, req.body); // Assuming extend is used to update the product object
        res.json(product); // Sending the updated product as a JSON response
    } catch (err) {
        return res.status(400).json({
            error: errorHandler.getErrorMessage(err)
        });
    }
};


/**
 * CRUD operation Remove data
 * @param {req} req 
 * @param {res} res 
 * @returns 
 */
const remove = async (req, res) => { 
try {
let product = req.profile
let deletedUser = await product.remove() 
res.json(deletedUser) 
} catch (err) {
return res.status(400).json({
error: errorHandler.getErrorMessage(err) 
})
} 
}

/**
 * delete all products 
 * @param {req} req 
 * @param {res} res 
 */
const deleteAllProducts = async (req, res) => {
  try {
    // Use Mongoose to remove all documents from the 'products' collection
    await Product.deleteMany({});
    res.json({ message: 'All products have been deleted successfully' });
  } catch (err) {
    return res.status(500).json({ 
    error: errorHandler.getErrorMessage(err)
    });
  }
};


/**
 * Find product by name 
 * @param {req} req 
 * @param {res} res 
 */
const listProductsByName = async (req, res) => {
    const keyword = req.query.name;
    try {
      const products = await Product.find({ name: { $regex: keyword, $options: 'kw' } });
      res.json(products);
    } catch (err) {
      res.status(400).json({ 
      error: errorHandler.getErrorMessage(err) 
      });
    }
};
  
export default {createProduct, list, productByID, read, update, remove, deleteAllProducts, listProductsByName}

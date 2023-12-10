import express from 'express'
import productController from '../controllers/product.controller.js' 
const router = express.Router()
// GET  all products.
router.route('/api/products') 
.get(productController.list)
.post(productController.createProduct)
// GET product by ID s
router.route('/api/products/:productId') 
.get(productController.read)
.put(productController.update) 
.delete(productController.remove)
router.param('productId', productController.productByID)
// Add a new product
router.route('/api/products').post(productController.createProduct) 
router.route('/api/products').get(productController.list)
router.param('productId', productController.productByID)
router.route('/api/products/:productId').get(productController.read)
//UPDATE product by ID
router.route('/api/products/:productId').put(productController.update)
//Rmove product by id
router.route('/api/products/:productId').delete(productController.remove) 
// Remove all products
router.route('/api/products').delete(productController.deleteAllProducts);
router.route('/api/products?name=[kw]').get(productController.listProductsByName)
export default router

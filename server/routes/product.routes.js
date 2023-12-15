import express from "express";
import productController from "../controllers/product.controller.js";

const router = express.Router();

// GET all products.
router
  .route("/api/products")
  .get(productController.list)
  .post(productController.createProduct);

// Add a new product
router.route("/api/products").post(productController.createProduct);

// GET, UPDATE, and REMOVE product by ID
router
  .route("/api/products/:productId")
  .get(productController.read)
  .put(productController.update)
  .delete(productController.remove);

// Middleware to handle product ID parameter
router.param("productId", productController.productByID);

export default router;

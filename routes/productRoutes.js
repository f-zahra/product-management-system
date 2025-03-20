var express = require("express");
const router = express.Router();
const { validateProduct } = require("../validators");
const Product = require("../models/product");
const transactionHandler = require("../transactionHandler");
const ProductRepository = require("../repositories/productRepository");
const ProductService = require("../services/productService");
const ProductController = require("../controllers/productController");
const productRepository = new ProductRepository(Product);
const productService = new ProductService(
  productRepository,
  transactionHandler
);
const productController = new ProductController(productService);

// 2. Find product by ID (GET /products/:id)
router.get("/:id", (req, res) => productController.getProductById(req, res));
// 1. Find all products (GET /products)
router.get("/", (req, res) => productController.getAllProducts(req, res));

// 3. Create a new product (POST /products)
router.post("/", validateProduct, (req, res) =>
  productController.createProduct(req, res)
);

// 4. Update product (PUT /products/:id)
router.put("/:id", validateProduct, (req, res) =>
  productController.updateProduct(req, res)
);

// 5. Delete product (DELETE /products/:id)
router.delete("/:id", (req, res) => productController.deleteProduct(req, res));

router.all("*", (req, res) => {
  res.status(404).json("resource not found");
});
module.exports = router;

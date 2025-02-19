const { validateProduct } = require("../validators");

var express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

// 2. Find product by ID (GET /products/:id)
router.get("/:id", productController.getProductById);
// 1. Find all products (GET /products)
router.get("/", productController.getAllProducts);

// 3. Create a new product (POST /products)
router.post("/", validateProduct, productController.createProduct);

// 4. Update product (PUT /products/:id)
router.put("/:id", validateProduct, productController.updateProduct);

// 5. Delete product (DELETE /products/:id)
router.delete("/:id", productController.deleteProduct);

module.exports = router;

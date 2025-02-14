var express = require("express");
const router = express.Router();

// Find all products (GET /products)
router.get("/", (req, res) => {
  res.send("TODO: ALL PRODUCTS");
});

// Find product by id (GET /products/:id)
router.get("/:id", (req, res) => {
  res.send("TODO: PRODUCT");
});

// Create a new product (POST /products)
router.post("/", (req, res) => {
  res.send("TODO: ADD PRODUCT");
});

// Update product (PUT /products/:id)
router.put("/:id", (req, res) => {
  res.send("TODO: UPDATE PRODUCT");
});

// Delete product (DELETE /products/:id)
router.delete("/:id", (req, res) => {
  res.send("TODO: DELETE PRODUCT");
});

module.exports = router;

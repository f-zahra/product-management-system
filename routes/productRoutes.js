const { validateProduct } = require("../validators");

var express = require("express");
const router = express.Router();
const Product = require("../models/product");

// 2. Find product by ID (GET /products/:id)
router.get("/:id", async (req, res, next) => {
  const id = req.params.id;
  const product = await Product.findByPk(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.status(200).json(product); // Send product details
});
// 1. Find all products (GET /products)
router.get("/", async (req, res, next) => {
  let { page, limit } = req.query; // Get from query parameters

  // Set default values if not provided
  page = parseInt(page) || 1; // Default to page 1
  limit = parseInt(limit) || 10; // Default limit of 10

  const offset = (page - 1) * limit; // Calculate offset

  const products = await Product.findAll({
    limit: limit,
    offset: offset,
    order: [["name", "ASC"]],
  });
  res.status(200).json(products); // Send all products
});

// 3. Create a new product (POST /products)
router.post("/", validateProduct, async (req, res, next) => {
  const { name, description, price } = req.validData;
  const newProduct = await Product.create({ name, description, price });
  res.status(201).json(newProduct);
});

// 4. Update product (PUT /products/:id)
router.put("/:id", validateProduct, async (req, res, next) => {
  const { name, price, description } = req.validData;

  const updatedProduct = await Product.update(
    { name: name, price: price, description: description },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).json(updatedProduct); // Send updated product
});

// 5. Delete product (DELETE /products/:id)
router.delete("/:id", async (req, res, next) => {
  await Product.destroy({
    where: {
      id: req.params.id,
    },
  }); // Delete product
  res.status(200).json({ message: "Product deleted successfully" });
});

module.exports = router;

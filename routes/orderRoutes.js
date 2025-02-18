const { body, validationResult, matchedData } = require("express-validator");

var express = require("express");
const router = express.Router();
const Order = require("../models/order");

// Find order by id (GET /orders/:id)
router.get("/:id", async (req, res) => {
  const orderId = req.params.id;

  const order = await Order.findByPk(orderId);

  if (!order) {
    return res.status(404).send({ message: "Order not found" });
  }

  res.json(order); // Return the found order
});
// Find all orders (GET /orders)
router.get("/", async (req, res) => {
  let { page, limit } = req.query; // Get from query parameters

  // Set default values if not provided
  page = parseInt(page) || 1; // Default to page 1
  limit = parseInt(limit) || 10; // Default limit of 10

  const offset = (page - 1) * limit; // Calculate offset

  const orders = await Order.findAll({
    limit: limit,
    offset: offset,
  });

  if (orders) {
    res.json(orders); // Return the list of orders as a JSON response
  }
});

// Create a new order (POST /orders)
router.post(
  "/",
  [
    // Input Validation & Sanitization
    body("userId")
      .notEmpty()
      .withMessage("User ID is required")
      .isInt()
      .withMessage("User ID must be an integer")
      .toInt(),

    body("products")
      .isArray({ min: 1 })
      .withMessage("Products must be a non-empty array"),

    body("products.*")
      .isInt()
      .withMessage("Each product ID must be an integer")
      .toInt(),

    body("total_price")
      .notEmpty()
      .withMessage("Total price is required")
      .isFloat({ gt: 0 })
      .withMessage("Total price must be a number greater than 0")
      .toFloat(),

    body("quantity")
      .optional()
      .isInt({ gt: 0 })
      .withMessage("Quantity must be an integer greater than 0")
      .toInt(),
  ],
  async (req, res) => {
    // Check validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Extract validated fields only
    const validatedData = matchedData(req);
    const { userId, products, total_price } = validatedData;

    //TODO verify if user exist

    // Create new Order instance
    const newOrder = await Order.create({
      total_price: total_price,
    });
    // Associate the order with the user
    await newOrder.setUser(userId);

    // Associate products with the order
    // For each product, create an entry in the OrderProduct table
    for (const productId of products) {
      //TODO verify if product exist
      // Assuming the request sends a quantity for each product
      const quantity = req.body.quantity;

      await newOrder.addProduct(productId, { through: { quantity } });
    }

    res.status(201).json(newOrder);
  }
);

// Update order (PUT /orders/:id)
router.put("/:id", async (req, res) => {
  const orderId = req.params.id;
  const { total_price, status, order_date } = req.body; // Assuming you pass updated details

  const [updatedRowsCount] = await Order.update(
    { total_price, status, order_date },
    { where: { order_id: orderId } }
  ).catch((error) => {
    res.status(500).send({ message: "Error updating order", error });
  });

  if (updatedRowsCount === 0) {
    return res
      .status(404)
      .send({ message: "Order not found or no changes made" });
  }

  res.send({ message: "Order updated successfully" });
});

// Delete order (DELETE /orders/:id)
router.delete("/:id", async (req, res) => {
  const orderId = req.params.id;

  const deletedRowsCount = await Order.destroy({
    where: { order_id: orderId },
  }).catch((error) => {
    res.status(500).send({ message: "Error deleting order", error });
  });

  if (deletedRowsCount === 0) {
    return res.status(404).send({ message: "Order not found" });
  }

  res.send({ message: "Order deleted successfully" });
});

module.exports = router;

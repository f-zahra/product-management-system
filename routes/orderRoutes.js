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
  const orders = await Order.findAll();

  if (orders) {
    res.json(orders); // Return the list of orders as a JSON response
  }
});

// Create a new order (POST /orders)
router.post("/", async (req, res) => {
  //get data from request body
  const { userId, products, total_price } = req.body;

  // Create new Order instance
  const newOrder = await Order.create({
    total_price: total_price,
  });
  // Associate the order with the user
  await newOrder.setUser(userId);

  // Associate products with the order
  // For each product, create an entry in the OrderProduct table
  for (const productId of products) {
    // Assuming the request sends a quantity for each product
    const quantity = req.body.quantity;

    await newOrder.addProduct(productId, { through: { quantity } });
  }

  res.status(201).json(newOrder);
});

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

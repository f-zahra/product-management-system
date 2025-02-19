const { validateOrder } = require("../validators");

var express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
// Find order by id (GET /orders/:id)
router.get("/:id", orderController.getOrderById);
// Find all orders (GET /orders)
router.get("/", orderController.getAllOrders);

// Create a new order (POST /orders)
router.post("/", validateOrder, orderController.createOrder);

// Update order (PUT /orders/:id)
router.put("/:id", orderController.updateOrder);

// Delete order (DELETE /orders/:id)
router.delete("/:id", orderController.deleteOrder);

module.exports = router;

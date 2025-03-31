var express = require("express");
const router = express.Router();

const { validateOrder } = require("../validators");
const Order = require("../models/order");
const transactionHandler = require("../transactionHandler");
const OrderRepository = require("../repositories/orderRepository");
const ProductRepository = require("../repositories/productRepository");
const OrderService = require("../services/orderService");
const OrderController = require("../controllers/orderController");
const orderRepository = new OrderRepository(Order);
const Product = require("../models/product");
const productRepository = new ProductRepository(Product);
const User = require("../models/user");
const UserRepository = require("../repositories//userRepository");
const userRepository = new UserRepository(User);
const orderService = new OrderService(
  orderRepository,
  userRepository,
  productRepository,
  transactionHandler
);
const orderController = new OrderController(orderService);

// Find order by id (GET /orders/:id)
router.get("/:id", (req, res) => orderController.getOrderById(req, res));
// Find all orders (GET /orders)
router.get("/", (req, res) => orderController.getAllOrders(req, res));

// Create a new order (POST /orders)
router.post("/", validateOrder, (req, res) =>
  orderController.createOrder(req, res)
);

// Update order (PUT /orders/:id)
router.put("/:id", (req, res) => orderController.updateOrder(req, res));

// Delete order (DELETE /orders/:id)
router.delete("/:id", (req, res) => orderController.deleteOrder(req, res));

router.all("*", (req, res) => {
  res.status(404).json("resource not found");
});
module.exports = router;

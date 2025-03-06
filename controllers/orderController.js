const OrderRepository = require("../orderRepository");
const OrderService = require("../orderService");

const orderRepository = new OrderRepository();
const orderService = new OrderService(orderRepository);
exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;

  //get order
  const order = this.orderService.fetchOrderById(orderId);
  if (!order) {
    return res.status(404).send({ message: "Order not found" });
  }

  res.status(200).json(order); // Return the found order
};

exports.getAllOrders = async (req, res) => {
  let { page, limit } = req.query; // Get from query parameters

  // Set default values if not provided
  page = parseInt(page) || 1; // Default to page 1
  limit = parseInt(limit) || 10; // Default limit of 10

  const offset = (page - 1) * limit; // Calculate offset

  //get order
  const orders = orderService.fetchAllOrder(limit, page, offset);

  res.status(200).json(orders); // Return the list of orders as a JSON response
};
exports.createOrder = async (req, res) => {
  const { total_price, products, userId } = req.validData;

  //TODO verify if user exist

  // Create new Order instance
  const newOrder = await orderRepository.createOrder(
    total_price,
    products,
    userId
  );

  // Associate products with the order

  res.status(201).json(newOrder);
};
exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { total_price, status, order_date } = req.validData; // Assuming you pass updated details

  const updatedOrder = orderService.updateOrder(
    { total_price, status, order_date },
    orderId
  );

  res.status(200).json({
    message: "Order updated successfully",
    updatedOrder: updatedOrder,
  });
};
exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  const orderToDelete = orderService.deleteOrder(orderId);
  res.status(200).json({ message: "Order deleted successfully" });
};

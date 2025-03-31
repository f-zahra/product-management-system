class OrderController {
  constructor(orderService) {
    this.orderService = orderService;
  }
  async getOrderById(req, res) {
    const orderId = req.params.id;

    //get order
    const order = await this.orderService.fetchOrderById(orderId);
    if (!order) {
      return res.status(404).send({ message: "Order not found" });
    }

    res.status(200).json(order); // Return the found order
  }

  async getAllOrders(req, res) {
    let { page, limit } = req.query; // Get from query parameters

    // Set default values if not provided
    page = parseInt(page) || 1; // Default to page 1
    limit = parseInt(limit) || 10; // Default limit of 10

    const offset = (page - 1) * limit; // Calculate offset

    //get order
    const orders = await this.orderService.fetchAllOrder(limit, page, offset);

    res.status(200).json(orders); // Return the list of orders as a JSON response
  }
  async createOrder(req, res) {
    // Create new Order instance
    const newOrder = await this.orderService.createNewOrder(req.validData);

    // Associate products with the order

    res.status(201).json(newOrder);
  }
  async updateOrder(req, res) {
    const orderId = req.params.id;
    const { total_price, status, order_date } = req.validData; // Assuming you pass updated details

    const updatedOrder = await this.orderService.updateOrder(
      { total_price, status, order_date },
      orderId
    );

    res.status(200).json({
      message: "Order updated successfully",
      updatedOrder: updatedOrder,
    });
  }
  async deleteOrder(req, res) {
    const orderId = req.params.id;
    await this.orderService.deleteOrder(orderId);
    res.status(200).json({ message: "Order deleted successfully" });
  }
}

module.exports = OrderController;

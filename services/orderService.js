class OrderService {
  constructor(orderRepository) {
    this.orderRepository = orderRepository;
  }
  async fetchOrderById(orderId) {
    return this.orderRepository.getOrderById(orderId);
  }
  async fetchAllOrder(limit, offset, order) {
    return this.orderRepository.getAllOrders(limit, offset, order);
  }
  async createNewOrder(total_price, products, userId) {
    return this.orderRepository.createOrder(total_price, products, userId);
  }
  async updateOrder(newData, orderId) {
    return this.orderRepository.updateOrder(newData, orderId);
  }
  async deleteOrder(orderId) {
    return this.orderRepository.deleteOrder(orderId);
  }
}
module.exports = OrderService;

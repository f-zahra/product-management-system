const CustomError = require("../customError");
const Product = require("../models/product");

class OrderService {
  constructor(
    orderRepository,
    userRepository,
    productRepository,
    transactionHandler
  ) {
    this.orderRepository = orderRepository;
    this.userRepository = userRepository;
    this.productRepository = productRepository;
    this.transactionHandler = transactionHandler;
  }
  async fetchOrderById(orderId) {
    return this.orderRepository.getOrderById(orderId);
  }
  async fetchAllOrder(queryOptions) {
    return this.orderRepository.getAllOrders(queryOptions);
  }
  async createNewOrder(newOrderData) {
    return await this.transactionHandler(async (t) => {
      const { productsIds, userId } = newOrderData;
      // Validate user
      const user = await this.userRepository.findUserById(userId);

      const existingProducts = [];
      // Validate products
      for (const productId of productsIds) {
        //first find the product
        const foundProduct = await this.productRepository.findProductById(
          productId
        );

        //second verify if it's in stock
        if (foundProduct.stock <= 0) {
          throw new CustomError("Product out of stock", 409);
        }
        // Decrement stock
        foundProduct.stock--;
        await this.productRepository.updateProduct(
          foundProduct,
          foundProduct.id
        );

        existingProducts.push(foundProduct);
      }

      // Calculate total price
      //const totalPrice = products.reduce((sum, product) => sum + product.price, 0);
      const total_price = existingProducts.reduce(
        (sum, product) => sum + product.price,
        0
      );
      // Create new Order
      await this.orderRepository.createOrder(total_price, existingProducts, t);
    });
  }
  async updateOrder(newData, orderId) {
    return this.orderRepository.updateOrder(newData, orderId);
  }
  async deleteOrder(orderId) {
    return this.orderRepository.deleteOrder(orderId);
  }
}
module.exports = OrderService;

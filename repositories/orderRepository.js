const CustomError = require("../customError");
//TODO :Implement repository interface for better abstraction and loose coupling
class OrderRepository {
  constructor(orderModel) {
    this.orderModel = orderModel;
  }
  //   getOrderById;
  async getOrderById(orderId) {
    const order = await this.orderModel.findByPk(orderId);
    //if order not found
    if (!order) {
      // If no record is found, throw a custom error
      const error = new CustomError("Order not found", 404);
      //passed to the error handler
      throw error;
    }
    return order;
  }
  //   getAllOrders;
  async getAllOrders(queryOptions = null) {
    const orders = await this.orderModel.findAll({
      queryOptions,
    });
    return orders;
  }
  //   createOrder;
  async createOrder(orderData, products, transaction = null) {
    //no need to find existing record no field is unique

    // Create new Order instance
    const newOrder = await this.orderModel.create(
      { total_price: orderData },
      {
        transaction,
      }
    );
    // Add the products to the order
    for (let product of products) {
      await newOrder.addProduct(product.id, {
        through: { quantity: product.quantity },
        transaction,
      });
    }
    //return plain object
    return newOrder.get({ plain: true });
  }
  //   updateOrder;
  async updateOrder(updatedData, orderId) {
    //find order first
    const existingOrder = await this.orderModel.findOne({
      where: { id: orderId },
    });
    if (!existingOrder) {
      throw new CustomError("Order not found", 404);
    }
    const updatedOrder = existingOrder.update(updatedData);
    return updatedOrder;
  }
  //   deleteOrder
  async deleteOrder(orderId) {
    const existingOrder = await this.orderModel.findOne({
      where: {
        id: orderId,
      },
    });

    const deletedOrder = existingOrder.Destroy();
    return deletedOrder;
  }
}

module.exports = OrderRepository;

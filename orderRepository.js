const Order = require("./models/order");
const sequelize = require("./db");
class OrderRepository {
  //   getOrderById;
  async getOrderById(orderId) {
    const order = await Order.findByPk(orderId);
    return order;
  }
  //   getAllOrders;
  async getAllOrders(limit, offset, order) {
    const orders = await Order.findAll({
      limit,
      offset,
      order: [["order_date", order]],
    });
    return orders;
  }
  //   createOrder;
  async createOrder(total_price, products, userId) {
    await sequelize.transaction(async (t) => {
      // Create new Order instance
      const addedOrder = await Order.create(
        { total_price: total_price },
        {
          transaction: t,
        }
      );

      // Associate the order with the user
      await addedOrder.setUser(userId, { transaction: t });
      // For each product, create an entry in the OrderProduct table
      for (const productId of products) {
        //TODO verify if product exist
        // Assuming the request sends a quantity for each product
        const quantity = 1;

        await addedOrder.addProduct(productId, {
          through: { quantity },
          transaction: t,
        });
      }
      return addedOrder;
    });
  }
  //   updateOrder;
  async updateOrder(newData, orderId) {
    const updatedOrder = await Order.update(newData, {
      where: { order_id: orderId },
    });
    return updatedOrder;
  }
  //   deleteOrder
  async deleteOrder(orderId) {
    const deletedOrder = await Order.Destroy({
      where: {
        order_id: orderId,
      },
    });
    return deletedOrder;
  }
}

module.exports = OrderRepository;

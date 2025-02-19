const Order = require("../models/order");
const sequelize = require("../db");

exports.getOrderById = async (req, res) => {
  const orderId = req.params.id;

  const order = await Order.findByPk(orderId);

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

  const orders = await Order.findAll({
    limit: limit,
    offset: offset,
    order: [["order_date", "DESC"]],
  });

  res.status(200).json(orders); // Return the list of orders as a JSON response
};
exports.createOrder = async (req, res) => {
  await sequelize.transaction(async (t) => {
    const { userId, products, total_price } = req.validData;

    //TODO verify if user exist

    // Create new Order instance
    const newOrder = await Order.create(
      {
        total_price: total_price,
      },
      { transaction: t } //make sure that an order is not created if foreign keys are null
    );
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
  });
};
exports.updateOrder = async (req, res) => {
  const orderId = req.params.id;
  const { total_price, status, order_date } = req.validData; // Assuming you pass updated details

  const [updatedOrder] = await Order.update(
    { total_price, status, order_date },
    { where: { order_id: orderId } }
  );

  res.status(200).json({
    message: "Order updated successfully",
    updatedOrder: updatedOrder,
  });
};
exports.deleteOrder = async (req, res) => {
  const orderId = req.params.id;
  const orderToDelete = await Order.findByPk(orderId);
  if (!orderToDelete) {
    return res.status(404).json({ msg: "order not found" });
  }
  //delete order

  await orderToDelete.destroy();
  res.status(200).json({ message: "Order deleted successfully" });
};

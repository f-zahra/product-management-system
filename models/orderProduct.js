// models/orderProduct.js
const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const OrderProduct = sequelize.define(
  "OrderProduct",
  {
    quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 }, // Quantity of the product
  },
  { schema: "product_management" }
);

//MANY-TO-MANY
Order.belongsToMany(Product, {
  through: "OrderProducts", // Junction table name
  foreignKey: "orderId",
});
//MANY-TO-MANY
Product.belongsToMany(Order, {
  through: "OrderProducts",
  foreignKey: "product_id",
});
module.exports = OrderProduct;

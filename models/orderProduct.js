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

module.exports = OrderProduct;

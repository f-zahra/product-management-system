const { DataTypes } = require("sequelize");
const sequelize = require("../db");
const User = require("./user");
const Product = require("./product");

const Order = sequelize.define(
  "Order",
  {
    // Define columns for the Order model
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // Primary key for the order
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false, // Total price for the order
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false, // Status of the order (e.g., 'pending', 'shipped', 'completed')
      defaultValue: "pending", // Default status is 'pending'
    },
    order_date: {
      type: DataTypes.DATE,
      allowNull: false, // The date when the order was placed
      defaultValue: DataTypes.NOW, // Default to the current date and time
    },
  },
  { schema: "product_management" }
);

User.hasMany(Order, {
  foreignKey: "userId", // Specify the foreign key field in Order table
});
Order.belongsTo(User, {
  foreignKey: "userId",
});

//One Product can be linked to many Orders.
Order.belongsToMany(Product, {
  through: "OrderProduct", // Junction table name
  foreignKey: "orderId",
});

module.exports = Order;

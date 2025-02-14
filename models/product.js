const { DataTypes } = require("sequelize");
const sequelize = require("../db");

const Product = sequelize.define(
  "Product",
  {
    // Define columns
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Product name is required
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true, // Description is optional
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false, // Price is required
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 100, // Default stock value is 100 for now until stock management system is implemented
    },
  },
  { schema: "product_management" }
);

module.exports = Product;

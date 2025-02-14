const { DataTypes } = require("sequelize");
const sequelize = require("./db");
// Import database connection

const User = sequelize.define(
  "User",
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
  },
  { schema: "product_management" }
);

module.exports = User;

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

(async () => {
  try {
    await User.sync({ alter: true }); // `{ alter: true }` updates table structure
    console.log("✅ User model synced!");
  } catch (error) {
    console.error("❌ Failed to sync User model:", error);
  }
})();

module.exports = User;

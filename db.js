require("dotenv").config();

const { Sequelize } = require("sequelize");

// Create a new Sequelize instance to connect to PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  define: {
    freezeTableName: true, // Don't auto-pluralize table names
  },
});

// Test the connection
(async function testConnection() {
  try {
    await sequelize.authenticate(); // Try to authenticate the connection
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = sequelize;

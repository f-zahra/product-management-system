require("dotenv").config();

const { Sequelize } = require("sequelize");

// Create a new Sequelize instance to connect to PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  define: {
    freezeTableName: true, // Don't auto-pluralize table names
  },
});

//test connection
sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    // Log the detailed error for debugging
    console.error("Unable to connect to the database:", error.message);
  });

module.exports = sequelize;

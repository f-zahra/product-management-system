require("dotenv").config();

const { Sequelize } = require("sequelize");

// Create a new Sequelize instance to connect to PostgreSQL
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  define: {
    freezeTableName: true, // Don't auto-pluralize table names
  },
});

(async () => {
  try {
    await sequelize.sync({ force: true }); // for dev only
    console.log("✅  all models synced!");
  } catch (error) {
    console.error("❌ Failed to sync all models:", error);
  }
})();
module.exports = sequelize;

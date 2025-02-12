require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

// Test the connection
pool
  .connect()
  .then((client) => {
    console.log("Connected to PostgreSQL");
    client.release(); // Release the connection back to the pool
  })
  .catch((err) => console.error(" Connection error", err.stack));

module.exports = {
  query: (text, params) => pool.query(text, params),
};

require("express-async-errors"); // Import at the top
require("dotenv").config();
const express = require("express");
const app = express();

const db = require("./db");

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");

// 1. Built-in middleware
app.use(express.json());

// 2. Custom middleware

// 3. Route handler
app.get("/", (req, res) => {
  res.send("welcome !");
});

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", orderRouter);

// 4. Error-handling middleware (MUST be last)
//global error handler catches error that are passed by express-async-errors
app.use((err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal Server Error" });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

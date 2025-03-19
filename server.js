require("express-async-errors"); // Import at the top, forwarding asynchronous errors to your Express error-handling middleware.
require("dotenv").config();
const express = require("express");
const app = express();

const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const orderRouter = require("./routes/orderRoutes");
const { errorHandler } = require("./globalErrorHandler");
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

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

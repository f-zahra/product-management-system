require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");
const userRouter = require("./userRoutes");
const productRouter = require("./productRoutes");
const orderRouter = require("./orderRoutes");
app.get("/", (req, res) => {
  res.send("welcome !");
});

app.use("/users", userRouter);
app.use("/products", userRouter);
app.use("/orders", orderRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

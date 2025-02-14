require("dotenv").config();
const express = require("express");
const app = express();
const db = require("./db");
const userRouter = require("./userRoutes");

app.get("/", (req, res) => {
  res.send("welcome !");
});

app.use("/users", userRouter);
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

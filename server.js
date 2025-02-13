require("dotenv").config();
const express = require("express");
const app = express();
const User = require("./user");
const Product = require("./product");

app.get("/", (req, res) => {
  res.send("welcome !");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

var express = require("express");
const router = express.Router();

// Find all orders (GET /orders)
router.get("/", (req, res) => {
  res.send("TODO: ALL ORDERS");
});

// Find order by id (GET /orders/:id)
router.get("/:id", (req, res) => {
  res.send("TODO: ORDER");
});

// Create a new order (POST /orders)
router.post("/", (req, res) => {
  res.send("TODO: ADD ORDER");
});

// Update order (PUT /orders/:id)
router.put("/:id", (req, res) => {
  res.send("TODO: UPDATE ORDER");
});

// Delete order (DELETE /orders/:id)
router.delete("/:id", (req, res) => {
  res.send("TODO: DELETE ORDER");
});

module.exports = router;

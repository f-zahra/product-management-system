var express = require("express");
const router = express.Router();

//Find all users  (GET /users)
router.get("/", (req, res) => {
  res.send("TODO: ALL USERS");
});
//Find user by id  (GET /users/:id)
router.get("/:id", (req, res) => {
  res.send("TODO: USER ");
});
//Create a new user (POST /users)
router.post("/", (req, res) => {
  res.send("TODO: ADD USER");
});
//Update user (PUT /users/:d)
router.put("/:d", (req, res) => {
  res.send("TODO: UPDATE USER");
});
//Delete user (DELETE /users/:d)
router.delete("/:d", (req, res) => {
  res.send("TODO: DELETE USER");
});

module.exports = router;

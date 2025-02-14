var express = require("express");
const router = express.Router();
const User = require("../models/user");

//Find user by id  (GET /users/:id)
router.get("/:id", async (req, res) => {
  //find user by id
  const user = await User.findByPk(req.params.id);
  // If the user doesn't exist, return 404
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Send the user details if found
  res.status(200).json(user);
});
//Find all users  (GET /users)
router.get("/", async (req, res) => {
  // Find all users
  const users = await User.findAll();
  console.log(users.every((user) => user instanceof User)); // true
  res.send(users);
});

//Create a new user (POST /users)
router.post("/", async (req, res) => {
  const { name, email } = req.body;
  const newUser = await User.create({
    name: name,
    email: email,
  });
  console.log("User's auto-generated ID:", newUser.id);
  res.send(newUser);
});
//Update user (PUT /users/:d)
router.put("/:id", async (req, res) => {
  const { name, email } = req.body;

  const updatedUser = await User.update(
    { name: name, email: email },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.send(updatedUser);
});
//Delete user (DELETE /users/:d)
router.delete("/:id", async (req, res) => {
  const deletedUser = await User.destroy({
    where: {
      id: req.params.id,
    },
  });

  res.send({ deletedUser: deletedUser });
});

module.exports = router;

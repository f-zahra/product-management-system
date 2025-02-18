var express = require("express");
const router = express.Router();
const User = require("../models/user");
const { validateUser } = require("../validators");

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
  let { page, limit } = req.query; // Get from query parameters

  // Set default values if not provided
  page = parseInt(page) || 1; // Default to page 1
  limit = parseInt(limit) || 10; // Default limit of 10

  const offset = (page - 1) * limit; // Calculate offset

  // Find all users
  const users = await User.findAll({
    limit: limit,
    offset: offset,
    order: [["name", "ASC"]],
  });
  res.status(200).json(users);
});

//Create a new user (POST /users)
router.post("/", validateUser, async (req, res) => {
  const { name, email } = req.validData; // Now it's safe to destructure
  const newUser = await User.create({
    name: name,
    email: email,
  });
  res.status(201).json(newUser);
});

//Update user (PUT /users/:d)
router.put("/:id", validateUser, async (req, res) => {
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

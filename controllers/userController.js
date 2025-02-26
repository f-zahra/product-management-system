const User = require("../models/user");
const sequelize = require("../db");
const UserRepository = require("../userRepository");
const UserService = require("../userService");
//call user service
// Create instances of UserRepository and UserService
const userRepository = new UserRepository();
//inject repo into service for loose coupling
const userService = new UserService(userRepository);

exports.getUserById = async (req, res) => {
  //find user by id
  const user = await User.findByPk(req.params.id);
  // If the user doesn't exist, return 404
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Send the user details if found
  res.status(200).json(user);
};
exports.getUsers = async (req, res) => {
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
};
exports.createUser = async (req, res) => {
  const { name, email } = req.validData; // Now it's safe to destructure
  const newUser = await userService.createUser(name, email);
  res.status(201).json(newUser);
};

exports.updateUser = async (req, res) => {
  const { name, email } = req.body;

  const updatedUser = await User.update(
    { name: name, email: email },
    {
      where: {
        id: req.params.id,
      },
    }
  );
  res.status(200).json(updatedUser);
};
exports.deleteUser = async (req, res) => {
  const userId = req.params.id;
  // Check if user exists
  const userToDelete = await User.findByPk(userId);
  if (!userToDelete) {
    return res.status(404).json({ message: "User not found" });
  }

  //  delete the user
  await userToDelete.destroy();
  res.status(200).json({ message: "User deleted successfully" });
};

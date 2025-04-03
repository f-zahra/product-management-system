var express = require("express");
const router = express.Router();

const { validateUser } = require("../validators");
const User = require("../models/user");
const transactionHandler = require("../transactionHandler");

const UserRepository = require("../repositories//userRepository");
const UserService = require("../services/userService");
const UserController = require("../controllers/userController");

/**I have put the dependencies here because it's more simpler than putting in server.js */
//call user service
// Create instances of UserRepository and UserService
const userRepository = new UserRepository(User);
//inject repo into service for loose coupling
const userService = new UserService(userRepository, transactionHandler);
const userController = new UserController(userService);
// structure routes from most specific to least specific:
//Find user by id  (GET /users/:id)
router.get("/:id", (req, res) => userController.getUserById(req, res));
//Find all users  (GET /users)
router.get("/", (req, res) => userController.getUsers(req, res));

router.post("/login", validateUser, async (req, res) => {
  await userController.loginUser(req, res);
});
//Create a new user (POST /users)
router.post("/", validateUser, (req, res) =>
  userController.createUser(req, res)
);

//Update user (PUT /users/:d)
router.put("/:id", validateUser, (req, res) =>
  userController.updateUser(req, res)
);
//Delete user (DELETE /users/:d)
router.delete("/:id", (req, res) => userController.deleteUser(req, res));

router.all("*", (req, res) => {
  res.status(404).json("resource not found");
});
module.exports = router;

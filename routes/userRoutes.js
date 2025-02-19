var express = require("express");
const router = express.Router();

const { validateUser } = require("../validators");

const userController = require("../controllers/userController");

//Find user by id  (GET /users/:id)
router.get("/:id", userController.getUserById);
//Find all users  (GET /users)
router.get("/", userController.getUsers);

//Create a new user (POST /users)
router.post("/", validateUser, userController.createUser);

//Update user (PUT /users/:d)
router.put("/:id", validateUser, userController.updateUser);
//Delete user (DELETE /users/:d)
router.delete("/:id", userController.deleteUser);

module.exports = router;

var express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult, matchedData } = require("express-validator");

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
router.post(
  "/",
  [
    //input validation
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2, max: 50 })
      .withMessage("Name must be between 2 and 50 characters")
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage("Name must contain only letters and spaces")
      .escape(),
    body("email")
      .notEmpty()
      .withMessage("Email is required")
      .isEmail()
      .withMessage("Invalid email format")
      .normalizeEmail() //lower case email
      .escape(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const validatedData = matchedData(req); // Ensures no extra fields. only validated fields are extracted
    const { name, email } = validatedData; // Now it's safe to destructure
    const newUser = await User.create({
      name: name,
      email: email,
    });
    res.status(201).json(newUser);
  }
);

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

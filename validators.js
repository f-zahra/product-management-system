const { body, validationResult, matchedData } = require("express-validator");

// Validation rules for user creation and update
const validateUser = [
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

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // // Ensures no extra fields. only validated fields are extracted
    req.validData = matchedData(req);
    next();
  },
];

module.exports = { validateUser };

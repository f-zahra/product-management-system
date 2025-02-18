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
    //store so they can be accessed in the next middleware or route handler.
    req.validData = matchedData(req);
    next();
  },
];

const validateProduct = [
  // Input Validation & Sanitization
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Product name is required")
    .isLength({ min: 2, max: 100 })
    .withMessage("Product name must be between 2 and 100 characters")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Product name must contain only letters and spaces")
    .escape(),

  body("description")
    .trim()
    .notEmpty()
    .withMessage("Description is required")
    .isLength({ max: 500 })
    .withMessage("Description must not exceed 500 characters")
    .escape(),

  body("price")
    .notEmpty()
    .withMessage("Price is required")
    .isFloat({ gt: 0 })
    .withMessage("Price must be a number greater than 0"),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // // Ensures no extra fields. only validated fields are extracted
    //store so they can be accessed in the next middleware or route handler.
    req.validData = matchedData(req);
    next();
  },
];
const validateOrder = [
  // Input Validation & Sanitization
  body("userId")
    .notEmpty()
    .withMessage("User ID is required")
    .isInt()
    .withMessage("User ID must be an integer")
    .toInt(),

  body("products")
    .isArray({ min: 1 })
    .withMessage("Products must be a non-empty array"),

  body("products.*")
    .isInt()
    .withMessage("Each product ID must be an integer")
    .toInt(),

  body("total_price")
    .notEmpty()
    .withMessage("Total price is required")
    .isFloat({ gt: 0 })
    .withMessage("Total price must be a number greater than 0")
    .toFloat(),

  body("quantity")
    .optional()
    .isInt({ gt: 0 })
    .withMessage("Quantity must be an integer greater than 0")
    .toInt(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // // Ensures no extra fields. only validated fields are extracted
    //store so they can be accessed in the next middleware or route handler.
    req.validData = matchedData(req);
    next();
  },
];

module.exports = { validateUser, validateProduct, validateOrder };

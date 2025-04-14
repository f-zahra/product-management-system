const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

class JwtService {
  generateToken(user) {
    return jwt.sign(
      { username: user.username, id: user._id }, // Payload
      process.env.JWT_SECRET, // Secret key
      { expiresIn: "1h" } // Expiry time
    );
  }

  verifyToken(token) {
    try {
      return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new Error("Invalid token");
    }
  }
}

module.exports = new JwtService();

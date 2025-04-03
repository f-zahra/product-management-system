const JwtService = require("./services/jwtService");

exports.verifyJWT = (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(403).send("Token is required");
  }

  const decoded = JwtService.verifyToken(token);
  req.user = decoded; // Attach the decoded user info to the request
  next();
};

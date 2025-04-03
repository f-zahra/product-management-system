const JwtService = require("./services/jwtService");

exports.verifyJWT = (req, res, next) => {
  const token =
    req.cookies.token || req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).send("please log in");
  }

  const decoded = JwtService.verifyToken(token);
  req.user = decoded; // Attach the decoded user info to the request
  next();
};

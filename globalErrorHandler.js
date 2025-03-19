//global error handler catches error that are passed by express-async-errors
//catch unexpected err
exports.errorHandler = (err, req, res, next) => {
  res
    .status(err.status || 500)
    .json({ error: err.message || "Internal  Server Error" });
};

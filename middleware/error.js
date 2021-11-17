const errorHandler = (err, req, res, next) => {
  // Log to console for dev
  console.log(err.stack.red);

  // Getting error from errorResponse class or default it to 500
  res.status(err.statusCode || 500).json({
    success: false,
    error: err.message || "Server Error",
  });
};

export default errorHandler;

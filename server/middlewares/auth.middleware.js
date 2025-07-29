// server/middleware/auth.middleware.js
const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const authMiddleware = (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Unauthorized: Token missing" });
    }

    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Add decoded user info to request
    req.user = decoded;

    next(); // Go to next route/controller
  } catch (error) {
    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: "Unauthorized: Invalid token", error: error.message });
  }
};

module.exports = authMiddleware;

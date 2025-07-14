// import login service from "../services/login.service.js";
const loginService = require("../services/login.service.js");
const { StatusCodes } = require("http-status-codes");
// Define the login controller
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginService.login(email, password);
    res.status(StatusCodes.OK).json({
      message: "Login successful",
      user,
    });
  } catch (error) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: error.message,
    });
  }
};
//Export the login controller
module.exports = { login };

// login service using async function
const dbconfig = require("../config/db.config.js");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const login = async (email, password) => {
  let finalmessage = {};
  try {
    //step 1: get employee by email
    cosnt[rows] = await dbconfig.query(
      "SELECT employee.employee_id, employee_pass.employee_password_hashed FROM employee  JOIN employee_pass  ON employee.employee_id = employee_pass.employee_id WHERE employee.employee_email = ?",
      [email]
    );

    if (rows.length === 0) {
      finalmessage.message = "User not found.";
      finalmessage.status = StatusCodes.UNAUTHORIZED;
      return finalmessage;
    }

    // Compare the password with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(
      password,
      rows[0].employee_password_hashed
    );

    if (!isPasswordValid) {
      finalmessage.message = "Invalid password.";
      finalmessage.status = StatusCodes.UNAUTHORIZED;
      return finalmessage;
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: rows[0].employee_id },
      process.env.JWT_SECRET || "secret",
      {
        expiresIn: "1h",
      }
    );

    finalmessage.message = "Login successful.";
    finalmessage.status = StatusCodes.OK;
    finalmessage.token = token;
  } catch (error) {
    console.error("Error during login:", error);
    finalmessage.message = "An error occurred during login.";
    finalmessage.status = StatusCodes.INTERNAL_SERVER_ERROR;
  }

  return finalmessage;
};
// Export the login service
module.exports = { login };

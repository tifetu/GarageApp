const employeeService = require("../services/employee.service");
const bcrypt = require("bcrypt");

async function login(employeeData) {
  try {
    const { employee_email,employee_password_hashed} = employeeData;

    // Fetch employee by email
    const employeeInfo = await employeeService.getEmployeeByEmail(
      employee_email
    );

    if (!employeeInfo || employeeInfo.length === 0) {
      return {
        status: "Fail",
        message: "Employee does not exist",
      };
    }

    const hashedPassword = employeeInfo[0].employee_password_hashed;

    if (!hashedPassword) {
      return {
        status: "Fail",
        message: "No password set for this employee",
      };
    }

    // Compare plain password with hashed password in DB
    const passwordMatch = await bcrypt.compare(
      employee_password_hashed,
      hashedPassword
    );

    if (!passwordMatch) {
      return {
        status: "Fail",
        message: "Incorrect password",
      };
    }

    return {
      status: "Success",
      data: employeeInfo[0],
    };
  } catch (error) {
    console.error("Error in login service:", error);
    return {
      status: "Fail",
      message: "Something went wrong during login",
    };
  }
}

module.exports = { login };

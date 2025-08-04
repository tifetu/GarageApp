const loginService = require("../services/login.service");
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

async function login(req, res) {
  try {
    const { employee_email, employee_password_hashed } = req.body;

    // Validate required fields
    if (!employee_email || !employee_password_hashed) {
      return res.status(400).json({
        status: "Fail",
        message:
          "Missing required fields: employee_email and employee_password",
      });
    }

    // Call service to validate credentials
    const employee = await loginService.login({
      employee_email,
      employee_password_hashed, // Send plain password (service will hash & compare)
    });

    if (employee.status === "Fail") {
      return res.status(401).json({
        status: "Fail",
        message: employee.message,
      });
    }

    // Generate JWT payload
    const payload = {
      employee_id: employee.data.employee_id,
      employee_email: employee.data.employee_email,
      employee_first_name: employee.data.employee_first_name,
      employee_role: employee.data.company_role_id,
    };

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "24h" });

    return res.status(200).json({
      status: "Success",
      message: "Employee logged in successfully",
      data: { token },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      status: "Fail",
      message: "Internal server error",
    });
  }
}

module.exports = { login };

const StatusCodes = require("http-status-codes").StatusCodes;

const employeeService = require("../services/employee.service.js");
const addEmployee = async (req, res) => {
  // Validate the request body
  if (!req.body || !req.body.employee_email) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid request: employee_email is required" });
  }
  // check email is exists
  const existingEmployee = await employeeService.checkEmployeeList(
    req.body.employee_email
  );

  if (existingEmployee) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Email already exists" });
  }
  try {
    const employee = await employeeService.addEmployee(req.body);
    // if employee is not added
    if (employee) {
      return res
        .status(StatusCodes.CREATED)
        .json({ message: "Employee added successfully" });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "faild add employee" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
const getEmployees = async (req, res) => {
  try {
    const employees = await employeeService.getEmployees();
    res.status(StatusCodes.OK).json(employees);
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
const getEmployeeById = async (req, res) => {
  try {
    const employeeId = req.params.id;

    if (!employeeId || employeeId === "undefined") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Employee ID is required and must be valid",
      });
    }

    const employee = await employeeService.getEmployeeById(employeeId);
    if (employee) {
      return res.status(StatusCodes.OK).json(employee);
    } else {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `Employee not found with ID: ${employeeId}`,
      });
    }
  } catch (error) {
    console.error("Error in getEmployeeById controller:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Failed to fetch employee",
    });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: "Employee ID is required",
      });
    }

    const updatedEmployee = await employeeService.updateEmployee(id, req.body);
    if (!updatedEmployee) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: "Employee not found",
      });
    }

    return res.status(StatusCodes.OK).json({
      message: "Employee updated successfully",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Error in updateEmployee controller:", error);
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Failed to update employee",
    });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const result = await employeeService.deleteEmployee(req.params.id);
    if (result) {
      res
        .status(StatusCodes.OK)
        .send({ message: "Employee deleted successfully" });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message:
          "Cannot delete employee. They are associated with existing orders.",
      });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

module.exports = {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

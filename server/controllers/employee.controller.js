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
    const employee = await employeeService.getEmployeeById(req.params.id);
    if (employee) {
      res.status(StatusCodes.OK).json(employee);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Employee not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await employeeService.updateEmployee(
      req.params.id,
      req.body
    );
    if (updatedEmployee) {
      res.status(StatusCodes.OK).json(updatedEmployee);
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Employee not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};
const deleteEmployee = async (req, res) => {
  try {
    const result = await employeeService.deleteEmployee(req.params.id);
    if (result) {
      res.status(204).send();
    } else {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Employee not found" });
    }
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
};

// export default {
module.exports = {
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

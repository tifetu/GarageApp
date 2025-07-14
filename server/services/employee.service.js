// Import the database configuration
const { dbconfig, getConnection } = require("../config/db.config.js");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");
const e = require("express");
// check employee list
const checkEmployeeList = async (email) => {
  const query = "SELECT * FROM employee wHERE employee_email = ?";
  const [rows] = await dbconfig.query(query, email);
  if (rows.length > 0) {
    return true;
  } else {
    return false;
  }
};
// Add a new employee
const addEmployee = async (employeeData) => {
  const employee = {};
  const conn = await getConnection();
  try {
    // start a transaction
    await conn.beginTransaction();
    // hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(employee.employee_password, salt);

    const query =
      "INSERT INTO employee(employee_email,	active_employee) VALUES(?,?)";
    const [result] = await dbconfig.query(
      query,
      employeeData.employee_email,
      employeeData.active_employee
    );
    // validate rows
    if (result.affectedRows === 0) {
      throw new Error("Failed to add employee");
    }
    const employeeId = result.insertId;
    // insert into employee-info table
    const infoQuery =
      "INSERT INTO employee_info(employee_id, employee_first_name, employee_last_name, employee_phone) VALUES(?,?,?,?)";
    const [infoResult] = await dbconfig.query(infoQuery, [
      employeeId,
      employeeData.employee_first_name,
      employeeData.employee_last_name,
      employeeData.employee_phone,
    ]);
    if (infoResult.affectedRows === 0) {
      throw new Error("Failed to add employee info");
    }
    // insert into employee-password table
    const passwordQuery =
      "INSERT INTO employee_password(employee_id, employee_password) VALUES(?,?)";
    const [passwordResult] = await dbconfig.query(passwordQuery, [
      employeeId,
      hashedPassword,
    ]);
    if (passwordResult.affectedRows === 0) {
      throw new Error("Failed to add employee password");
    }
    // insert into employee-role table
    const roleQuery =
      "INSERT INTO employee_role(employee_id, employee_role) VALUES(?,?)";
    const [roleResult] = await dbconfig.query(roleQuery, [
      employeeId,
      employeeData.employee_role,
    ]);
    if (roleResult.affectedRows === 0) {
      throw new Error("Failed to add employee role");
    }
    // commit the transaction
    await conn.commit();
    // return the added employee data
    employee.id = employeeId;
  } catch (error) {
    // rollback the transaction in case of error
    await conn.rollback();
    console.error("Error adding employee:", error);
    return false;
  } finally {
    // release the connection back to the pool
    conn.release();
  }
  return employee;
};
// Get all an employee
const getEmployees = async () => {
  try {
    const query = "SELECT * FROM employee";
    const [rows] = await dbconfig.query(query);
    return rows;
  } catch (error) {
    throw new Error("Error fetching employees: " + error.message);
  }
};
// Get an employee by ID
const getEmployeeById = async (id) => {
  try {
    const query = "SELECT * FROM employee WHERE id = ?";
    const [rows] = await dbconfig.query(query, [id]);
    return rows[0];
  } catch (error) {
    throw new Error("Error fetching employee: " + error.message);
  }
};
// Update an employee by ID
const updateEmployee = async (id, employeeData) => {
  try {
    const query = "UPDATE employee SET ? WHERE id = ?";
    const [result] = await dbconfig.query(query, [employeeData, id]);
    if (result.affectedRows === 0) {
      return null; // No employee found with the given ID
    }
    return { id, ...employeeData };
  } catch (error) {
    throw new Error("Error updating employee: " + error.message);
  }
};
// Delete an employee by ID
const deleteEmployee = async (id) => {
  try {
    const query = "DELETE FROM employee WHERE id = ?";
    const [result] = await dbconfig.query(query, [id]);
    return result.affectedRows > 0;
  } catch (error) {
    throw new Error("Error deleting employee: " + error.message);
  }
};
// Export the employee service functions
module.exports = {
  checkEmployeeList,
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};

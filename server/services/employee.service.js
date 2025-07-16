const { getConnection } = require("../config/db.config.js");
const { StatusCodes } = require("http-status-codes");
const bcrypt = require("bcrypt");

// Check if employee exists
const checkEmployeeList = async (email) => {
  const conn = await getConnection();
  try {
    const query = "SELECT * FROM employee WHERE employee_email = ?";
    const [rows] = await conn.query(query, [email]);
    return rows.length > 0;
  } catch (error) {
    console.error("Error checking employee list:", error);
    throw error;
  } finally {
    conn.release();
  }
};

// Add a new employee
const addEmployee = async (employeeData) => {
  const employee = {};
  const conn = await getConnection();
  try {
    await conn.beginTransaction();

    // Check if employee already exists
    const exists = await checkEmployeeList(employeeData.employee_email);
    if (exists) {
      throw new Error("Employee with this email already exists");
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      employeeData.employee_password_hashed,
      salt
    );

    // Insert into employee table
    const employeeQuery =
      "INSERT INTO employee(employee_email, active_employee) VALUES(?, ?)";
    const [employeeResult] = await conn.query(employeeQuery, [
      employeeData.employee_email,
      employeeData.active_employee,
    ]);

    if (employeeResult.affectedRows !== 1) {
      throw new Error("Failed to add employee");
    }

    const employeeId = employeeResult.insertId;

    // Insert into employee_info table
    const infoQuery =
      "INSERT INTO employee_info(employee_id, employee_first_name, employee_last_name, employee_phone) VALUES(?, ?, ?, ?)";
    const [infoResult] = await conn.query(infoQuery, [
      employeeId,
      employeeData.employee_first_name,
      employeeData.employee_last_name,
      employeeData.employee_phone,
    ]);

    if (infoResult.affectedRows !== 1) {
      throw new Error("Failed to add employee info");
    }

    // Insert into employee_password table
    const passwordQuery =
      "INSERT INTO employee_pass(employee_id, employee_password_hashed) VALUES(?, ?)";
    const [passwordResult] = await conn.query(passwordQuery, [
      employeeId,
      hashedPassword,
    ]);

    if (passwordResult.affectedRows !== 1) {
      throw new Error("Failed to add employee password");
    }

    // Insert into employee_role table
    const roleQuery =
      "INSERT INTO employee_role(employee_id, company_role_id) VALUES(?, ?)";
    const [roleResult] = await conn.query(roleQuery, [
      employeeId,
      employeeData.company_role_id,
    ]);

    if (roleResult.affectedRows !== 1) {
      throw new Error("Failed to add employee role");
    }

    await conn.commit();
    // Store employee ID in employee object
    employee.employeeId = employeeId;
  } catch (error) {
    await conn.rollback();
    console.error("Error adding employee:", error);
    throw error;
  } finally {
    conn.release();
  }
};

// Get all employees
const getEmployees = async () => {
  const conn = await getConnection();
  try {
    const query = "SELECT * FROM employee";
    const [rows] = await conn.query(query);
    return rows;
  } catch (error) {
    console.error("Error fetching employees:", error);
    throw error;
  } finally {
    conn.release();
  }
};
async function getEmployeeByEmail(email) {
  const conn = await getConnection();
  const sql = `
    SELECT 
        e.employee_id, 
        e.employee_email, 
        e.active_employee, 
        e.added_date,
        ei.employee_first_name, 
        ei.employee_last_name, 
        ei.employee_phone, 
        ep.employee_password_hashed, 
        er.company_role_id
    FROM 
        employee e
    JOIN 
        employee_info ei ON e.employee_id = ei.employee_id
    JOIN 
        employee_pass ep ON e.employee_id = ep.employee_id
    JOIN 
        employee_role er ON e.employee_id = er.employee_id
    WHERE 
        e.employee_email = ?;
`;
  const empoyeeData = await conn.query(sql, [email]);

  return empoyeeData[0];
}
// Get an employee by ID
const getEmployeeById = async (id) => {
  const conn = await getConnection();
  try {
    const query = "SELECT * FROM employee WHERE id = ?";
    const [rows] = await conn.query(query, [id]);
    if (rows.length === 0) {
      throw new Error("Employee not found");
    }
    return rows[0];
  } catch (error) {
    console.error("Error fetching employee:", error);
    throw error;
  } finally {
    conn.release();
  }
};

// Update an employee by ID
const updateEmployee = async (id, employeeData) => {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();

    const query = "UPDATE employee SET ? WHERE id = ?";
    const [result] = await conn.query(query, [employeeData, id]);

    if (result.affectedRows === 0) {
      throw new Error("Employee not found");
    }

    // If password is being updated
    if (employeeData.employee_password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        employeeData.employee_password,
        salt
      );

      const passwordQuery =
        "UPDATE employee_password SET employee_password = ? WHERE employee_id = ?";
      await conn.query(passwordQuery, [hashedPassword, id]);
    }

    await conn.commit();
    return { id, ...employeeData };
  } catch (error) {
    await conn.rollback();
    console.error("Error updating employee:", error);
    throw error;
  } finally {
    conn.release();
  }
};

// Delete an employee by ID
const deleteEmployee = async (id) => {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();

    // First delete from related tables
    await conn.query("DELETE FROM employee_info WHERE employee_id = ?", [id]);
    await conn.query("DELETE FROM employee_password WHERE employee_id = ?", [
      id,
    ]);
    await conn.query("DELETE FROM employee_role WHERE employee_id = ?", [id]);

    // Then delete from main employee table
    const query = "DELETE FROM employee WHERE id = ?";
    const [result] = await conn.query(query, [id]);

    await conn.commit();
    return result.affectedRows > 0;
  } catch (error) {
    await conn.rollback();
    console.error("Error deleting employee:", error);
    throw error;
  } finally {
    conn.release();
  }
};

module.exports = {
  checkEmployeeList,
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeByEmail,
};

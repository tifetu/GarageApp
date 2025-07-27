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

    // Debugging: Log company_role_id
    console.log("Provided company_role_id:", employeeData.company_role_id);

    // Validate company_role_id
    const roleExistsQuery =
      "SELECT * FROM company_roles WHERE company_role_id = ?";
    const [roleRows] = await conn.query(roleExistsQuery, [
      employeeData.company_role_id,
    ]);
    if (roleRows.length === 0) {
      throw new Error("Invalid company_role_id");
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
  // Return the added employee data
  return employee;
};

// Get all employees
const getEmployees = async () => {
  const conn = await getConnection();
  try {
    const query =
      "SELECT employee.employee_id, employee.employee_email, employee.active_employee,employee.added_date, employee_info.employee_first_name, employee_info.employee_last_name, employee_info.employee_phone,  employee_role.company_role_id FROM employee JOIN employee_info ON employee.employee_id = employee_info.employee_id JOIN employee_pass ON employee.employee_id = employee_pass.employee_id JOIN employee_role ON employee.employee_id = employee_role.employee_id";
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
    const sql = `
    SELECT 
        employee.employee_id, 
        employee.employee_email, 
        employee.active_employee, 
        employee.added_date,
        employee_info.employee_first_name, 
        employee_info.employee_last_name, 
        employee_info.employee_phone, 
        employee_pass.employee_password_hashed, 
        employee_role.company_role_id
    FROM 
        employee 
    JOIN 
        employee_info ON employee.employee_id = employee_info.employee_id
    JOIN 
        employee_pass ON employee.employee_id = employee_pass.employee_id
    JOIN 
        employee_role ON employee.employee_id = employee_role.employee_id
    WHERE 
        employee.employee_id = ?;
`;
    const [rows] = await conn.query(sql, [id]);
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

    // First update employee table - FIXED SQL SYNTAX
    console.log(
      "Updating employee table with ID:",
      id,
      "and data:",
      employeeData
    );
    const [employeeResult] = await conn.query(
      "UPDATE employee SET employee_email = ?, active_employee = ? WHERE employee_id = ?",
      [
        employeeData.employee_email,
        employeeData.active_employee || 1, // Default to active if not provided
        id,
      ]
    );

    if (employeeResult.affectedRows === 0) {
      console.error("Employee not found for ID:", id);
      throw new Error("Employee not found");
    }

    // Update employee_info table
    await conn.query(
      "UPDATE employee_info SET employee_first_name = ?, employee_last_name = ?, employee_phone = ? WHERE employee_id = ?",
      [
        employeeData.employee_first_name,
        employeeData.employee_last_name,
        employeeData.employee_phone,
        id,
      ]
    );

    // Update password if provided
    if (employeeData.employee_password_hashed) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        employeeData.employee_password_hashed,
        salt
      );

      await conn.query(
        "UPDATE employee_pass SET employee_password_hashed = ? WHERE employee_id = ?",
        [hashedPassword, id]
      );
    }

    // Update role if provided
    if (employeeData.company_role_id) {
      await conn.query(
        "UPDATE employee_role SET company_role_id = ? WHERE employee_id = ?",
        [employeeData.company_role_id, id]
      );
    }

    await conn.commit();

    // Return updated employee data
    const [updatedEmployee] = await conn.query(
      `SELECT e.employee_id, e.employee_email, e.active_employee, 
       ei.employee_first_name, ei.employee_last_name, ei.employee_phone, 
       er.company_role_id 
       FROM employee e
       JOIN employee_info ei ON e.employee_id = ei.employee_id
       JOIN employee_role er ON e.employee_id = er.employee_id
       WHERE e.employee_id = ?`,
      [id]
    );

    return updatedEmployee[0];
  } catch (error) {
    await conn.rollback();
    console.error("Error updating employee:", error);
    throw error;
  } finally {
    conn.release();
  }
};

// Delete an employee by ID
// const deleteEmployee = async (id) => {
//   const conn = await getConnection();
//   try {
//     await conn.beginTransaction();

//     // Delete associated rows in the orders table
//     await conn.query("DELETE FROM orders WHERE employee_id = ?", [id]);

//     // Delete from related tables
//     await conn.query("DELETE FROM employee_info WHERE employee_id = ?", [id]);
//     await conn.query("DELETE FROM employee_pass WHERE employee_id = ?", [id]);
//     await conn.query("DELETE FROM employee_role WHERE employee_id = ?", [id]);

//     // Delete from main employee table
//     const query = "DELETE FROM employee WHERE employee_id = ?";
//     const [result] = await conn.query(query, [id]);

//     await conn.commit();
//     return result.affectedRows > 0;
//   } catch (error) {
//     await conn.rollback();
//     console.error("Error deleting employee:", error);
//     throw error;
//   } finally {
//     conn.release();
//   }
// };

async function deleteEmployee(id) {
  const connection = await getConnection();

  if (!id) {
    return false;
  }

  try {
    await connection.beginTransaction();

    const sql1 = "DELETE FROM `employee_role` WHERE `employee_id` = ?";

    const sql2 = "DELETE FROM `employee_info` WHERE `employee_id` = ?";

    const sql3 = "DELETE FROM `employee_pass` WHERE `employee_id` = ?";

    const sql4 = "DELETE FROM `employee` WHERE `employee_id` = ?";

    const [row1] = await connection.query(sql1, [id]);

    if (row1.affectedRows !== 1) {
      throw new Error("Failed to delete employee role");
    }

    const [row2] = await connection.query(sql2, [id]);

    if (row2.affectedRows !== 1) {
      throw new Error("Failed to delete employee info");
    }

    const [row3] = await connection.query(sql3, [id]);

    if (row3.affectedRows !== 1) {
      throw new Error("Failed to delete employee pass");
    }

    const [row4] = await connection.query(sql4, [id]);

    if (row4.affectedRows !== 1) {
      throw new Error("Failed to delete employee");
    }

    await connection.commit();

    return true;
  } catch (error) {
    await connection.rollback();
    return false;
  } finally {
    connection.release();
  }
}

module.exports = {
  checkEmployeeList,
  addEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
  getEmployeeByEmail,
};

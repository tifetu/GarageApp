const { getConnection } = require("../config/db.config");
const bcrypt = require("bcrypt");
// function create
async function checkIfCustomerExist(email) {
  const conn = await getConnection(); // Get a database connection
  try {
    const sql = "SELECT * FROM customer_identifier WHERE customer_email=?";
    const [check] = await conn.query(sql, [email]); // Use the connection to execute the query
    return check.length > 0;
  } catch (error) {
    console.error("Error checking if customer exists:", error);
    throw error;
  } finally {
    conn.release(); // Release the connection
  }
}
async function createCustomer(customerData) {
  const conn = await getConnection();
  try {
    // trasaction
    await conn.beginTransaction();

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(customerData.customer_hash, salt);
    // Insert into customer_identifier
    const [customerResult] = await conn.query(
      "INSERT INTO customer_identifier (customer_email, customer_phone_number, customer_hash) VALUES (?, ?, ?)",
      [
        customerData.customer_email,
        customerData.customer_phone_number,
        hashedPassword,
      ]
    );
    const customerId = customerResult.insertId;
    // insert into customer info
    await conn.query(
      "INSERT INTO customer_info (customer_id, customer_first_name, customer_last_name, active_customer_status) VALUES (?, ?, ?, ?)",
      [
        customerId,
        customerData.customer_first_name,
        customerData.customer_last_name,
        customerData.active_customer_status,
      ]
    );
    // insert into customer role
    await conn.commit();
  } catch (error) {
    await conn.rollback();
    console.error("Error creating customer:", error);
    throw error;
  } finally {
    conn.release();
  }
}
async function getAllCustomers() {
  const conn = await getConnection();
  try {
    // start Transaction
    const [customers] = await conn.query(`
      SELECT customer_identifier.customer_id, customer_identifier.customer_email, customer_identifier.customer_phone_number,customer_identifier.customer_added_date,
             customer_info.customer_first_name, customer_info.customer_last_name, 
            customer_info.active_customer_status
      FROM customer_identifier 
      JOIN customer_info  ON customer_identifier.customer_id = customer_info.customer_id
    `);
    return customers;
  } catch (error) {
    throw new Error("sommthing");
  } finally {
    conn.release();
  }
}
async function getCustomerById(customerId) {
  const conn = await getConnection();
  try {
    const [customer] = await conn.query(
      `SELECT customer_identifier.customer_id, customer_identifier.customer_email, customer_identifier.customer_phone_number,
            customer_info.customer_first_name, customer_info.customer_last_name, 
             customer_info.active_customer_status
      FROM customer_identifier
      JOIN customer_info  ON customer_identifier.customer_id = customer_info.customer_id
      WHERE customer_identifier.customer_id = ?
    `,
      [customerId]
    );
    if (customer.length === 0) {
      throw new Error("Customer not found");
    }

    return customer[0];
  } catch (error) {
    throw new Error("somthing with wrong");
  } finally {
    conn.release();
  }
}
async function updateCustomer(customerId, customerData) {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();
    // Update customer_identifier
    // if (customerData.customer_hash) {
    //   const salt = await bcrypt.genSalt(10);
    //   const hashedPassword = await bcrypt.hash(
    //     customerData.customer_hash,
    //     salt
    // );
    await conn.query(
      "UPDATE customer_identifier SET customer_email = ?, customer_phone_number = ? WHERE customer_id = ?",
      [
        customerData.customer_email,
        customerData.customer_phone_number,

        customerId,
      ]
    );
    // Update customer_info
    await conn.query(
      "UPDATE customer_info SET customer_first_name = ?, customer_last_name = ?, active_customer_status = ? WHERE customer_id = ?",
      [
        customerData.customer_first_name,
        customerData.customer_last_name,
        customerData.active_customer_status,
        customerId,
      ]
    );

    await conn.commit();
    // === Return joined customer data ===
    return await getCustomerById(customerId);
  } catch (error) {
    await conn.rollback();

    throw error;
  } finally {
    conn.release();
  }
}
async function deleteCustomer(customerId) {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();
    // First delete from customer_vehicle_info
    await conn.query(
      "DELETE FROM customer_vehicle_info WHERE customer_id = ?",
      [customerId]
    );

    // First delete from customer_info
    await conn.query("DELETE  FROM customer_info WHERE customer_id = ?", [
      customerId,
    ]);
    // Then delete from customer_identifier
    const [result] = await conn.query(
      "DELETE  FROM customer_identifier WHERE customer_id = ?",
      [customerId]
    );
    await conn.commit();
    if (result.affectedRows > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    await conn.rollback();
    console.error("Error deleting customer:", error);
    throw error;
  } finally {
    conn.release();
  }
}
// searche
const searchCustomers = async (searchText) => {
  const conn = await getConnection();
  try {
    console.log("🔧 Searching with:", searchText);
    const sql = `
      SELECT 
        ci.customer_id, 
        ci.customer_email, 
        ci.customer_phone_number,
        info.customer_first_name, 
        info.customer_last_name, 
        info.active_customer_status
      FROM customer_identifier ci
      JOIN customer_info info ON ci.customer_id = info.customer_id
      WHERE CONCAT_WS(' ', info.customer_first_name, info.customer_last_name, 
                      ci.customer_email, ci.customer_phone_number) 
      LIKE ?
      LIMIT 20
    `;
    const [customers] = await conn.query(sql, [`%${searchText}%`]);
    return customers;
  } catch (error) {
    console.error("❌ SQL Error:", error);
    throw error;
  } finally {
    if (conn) conn.release?.();
  }
};


module.exports = {
  createCustomer,
  checkIfCustomerExist,
  getAllCustomers,
  getCustomerById,
  searchCustomers,
  updateCustomer,
  deleteCustomer,
};

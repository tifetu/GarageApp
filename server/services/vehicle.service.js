const { getConnection } = require("../config/db.config");

// function create
async function createVehicle(vehicleData) {
  const conn = await getConnection();
  try {
    // Log the vehicleData for debugging
    console.log("Vehicle Data:", vehicleData);

    // Validate customer_id
    if (!vehicleData.customer_id) {
      throw new Error("customer_id is required");
    }

    // Start transaction
    await conn.beginTransaction();

    // Check if customer exists in customer_identifier table
    const [customer] = await conn.query(
      "SELECT customer_id FROM customer_identifier WHERE customer_id = ?",
      [vehicleData.customer_id]
    );

    if (customer.length === 0) {
      throw new Error("Customer not found in customer_identifier table");
    }

    // Insert into customer_vehicle_info table
    const [result] = await conn.query(
      `INSERT INTO customer_vehicle_info(customer_id,vehicle_year,vehicle_make,vehicle_model,vehicle_type,vehicle_mileage,vehicle_tag,vehicle_serial, vehicle_color) VALUES(?,?,?,?,?,?,?,?,?)`,
      [
        vehicleData.customer_id,
        vehicleData.vehicle_year,
        vehicleData.vehicle_make,
        vehicleData.vehicle_model,
        vehicleData.vehicle_type,
        vehicleData.vehicle_mileage || 0,
        vehicleData.vehicle_tag,
        vehicleData.vehicle_serial,
        vehicleData.vehicle_color,
      ]
    );

    // Commit transaction
    await conn.commit();
    return {
      vehicle_id: result.insertId,
      vehicleData,
    };
  } catch (error) {
    await conn.rollback();
    console.error("Error creating vehicle:", error);
    throw error;
  } finally {
    conn.release();
  }
}
// get all vehicle
async function getAllVehicle(customerId) {
  const conn = await getConnection();
  try {
    // select data from database
    const [vehicle] = await conn.query(
      "SELECT * FROM customer_vehicle_info WHERE customer_id = ?",
      [customerId]
    );
    return vehicle;
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw error;
  } finally {
    conn.release();
  }
}

async function getVehicleBySerial(serial) {
  const conn = await getConnection();
  try {
    const [vehicle] = await conn.query(
      "SELECT *FROM customr_vehicle_info WHERE vehicle_serial=?",
      [serial]
    );
    return vehicle;
  } catch (error) {
    throw new Error("something was wrong");
  } finally {
    conn.release();
  }
}
// Get vehicle by ID
async function getVehicleById(vehicleId) {
  const conn = await getConnection();
  try {
    const [vehicle] = await conn.query(
      `SELECT * FROM customer_vehicle_info WHERE vehicle_id = ?`,
      [vehicleId]
    );

    if (vehicle.length === 0) {
      throw new Error("Vehicle not found");
    }

    return vehicle[0];
  } catch (error) {
    console.error("Error fetching vehicle:", error.message);
    throw error;
  } finally {
    conn.release();
  }
  
}

// Update vehicle
async function updateVehicle(vehicleId, vehicleData) {
  const conn = await getConnection();
  try {
    await conn.beginTransaction();
    // Step 1: Check if the vehicle exists
    const [checkRows] = await conn.query(
      "SELECT vehicle_id FROM customer_vehicle_info WHERE vehicle_id = ?",
      [vehicleId]
    );

    if (checkRows.length === 0) {
      throw new Error("Vehicle not found");
    }
    // Step 2: Update the vehicle information
    const [result] = await conn.query(
      `UPDATE customer_vehicle_info SET
        vehicle_year = ?,
        vehicle_make = ?,
        vehicle_model = ?,
        vehicle_type = ?,
        vehicle_mileage = ?,
        vehicle_tag = ?,
        vehicle_serial = ?,
        vehicle_color = ?
       WHERE vehicle_id = ?`,
      [
        vehicleData.vehicle_year,
        vehicleData.vehicle_make,
        vehicleData.vehicle_model,
        vehicleData.vehicle_type,
        vehicleData.vehicle_mileage,
        vehicleData.vehicle_tag,
        vehicleData.vehicle_serial,
        vehicleData.vehicle_color,
        vehicleId,
      ]
    );

    // Fix: result.affectedRows is the correct way to check for update success
    if (result.affectedRows === 0) {
      throw new Error("Vehicle not found");
    }

    await conn.commit();
    return await getVehicleById(vehicleId);
  } catch (error) {
    await conn.rollback();
    console.error("Error updating vehicle:", error.message);
    throw error;
  } finally {
    conn.release();
  }
}

// export function
module.exports = {
  createVehicle,
  getAllVehicle,
  getVehicleBySerial,
  getVehicleById,
  updateVehicle,
};

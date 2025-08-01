const { getConnection } = require("../config/db.config");

// function create
async function createVehicle(vehicleData) {
  const conn = await getConnection();
  try {
    console.log("Vehicle Data:", vehicleData);

    // Validate required fields
    const requiredFields = [
      "customer_id",
      "vehicle_year",
      "vehicle_make",
      "vehicle_model",
      "vehicle_tag",
      "vehicle_serial",
      "vehicle_color",
    ];

    const missingFields = requiredFields.filter((field) => !vehicleData[field]);
    if (missingFields.length > 0) {
      throw new Error(`Missing required fields: ${missingFields.join(", ")}`);
    }

    // Validate field types
    if (isNaN(vehicleData.vehicle_year)) {
      throw new Error("vehicle_year must be a number");
    }

    if (vehicleData.vehicle_mileage && isNaN(vehicleData.vehicle_mileage)) {
      throw new Error("vehicle_mileage must be a number");
    }

    // Start transaction
    await conn.beginTransaction();

    // Check if customer exists
    const [customer] = await conn.query(
      "SELECT customer_id FROM customer_identifier WHERE customer_id = ?",
      [vehicleData.customer_id]
    );

    if (customer.length === 0) {
      throw new Error("Customer not found");
    }

    // Insert vehicle
    const [result] = await conn.query(
      `INSERT INTO customer_vehicle_info(
        customer_id,
        vehicle_year,
        vehicle_make,
        vehicle_model,
        vehicle_type,
        vehicle_mileage,
        vehicle_tag,
        vehicle_serial,
        vehicle_color
      ) VALUES(?,?,?,?,?,?,?,?,?)`,
      [
        vehicleData.customer_id,
        parseInt(vehicleData.vehicle_year),
        vehicleData.vehicle_make,
        vehicleData.vehicle_model,
        vehicleData.vehicle_type || null,
        vehicleData.vehicle_mileage ? parseInt(vehicleData.vehicle_mileage) : 0,
        vehicleData.vehicle_tag,
        vehicleData.vehicle_serial,
        vehicleData.vehicle_color,
      ]
    );

    await conn.commit();

    return {
      success: true,
      vehicle_id: result.insertId,
      message: "Vehicle created successfully",
    };
  } catch (error) {
    await conn.rollback();
    console.error("Error creating vehicle:", error);

    // Return error information
    return {
      success: false,
      error: error.message,
      message: "Failed to create vehicle",
    };
  } finally {
    if (conn) conn.release();
  }
}
// get all vehicle
async function getVehiclesByCustomerId(customerId) {
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
      "SELECT * FROM customer_vehicle_info WHERE vehicle_serial = ?",
      [serial]
    );
    return vehicle;
  } catch (error) {
    console.error("Error fetching vehicle by serial:", error);
    throw new Error("Error fetching vehicle by serial number");
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
  getVehiclesByCustomerId,
  getVehicleBySerial,
  getVehicleById,
  updateVehicle,
};

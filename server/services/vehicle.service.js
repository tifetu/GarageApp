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

// export function
module.exports = { createVehicle };

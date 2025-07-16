// import * as dbconfig from "../confige/db.confige.js";
const dbconfig = require("../config/db.config.js");
const { StatusCodes } = require("http-status-codes");

// function to create a new customer
const createCustomer = async (customerData) => {
  // assing customerData
  const {
    customer_first_name,
    customer_last_name,
    customer_email,
    customer_phone_number,
    vehicle_year,
    vehicle_make,
    vehicle_model,
    vehicle_type,
    vehicle_mileage,
    vehicle_tag,
    vehicle_serial,
    vehicle_color,
  } = customerData;
  // assum empty space
  const result = {};
  try {
    //  byccrypt email and phone
    const customerhash = await bycrypt.hash(
      customer_email + customer_phone_number,
      10
    );
    const conn = dbconfig.getConnection();
    // 1. Insert into customer_identifier
  } catch (error) {
    throw new Error("Error creating customer: " + error.message);
  }
};

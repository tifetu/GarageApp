const vehicleService = require("../services/vehicle.service");
const { StatusCodes } = require("http-status-codes");

// function of create vehicle on controller
// function of create vehicle on controller
async function createVehicle(req, res) {
  // Log the request body for debugging
  console.log("Request Body:", req.body);

  // Validate request body
  if (!req.body.customer_id) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "customer_id is required" });
  }

  try {
    const vehicle = await vehicleService.createVehicle(req.body);

    if (vehicle) {
      return res
        .status(StatusCodes.CREATED)
        .json({ message: "vehicle is created successfully", vehicle });
    } else {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "vehicle is not created" });
    }
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
// exports function
module.exports = { createVehicle };

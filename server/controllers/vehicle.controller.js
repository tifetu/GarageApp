const vehicleService = require("../services/vehicle.service");
const { StatusCodes } = require("http-status-codes");

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
// get vehicle
async function getAllVehicle(req, res) {
  try {
    const vehicle = await vehicleService.getAllVehicle(req.params.customerId);
    return res.status(StatusCodes.OK).json({ vehicle });
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
async function getVehicleBySerial(req, res) {
  try {
    const serial = await vehicleService.getVehicleBySerial();
  } catch (error) {}
}
async function getVehicleById(req, res) {
  try {
    const vehicle = await vehicleService.getVehicleById(req.params.vehicleId);
    return res.status(StatusCodes.OK).json(vehicle);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
async function updateVehicle(req, res) {
  try {
    const updatedVehicle = await vehicleService.updateVehicle(
      req.params.vehicleId,
      req.body
    );
    res.status(StatusCodes.OK).json(updatedVehicle);
  } catch (error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: error.message });
  }
}
// exports function
module.exports = {
  createVehicle,
  getAllVehicle,
  getVehicleBySerial,
  getVehicleById,
  updateVehicle,
};

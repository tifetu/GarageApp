const vehicleService = require("../services/vehicle.service");
const { StatusCodes } = require("http-status-codes");

// function of create vehicle on controller
async function createVehicle(req, res) {
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
async function getVehiclesByCustomerId(req, res) {
  try {
    const vehicle = await vehicleService.getVehiclesByCustomerId(
      req.params.customerId
    );
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
  getVehiclesByCustomerId,
  getVehicleBySerial,
  getVehicleById,
  updateVehicle,
};

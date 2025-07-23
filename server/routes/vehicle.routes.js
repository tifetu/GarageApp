// import expross
const express = require("express");
// router
const router = express.Router();
// import vehicle controller
const vehicleControllers = require("../controllers/vehicle.controller");

// vehcle routes
router.post("/add-vehicle", vehicleControllers.createVehicle);
router.get("/:customerId", vehicleControllers.getAllVehicle);
router.get("/:vehicleId", vehicleControllers.getVehicleById);
router.put("/:vehicleId", vehicleControllers.updateVehicle);
// export router
module.exports = router;

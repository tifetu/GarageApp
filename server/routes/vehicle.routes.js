// import expross
const express = require("express");
// router
const router = express.Router();
// import vehicle controller
const vehicleControllers = require("../controllers/vehicle.controller");

// vehcle routes
router.post("/add-vehicle", vehicleControllers.createVehicle);
// export router
module.exports = router;

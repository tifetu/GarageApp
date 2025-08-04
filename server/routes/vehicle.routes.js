// import expross
const express = require("express");
// router
const router = express.Router();
// import vehicle controller
const vehicleControllers = require("../controllers/vehicle.controller");
const authMiddleware = require("../middlewares/auth.middleware");
// vehcle routes
router.post(
  "/add-vehicle",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  vehicleControllers.createVehicle
);
router.get(
  "/customer/:customerId",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  vehicleControllers.getVehiclesByCustomerId
);
router.get(
  "/:vehicleId",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  vehicleControllers.getVehicleById
);
router.put(
  "/:vehicleId",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  vehicleControllers.updateVehicle
);
// export router
module.exports = router;

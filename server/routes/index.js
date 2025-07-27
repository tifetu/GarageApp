const express = require("express");
const installRoutes = require("./install.routes.js");
const employeeRoutes = require("./employee.routes.js");
const loginRoutes = require("./login.routes.js");
const customerRoutes = require("./customer.routes.js");
const vehicleRoutes = require("./vehicle.routes.js");
// const orderRoutes = require("./order.routes.js");
const router = express.Router();

// Use the install routes
router.use(installRoutes);
router.use("/api/employee", employeeRoutes);
// Use the login routes
router.use("/api/auth", loginRoutes);
// use customer routes
router.use("/api/customer", customerRoutes);
// use vehicle routes
router.use("/api/vehicle", vehicleRoutes);
// Use order routes
// router.use("/api/order", orderRoutes);
// Export the router
module.exports = router;

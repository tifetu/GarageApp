const express = require("express");
const installRoutes = require("./install.routes.js");
const employeeRoutes = require("./employee.routes.js");
const loginRoutes = require("./login.routes.js");
const router = express.Router();

// Use the install routes
router.use(installRoutes);
router.use(employeeRoutes);
// Use the login routes
router.use(loginRoutes);
// Export the router
module.exports = router;

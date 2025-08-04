// import employeeController from "../controllers/employee.controller.js";
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller.js");
// add auth middleware if needed
const authMiddleware = require("../middlewares/auth.middleware.js");
router.post(
  "/add-employee",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  employeeController.addEmployee
);
router.get(
  "/employees",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  employeeController.getEmployees
);
router.get(
  "/:id",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  employeeController.getEmployeeById
);
router.put(
  "/:id",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  employeeController.updateEmployee
);
router.delete(
  "/:id",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  employeeController.deleteEmployee
);
// router.get("/search-employees", employeeController.searchEmployees);
// Export the router
module.exports = router;

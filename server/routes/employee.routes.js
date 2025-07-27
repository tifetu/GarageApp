// import employeeController from "../controllers/employee.controller.js";
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller.js");
// add auth middleware if needed
const authMiddleware = require("../middlewares/auth.middleware.js");
router.post("/add-employee", employeeController.addEmployee);
router.get("/employees", employeeController.getEmployees);
router.get("/:id", employeeController.getEmployeeById);
router.put("/:id", employeeController.updateEmployee);
router.delete(
  "/:id",
  employeeController.deleteEmployee
);
// router.get("/search-employees", employeeController.searchEmployees);
// Export the router
module.exports = router;

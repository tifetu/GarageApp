// import employeeController from "../controllers/employee.controller.js";
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller.js");

router.post("/api/employee", employeeController.addEmployee);
router.get("/api/employees", employeeController.getEmployees);
router.get("/api/employee/:id", employeeController.getEmployeeById);
router.put("/api/employee/:id", employeeController.updateEmployee);
router.delete("/api/employee/:id", employeeController.deleteEmployee);
// router.get("/search-employees", employeeController.searchEmployees);
// Export the router
module.exports = router;

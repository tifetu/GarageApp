// import employeeController from "../controllers/employee.controller.js";
const express = require("express");
const router = express.Router();
const employeeController = require("../controllers/employee.controller.js");

router.post("/add-employee", employeeController.addEmployee);
router.get("/employees", employeeController.getEmployees);
router.get("/employee/:id", employeeController.getEmployeeById);
router.put("/employee/:id", employeeController.updateEmployee);
router.delete("/employee/:id", employeeController.deleteEmployee);
// router.get("/search-employees", employeeController.searchEmployees);
// Export the router
module.exports = router;

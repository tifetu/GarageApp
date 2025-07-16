// route
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller.js");
// add auth middleware if needed
const authMiddleware = require("../middlewares/auth.middleware.js");

// Create a new customer
router.post("/add-customer", authMiddleware, customerController.createCustomer);
// Get all customers
router.get("/customers", authMiddleware, customerController.getCustomers);
// Get a customer by ID
router.get("/customer/:id", authMiddleware, customerController.getCustomerById);
// Update a customer by ID
router.put("/customer/:id", authMiddleware, customerController.updateCustomer);
// Delete a customer by ID
router.delete(
  "/customer/:id",
  authMiddleware,
  customerController.deleteCustomer
);
// Search customers by name
router.get(
  "/search-customers",
  authMiddleware,
  customerController.searchCustomers
);

// export
module.exports = router;

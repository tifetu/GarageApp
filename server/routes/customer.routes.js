// route
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller.js");
// add auth middleware if needed
const authMiddleware = require("../middlewares/auth.middleware.js");

// Create a new customer
router.post("/add-customer", customerController.createCustomer);
// Get all customers
router.get("/customers", customerController.getAllCustomers);
// Get a customer by ID
router.get("/:customerId", customerController.getCustomerById);
// Update a customer by ID
router.put("/:customerId", customerController.updateCustomer);
// Delete a customer by ID
router.delete(
  "/:customerId",

  customerController.deleteCustomer
);
// Search customers by name
// router.get(
//   "/search-customers",
//   authMiddleware,
//   customerController.searchCustomers
// );

// export
module.exports = router;

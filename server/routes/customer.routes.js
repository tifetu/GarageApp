// route
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller.js");
// add auth middleware if needed
const authMiddleware = require("../middlewares/auth.middleware.js");

// Create a new customer
router.post(
  "/add-customer",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  customerController.createCustomer
);
// Get all customers
router.get(
  "/customers",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  customerController.getAllCustomers
);
// Get a customer by ID
router.get(
  "/:customerId",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  customerController.getCustomerById
);
// Update a customer by ID
router.put(
  "/:customerId",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  customerController.updateCustomer
);
// Delete a customer by ID
router.delete(
  "/:customerId",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],

  customerController.deleteCustomer
);
// Search customers by name
router.get(
  "/customer/search",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  customerController.searchCustomers
);

// export
module.exports = router;

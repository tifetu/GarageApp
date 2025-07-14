// route
const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller.js");

// Create a new customer
router.post("/api/add-customer", customerController.createCustomer);
// export
module.exports = router;

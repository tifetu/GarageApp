const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Order CRUD operations
router.post("/", orderController.createOrder);
router.get("/:orderId", orderController.getOrder);
router.put("/:orderId/status", orderController.updateStatus);
// Get all orders with pagination and filtering
router.get("/orders", orderController.getAllOrders);

module.exports = router;

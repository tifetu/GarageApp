const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth.middleware");

// Order CRUD operations
router.post(
  "/",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  orderController.createOrder
);
router.get(
  "/:orderId",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  orderController.getOrder
);
router.put(
  "/:orderId/status",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  orderController.updateStatus
);
// Get all orders with pagination and filtering
router.get(
  "/orders",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  orderController.getAllOrders
);

module.exports = router;

const express = require("express");

const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

const serviceController = require("../controllers/service.controller");

router.post(
  "/service",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  serviceController.createService
);

router.get(
  "/service",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  serviceController.getAllServices
);

router.get(
  "/service/:id",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  serviceController.getServiceById
);

router.put(
  "/service/",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  serviceController.updateService
);

router.delete(
  "/service/:id",
  // [authMiddleware.authMiddleware, authMiddleware.isAdmin],
  serviceController.deleteService
);

module.exports = router;

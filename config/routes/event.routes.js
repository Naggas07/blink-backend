const express = require("express");
const router = express.Router();

// models

const eventController = require("../../controllers/event.controller");

//middlewares
const authMiddleware = require("../../middlewares/auth.middleware");
const rolMiddleware = require("../../middlewares/rol.middleware");

// routes

router.post(
  "/new",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotUser,
  eventController.new
);

router.put(
  "/reserve/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  eventController.reserve
);

router.get("/list", authMiddleware.isAuthenticated, eventController.list);

module.exports = router;

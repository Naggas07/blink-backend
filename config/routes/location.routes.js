const express = require("express");
const router = express.Router();
const locationController = require("../../controllers/location.controller");

//middlewares
const authMiddleware = require("../../middlewares/auth.middleware");
const rolMiddleware = require("../../middlewares/rol.middleware");

//location

router.post(
  "/new/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  locationController.new
);

router.get(
  "/locations/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isAdmin,
  locationController.getLocations
);

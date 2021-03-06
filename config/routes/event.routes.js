const express = require("express");
const router = express.Router();

// models

const eventController = require("../../controllers/event.controller");

//middlewares
const authMiddleware = require("../../middlewares/auth.middleware");
const rolMiddleware = require("../../middlewares/rol.middleware");

//cloudinary
const upload = require("../cloudinary.config");

// routes

router.post(
  "/new",
  authMiddleware.isAuthenticated,
  upload.single("image"),
  eventController.new
);

router.put(
  "/reserve/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  eventController.reserve
);

router.get("/list", authMiddleware.isAuthenticated, eventController.list);

router.put(
  "/unsuscribe/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  eventController.unsuscribe
);

router.get(
  "/user/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  eventController.userEvents
);

router.delete(
  "/delete/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotUser,
  eventController.delete
);

router.get("/:id", authMiddleware.isAuthenticated, eventController.eventDetail);

router.post(
  "/locations",
  authMiddleware.isAuthenticated,
  eventController.getEventsByFilters
);

router.get(
  "/users/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotUser,
  eventController.getEventUsers
);

router.get(
  "/search/:name",
  authMiddleware.isAuthenticated,
  eventController.searchName
);

router.get(
  "/business/:id",
  authMiddleware.isAuthenticated,
  eventController.businessEvents
);

module.exports = router;

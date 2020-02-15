const express = require("express");
const router = express.Router();

// models

const followController = require("../../controllers/follow.controller");

//middlewares
const authMiddleware = require("../../middlewares/auth.middleware");
const rolMiddleware = require("../../middlewares/rol.middleware");

// routes

router.get(
  "/userFollows",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  followController.follows
);

router.post(
  "/new",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  followController.follow
);

module.exports = router;

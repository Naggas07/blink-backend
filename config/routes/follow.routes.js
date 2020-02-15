const express = require("express");
const router = express.Router();

// models

const followController = require("../../controllers/follow.controller");

//middlewares
const authMiddleware = require("../../middlewares/auth.middleware");
const rolMiddleware = require("../../middlewares/rol.middleware");

// routes

router.get(
  "/userFollows/:id",
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

router.delete(
  "/delete/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  followController.unFollow
);

module.exports = router;

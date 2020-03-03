const express = require("express");
const router = express.Router();

// models

const topicController = require("../../controllers/topic.controller");

//middlewares
const authMiddleware = require("../../middlewares/auth.middleware");
const rolMiddleware = require("../../middlewares/rol.middleware");

// routes

router.post(
  "/new",
  authMiddleware.isAuthenticated,
  rolMiddleware.isAdmin,
  topicController.new
);

router.get("/list", authMiddleware.isAuthenticated, topicController.list);

router.put(
  "/update/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isAdmin,
  topicController.update
);

router.get(
  "/active",
  authMiddleware.isAuthenticated,
  topicController.getActiveTopics
);

module.exports = router;

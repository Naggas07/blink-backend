const express = require("express");
const router = express.Router();

// models

const commentController = require("../../controllers/comments.controllers");

//middlewares
const authMiddleware = require("../../middlewares/auth.middleware");
const rolMiddleware = require("../../middlewares/rol.middleware");

// routes

router.post("/new", authMiddleware.isAuthenticated, commentController.new);

router.put(
  "/update/:id",
  authMiddleware.isAuthenticated,
  commentController.update
);

router.delete(
  "/delete/:id",
  authMiddleware.isAuthenticated,
  commentController.delete
);

module.exports = router;

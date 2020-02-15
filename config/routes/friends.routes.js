const express = require("express");
const router = express.Router();
const friendController = require("../../controllers/friends.controller");

//middlewares
const authMiddleware = require("../../middlewares/auth.middleware");
const rolMiddleware = require("../../middlewares/rol.middleware");

//routes

router.post(
  "/new",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  friendController.createFriends
);

router.get(
  "/list/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  friendController.userFriends
);

router.put(
  "/update/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  friendController.updateFriends
);

router.get(
  "/pendings/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  friendController.pending
);

router.get(
  "/acepted/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isNotBussines,
  friendController.realFriends
);

module.exports = router;

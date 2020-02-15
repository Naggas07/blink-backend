const express = require("express");
const router = express.Router();
const controller = require("../controllers/base.controller");
const friendController = require("../controllers/friends.controller");

//middlewares
const authMiddleware = require("../middlewares/auth.middleware");
const rolMiddleware = require("../middlewares/rol.middleware");

router.get("/", controller.base);

//friend routes
router.post(
  "/friends/new",
  authMiddleware.isAuthenticated,
  friendController.createFriends
);

module.exports = router;

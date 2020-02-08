const express = require("express");
const router = express.Router();
const controller = require("../controllers/base.controller");
const userController = require("../controllers/user.controller");

//middlewares
const authMiddleware = require("../middlewares/auth.middleware");
const rolMiddleware = require("../middlewares/rol.middleware");

router.get("/", controller.base);

// user routes
router.post(
  "/user/register",
  authMiddleware.isNotAuthenticated,
  userController.create
);
router.post(
  "/user/login",
  authMiddleware.isNotAuthenticated,
  userController.login
);
router.post(
  "/user/logout",
  authMiddleware.isAuthenticated,
  userController.logout
);
router.get(
  "/users",
  authMiddleware.isAuthenticated,
  rolMiddleware.isAdmin,
  userController.getUsers
);
router.put(
  "/user/update/:id",
  authMiddleware.isAuthenticated,
  userController.updateUser
);

router.delete(
  "/user/delete/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isAdmin,
  userController.deleteUser
);

module.exports = router;

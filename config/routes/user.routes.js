const express = require("express");
const router = express.Router();
const userController = require("../../controllers/user.controller");

//middlewares
const authMiddleware = require("../../middlewares/auth.middleware");
const rolMiddleware = require("../../middlewares/rol.middleware");

//cloudinary
const upload = require("../cloudinary.config");

// user routes
router.post(
  "/register",
  authMiddleware.isNotAuthenticated,
  upload.single("avatar"),
  userController.create
);
router.post("/login", authMiddleware.isNotAuthenticated, userController.login);
router.post("/logout", authMiddleware.isAuthenticated, userController.logout);
router.get(
  "",
  authMiddleware.isAuthenticated,
  rolMiddleware.isAdmin,
  userController.getAllUsers
);

router.get(
  "/business",
  authMiddleware.isAuthenticated,
  userController.getBussiness
);

router.get("/users", authMiddleware.isAuthenticated, userController.getUsers);

router.put(
  "/update/:id",
  authMiddleware.isAuthenticated,
  upload.single("avatar"),
  userController.updateUser
);

router.delete(
  "/delete/:id",
  authMiddleware.isAuthenticated,
  rolMiddleware.isAdmin,
  userController.deleteUser
);

module.exports = router;

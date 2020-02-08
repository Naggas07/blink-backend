const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require('../controllers/user.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.get('/', controller.base);

// user routes
router.post('/user/register', authMiddleware.isNotAuthenticated, userController.create)
router.post('/user/login', authMiddleware.isNotAuthenticated, userController.login)
router.post('/user/logout', authMiddleware.isAuthenticated, userController.logout)
router.get('/users', authMiddleware.isAuthenticated, userController.getUsers)

module.exports = router;
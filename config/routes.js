const express = require('express');
const router = express.Router();
const controller = require('../controllers/base.controller');
const userController = require('../controllers/user.controller')

router.get('/', controller.base);
router.post('/register', userController.create)
router.post('/login', userController.login)
router.get('/users', userController.getUsers)

module.exports = router;
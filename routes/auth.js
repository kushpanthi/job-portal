const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const uploadMiddleware = require('../middleware/uploadMiddleware');
const authMiddleware = require('../middleware/authMiddleware');

//this is registration route
router.post('/register', uploadMiddleware, authController.register);
//login route
router.post('/login', authController.login);
router.get('/logout', authController.logout);
module.exports = router;

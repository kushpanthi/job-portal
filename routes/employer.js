
const express = require('express');
const router = express.Router();
const employerController = require('../controllers/employerController');
const authMiddleware = require('../middleware/authMiddleware'); // Middleware to ensure authentication

// Route to display the employer dashboard
router.get('/dashboard', authMiddleware, employerController.dashboard);

module.exports = router;

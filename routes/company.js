// routes/company.js
const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to render the company registration form
router.get('/register', authMiddleware, companyController.renderRegisterForm);

// Route to handle company registration form submission
router.post('/register', authMiddleware, companyController.registerCompany);

module.exports = router;

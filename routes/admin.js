const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const authMiddleware = require('../middleware/authMiddleware');

// Admin dashboard
router.get('/dashboard', authMiddleware, adminController.renderAdminDashboard);

// User management
router.get('/users', authMiddleware, adminController.viewUsers); // Make sure `viewUsers` is defined
router.post('/users/:userId/edit', authMiddleware, adminController.editUser);
router.post('/users/:userId/delete', authMiddleware, adminController.deleteUser);

// Company management
router.get('/companies', authMiddleware, adminController.viewCompanies); // Make sure `viewCompanies` is defined
router.post('/companies/:companyId/delete', authMiddleware, adminController.deleteCompany);

// Job management
router.get('/jobs', authMiddleware, adminController.viewJobs); // Make sure `viewJobs` is defined
router.post('/jobs/:jobId/delete', authMiddleware, adminController.deleteJob);

module.exports = router;

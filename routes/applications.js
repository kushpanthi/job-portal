const express = require('express');
const router = express.Router();
const applicationController = require('../controllers/applicationController');
const authMiddleware = require('../middleware/authMiddleware');

// Apply for a job
router.post('/apply/:jobId', authMiddleware, applicationController.applyForJob);

// Manage applications in Job Dashboard
router.get('/employer/applications/:jobId', authMiddleware, applicationController.getApplicationsForJob);

// Approve, Reject, or Delete application
router.post('/applications/:applicationId/approve', authMiddleware, applicationController.approveApplication);
router.post('/applications/:applicationId/reject', authMiddleware, applicationController.rejectApplication);
router.post('/applications/:applicationId/delete', authMiddleware, applicationController.deleteApplication);

module.exports = router;

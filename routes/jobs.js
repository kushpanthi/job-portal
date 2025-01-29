// routes/job.js
const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to render the job dashboard for a specific company
router.get('/company/:companyId/jobs', authMiddleware, jobController.renderJobDashboard);

// Route to handle job creation from the job dashboard
router.post('/company/:companyId/jobs/create', authMiddleware, jobController.createJob);

module.exports = router;

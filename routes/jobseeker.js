// routes/jobseeker.js
const express = require('express');
const router = express.Router();
const jobseekerController = require('../controllers/jobseekerController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to get all job listings for job seekers
router.get('/jobseeker/dashboard', authMiddleware, jobseekerController.getJobListings);

// Route to apply for a job
router.post('/apply/:jobId', authMiddleware, jobseekerController.applyForJob);

module.exports = router;

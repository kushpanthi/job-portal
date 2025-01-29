const { Job, Company, Application } = require('../models');

// Fetch all job listings and user's applications
const getJobListings = async (req, res) => {
  try {
    // The `req.userId` is set by the auth middleware
    const userId = req.userId;

    if (!userId) {
      return res.redirect('/login');
    }

    console.log("User ID: " + userId); // Debugging: Verify that the userId is correctly set

    // Fetch all available jobs with associated company information
    const jobs = await Job.findAll({
      attributes: ['id', 'jobTitle', 'jobDescription', 'location', 'jobType', 'salary', 'postingDate', 'expiryDate', 'companyId'],
      include: { model: Company, attributes: ['companyName'] },
    });

    // Fetch all applications made by the logged-in user
    const userApplications = await Application.findAll({
      where: { userId },
      attributes: ['jobId', 'status'], // Fetch jobId and status
    });

    // Create a map of jobId -> application status for easy access in the view
    const appliedJobs = userApplications.reduce((acc, application) => {
      acc[application.jobId] = application.status;
      return acc;
    }, {});

    // Render the dashboard with jobs and applied jobs info
    res.render('jobseekerDashboard', { jobs, appliedJobs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching job listings' });
  }
};

// Handle job application
const applyForJob = async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const userId = req.userId; // Get the logged-in user's ID from middleware

    // Check if the user has already applied for the job
    const existingApplication = await Application.findOne({ where: { userId, jobId } });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job' });
    }

    // Create a new application with a default status of "pending"
    await Application.create({ userId, jobId, status: 'Pending' });

    res.redirect('/jobseeker/dashboard'); // Redirect back to the dashboard
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error applying for job' });
  }
};

module.exports = { getJobListings, applyForJob };

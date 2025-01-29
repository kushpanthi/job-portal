const { Application, Job, User, Company } = require('../models');

// Render Job Dashboard with Create Job Form and Job Listings
exports.renderJobDashboard = async (req, res) => {
  try {
    const companyId = req.params.companyId; // Extracting companyId from the route parameter

    // Fetch the company details using the correct companyId
    const company = await Company.findOne({
      where: { companyId }, // Querying by companyId
    });

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    // Fetch jobs associated with this company
    const jobs = await Job.findAll({
      where: { companyId },
    });

    // Fetch applications for the jobs associated with the company
    const applications = await Application.findAll({
      where: { jobId: jobs.map(job => job.id) }, // Fetch applications for jobs under this company
      include: [
        { model: User, attributes: ['name', 'email', 'validDocument'] }, // Include User (applicant) details
        { model: Job, attributes: ['jobTitle'] }, // Include Job details
      ],
    });

    // Render the job dashboard with company, jobs, and applications
    res.render('jobDashboard', { company, jobs, applications });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error loading job dashboard' });
  }
};

// Handle Job Creation
exports.createJob = async (req, res) => {
  try {
    const { companyId } = req.params;
    const { jobTitle, jobDescription, salary, location, jobType, postingDate, expiryDate } = req.body;

    // Create a new job for the specified company
    await Job.create({
      companyId,
      jobTitle,
      jobDescription,
      salary,
      location,
      jobType,
      postingDate,
      expiryDate,
    });

    // Redirect to job dashboard to see the updated job listings
    res.redirect(`/company/${companyId}/jobs`);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating job' });
  }
};

const { Application, Job, User } = require('../models');

// Apply for a Job
exports.applyForJob = async (req, res) => {
  try {
    const { jobId } = req.params;
    const userId = req.userId; // Set by authMiddleware

    // Check if the user has already applied
    const existingApplication = await Application.findOne({ where: { userId, jobId } });
    if (existingApplication) {
      return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    // Create a new application
    await Application.create({ userId, jobId });
    res.redirect('/jobseeker/dashboard'); // Redirect to jobseeker dashboard
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error applying for job.' });
  }
};

// Get Applications for a Job (Employer View)
exports.getApplicationsForJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    const applications = await Application.findAll({
      where: { jobId },
      include: [
        { model: User, attributes: ['name', 'email', 'validDocument'] },
        { model: Job, attributes: ['jobTitle'] },
      ],
    });

    res.render('jobDashboard', { applications }); // Render applications in job dashboard
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching applications.' });
  }
};

// Approve Application
exports.approveApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    await Application.update({ status: 'Approved' }, { where: { id: applicationId } });
    res.redirect('back'); // Reload page
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error approving application.' });
  }
};

// Reject Application
exports.rejectApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    await Application.update({ status: 'Rejected' }, { where: { id: applicationId } });
    res.redirect('back'); // Reload page
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error rejecting application.' });
  }
};

// Delete Application
exports.deleteApplication = async (req, res) => {
  try {
    const { applicationId } = req.params;
    await Application.destroy({ where: { id: applicationId } });
    res.redirect('back'); // Reload page
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting application.' });
  }
};

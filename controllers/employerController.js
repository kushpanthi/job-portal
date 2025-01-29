const { Company } = require('../models');

// Render the Employer Dashboard
exports.dashboard = async (req, res) => {
  try {
    const employerId = req.userId; // Assume userId is available from auth middleware
    
    // Fetch all companies registered by this employer
    const companies = await Company.findAll({ where: { userId: employerId } });
    
    // Render the employer dashboard with the list of companies
    res.render('employerDashboard', { companies });    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error loading dashboard' });
  }
};

const { Company, Job } = require('../models');

// Render the Company Registration Form
exports.renderRegisterForm = (req, res) => {
  res.render('companyRegister'); // Render the form for registering a new company
};

// Handle Company Registration Form Submission
exports.registerCompany = async (req, res) => {
  try {
    const { companyName, address, contactInfo } = req.body;
    const userId = req.userId; // Employer's userId from the auth middleware

    // Register a new company for the employer
    await Company.create({
      userId, // Associate the company with the logged-in employer's userId
      companyName,
      address,
      contactInfo
    });

    // Redirect back to the employer dashboard after registration
    res.redirect('/employer/dashboard');
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Render the Job Management Page for a Specific Company
// exports.manageJobs = async (req, res) => {
//   try {
//     const { companyId } = req.params;

//     // Fetch the company along with its jobs
//     const company = await Company.findByPk(companyId, {
//       include: Job
//     });

//     // Ensure the company belongs to the logged-in employer
//     if (!company || company.userId !== req.userId) {
//       return res.status(403).json({ message: 'Unauthorized access' });
//     }

//     res.render('jobManagement', { company }); // Render job management page with company and job data
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

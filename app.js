// app.js
const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
dotenv.config();

// Set EJS as the view engine
app.set('view engine', 'ejs');

// Middleware to parse URL-encoded form data (for form submissions)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
// Import routes and controllers
const authRoutes = require('./routes/auth'); // For handling registration and login
const authController = require('./controllers/authController'); // Contains registration and login logic
const employerRoutes = require('./routes/employer'); // For handling employer actions
const companyRoutes = require('./routes/company'); // For handling company actions
const jobRoutes = require('./routes/jobs'); // For handling job actions
const jobseekerRoutes = require('./routes/jobseeker'); // For handling jobseeker actions
const applicationRoutes = require('./routes/applications'); // For handling applications
const adminRoutes = require('./routes/admin'); // For handling admin actions

app.get('/', (req, res) => {
  res.render('home'); 
});
// Routes to render registration and login forms
app.get('/register', (req, res) => {
  res.render('register'); // Renders the register.ejs form
});

app.get('/login', (req, res) => {
  res.render('login'); // Renders the login.ejs form
});
app.get('/logout', authController.logout);

//using routes
app.use('/auth', authRoutes); // Routes for handling auth actions (register and login)
app.use('/employer', employerRoutes); // Routes for handling employer actions
app.use('/company', companyRoutes); // Routes for handling company actions
app.use('/employer', employerRoutes); // Routes for handling employer actions
app.use('/', jobRoutes); // Routes for handling job actions
app.use('/', jobseekerRoutes); // Routes for handling jobseeker actions
app.use('/', applicationRoutes); // Routes for handling applications
app.use('/admin', adminRoutes); // Routes for handling admin actions
app.use('/public', express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' folder
// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  
});

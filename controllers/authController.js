const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");
require("dotenv").config();

// Registration function
exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
      validDocument: req.file ? req.file.path : null, // Adjusts for file uploads if applicable
    });

    res.render("login", { message: "Registration successful. Please log in." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login function
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    // Set token as an HTTP-only cookie
    res.cookie('token', token, { httpOnly: true, maxAge: 60 * 60 * 1000 }); // Expires in 1 hour

    // Redirect based on user role
    if (user.role === 'Employer') {
      res.redirect("/employer/dashboard");
    
    } else if (user.role === 'Admin') {
      res.redirect("/admin/dashboard");
    } else {
      res.redirect("/jobseeker/dashboard");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
exports.logout = (req, res) => {
  res.clearCookie('token');
  res.redirect('/login'); // Redirect to login page after logout
};
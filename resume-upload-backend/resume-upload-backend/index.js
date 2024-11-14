// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { sendJobNotification } = require('./emailSender'); // Import the email sending function
const User = require('./models/User'); // User model for storing users
const uploadRoutes = require('./routes/upload'); // Import the upload route

// Initialize dotenv for environment variable management
dotenv.config(); 

// Create express app
const app = express();

// Set the port for the app (either from environment variable or default to 3002)
const PORT = process.env.PORT || 3001; 

// Middleware to parse incoming requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve uploaded files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to MongoDB using the URI from the .env file or a fallback to localhost
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/resumeDB';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process if MongoDB connection fails
  });

// POST route for user signup
app.post('/auth/signup', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save the new user in the database
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Trigger the job notification email after successful signup
    sendJobNotification(email, { // Example job details
      title: 'Software Engineer',
      company: 'ABC Corp',
      location: 'New York',
    });

    // Send success response with a message and email
    res.status(201).json({ message: 'Signup successful', email });

  } catch (error) {
    console.error('Error during signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to handle file uploads
app.use('/upload', uploadRoutes); // Use uploadRoutes to handle file uploads

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

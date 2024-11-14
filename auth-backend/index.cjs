const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.cjs'); // Import auth routes
require('dotenv').config();
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const app = express();
const PORT = 3002;
const MONGODB_URI = 'mongodb://localhost:27017/jobboard'; // Replace with your MongoDB connection string

// Middleware
app.use(cors());
app.use(express.json());


// Database connection
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    res.status(500).json({ message: 'Database connection failed' });
  });


// Routes
app.use('/auth', authRoutes);

app.listen(PORT, () => {
  console.log(`Auth backend running on http://localhost:${PORT}`);
});

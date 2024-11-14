const express = require('express');
const multer = require('multer');
const path = require('path');
const Resume = require('../models/resume'); // Correctly import your Resume model
const nodemailer = require('nodemailer'); // Import Nodemailer

const router = express.Router();

// Configure multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the directory to save the files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to avoid name conflicts
  },
});

const upload = multer({ storage });

// Create a transporter object using your SMTP configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // For Gmail SMTP
  port: 587, // SMTP port (587 is common for Gmail)
  secure: false, // Use false for port 587, true for port 465
  auth: {
    user: 'jobboard06@gmail.com', // Your email address
    pass: 'yvvv wojm semi yrug', // Use App Password for Gmail (not your regular password)
  },
});

// Function to send a job application notification email
const sendJobNotification = (applicantEmail, jobDetails) => {
  const mailOptions = {
    from: 'jobboard06@gmail.com', // Sender address
    to: 'sridharans592@gmail.com', // Recipient address (applicant email)
    subject: `Job Application for ${jobDetails.title}`, // Job title as the subject
    text: `Dear Applicant,\n\nYour application for the ${jobDetails.title} at ${jobDetails.company} has been successfully submitted!\n\nDetails:\nCompany: ${jobDetails.company}\nPosition: ${jobDetails.title}\nLocation: ${jobDetails.location}\n\nThank you for applying!\n\nBest regards,\nThe Team`, // Email body
  };

  // Send the email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.error('Error occurred while sending email:', error);
    }
    console.log('Job application email sent:', info.response);
  });
};

// Upload route for resume
router.post('/', upload.single('resume'), async (req, res) => {
  try {
    const resume = new Resume({
      filename: req.file.originalname,
      filepath: req.file.path,
    });
    await resume.save();

    // Get job details and applicant email from the request body
    const jobDetails = req.body.jobDetails; // Job details should come from the request body
    const applicantEmail = req.body.applicantEmail; // Applicant's email for notifications

    if (jobDetails && applicantEmail) {
      // Send email about job application success
      sendJobNotification(applicantEmail, jobDetails);
    } else {
      console.error("Job details or applicant email missing in request body.");
    }

    res.status(201).json({
      message: 'Resume uploaded successfully, email sent to the job board.',
      resume,
    });
  } catch (error) {
    console.error("Error during resume upload:", error);
    res.status(500).json({ message: 'Failed to upload resume', error });
  }
});

module.exports = router;

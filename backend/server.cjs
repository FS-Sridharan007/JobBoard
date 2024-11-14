const express = require('express');
const { MongoClient, ObjectId } = require('mongodb');
const cors = require('cors');
const nodemailer = require('nodemailer');  // Import nodemailer
const multer = require('multer');          // Import multer
const path = require('path');             // Import path module

const app = express();
const PORT = process.env.PORT || 5000;
const uri = 'mongodb://localhost:27017/jobboard';  // Replace with your actual MongoDB connection string

app.use(cors());
app.use(express.json());

// Set up the email transporter (Replace with your email credentials)
const transporter = nodemailer.createTransport({
  service: 'gmail',  // Replace with your email service
  auth: {
    user: 'your-email@gmail.com',  // Replace with your email address
    pass: 'your-email-password',   // Replace with your email password (or use an app password if 2FA is enabled)
  },
});

// Function to send email notifications
const sendEmailNotification = (userEmail, subject, message) => {
  const mailOptions = {
    from: 'your-email@gmail.com',  // Replace with your email address
    to: userEmail,                // Recipient's email
    subject: subject,             // Email subject
    text: message,                // Email message body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log('Error sending email:', error);
    } else {
      console.log('Email sent:', info.response);
    }
  });
};

// Set up multer for handling file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');  // Save files in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Use timestamp for unique filenames
  },
});

const upload = multer({ storage });

// Endpoint to get all jobs
app.get('/api/jobs', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('jobboard');
    const jobs = database.collection('jobs');
    
    const jobList = await jobs.find({}).toArray();
    res.json(jobList);
  } catch (error) {
    console.error('Error fetching job listings:', error);
    res.status(500).send('Error fetching job listings');
  } finally {
    await client.close();
  }
});

// Endpoint to get job details by jobId
app.get('/api/jobdetails/:jobId', async (req, res) => {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('jobboard');
    const jobDetails = database.collection('jobs');

    const jobDetail = await jobDetails.findOne({ _id: new ObjectId(req.params.jobId) });
    
    if (!jobDetail) {
      return res.status(404).send('Job detail not found');
    }

    res.json(jobDetail);
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).send('Error fetching job details');
  } finally {
    await client.close();
  }
});

// Endpoint to search jobs by title, location, and category
app.get('/api/jobs/search', async (req, res) => {
  const client = new MongoClient(uri);
  const { jobTitle, location, categoryId } = req.query;

  try {
    await client.connect();
    const database = client.db('jobboard');
    const jobs = database.collection('jobs');

    const query = {};

    if (jobTitle) query.title = { $regex: jobTitle, $options: 'i' };
    if (location) query.location = { $regex: location, $options: 'i' };
    if (categoryId) query.categoryId = new ObjectId(categoryId);

    const matchingJobs = await jobs.find(query).toArray();

    res.json(matchingJobs);
  } catch (error) {
    console.error('Error searching jobs:', error);
    res.status(500).send('Error searching jobs');
  } finally {
    await client.close();
  }
});

// Endpoint to get jobs by categoryId
app.get('/api/jobs/category/:categoryId', async (req, res) => {
  const client = new MongoClient(uri);
  const { categoryId } = req.params;

  try {
    await client.connect();
    const database = client.db('jobboard');
    const jobs = database.collection('jobs');

    const objectCategoryId = new ObjectId(categoryId);

    const jobList = await jobs.find({ categoryId: objectCategoryId }).toArray();

    if (jobList.length === 0) {
      return res.status(404).json({ message: 'No jobs found for this category.' });
    }

    res.json(jobList);
  } catch (error) {
    console.error('Error fetching jobs by category:', error);
    res.status(500).send('Error fetching jobs');
  } finally {
    await client.close();
  }
});

// Endpoint for resume upload (Handle file upload with multer)
app.post('/api/upload-resume', upload.single('resume'), async (req, res) => {
  const { userEmail } = req.body;

  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  // Send an email to notify the user about the successful upload
  sendEmailNotification(
    userEmail,
    'Resume Upload Successful',
    'Your resume has been successfully uploaded and is under review. We will notify you if a suitable job is available.'
  );

  res.status(200).send('Resume uploaded successfully and email notification sent.');
});

// Example of a job application status update
app.put('/api/job-application-status/:applicationId', async (req, res) => {
  const { applicationId } = req.params;
  const { status, userEmail, jobTitle } = req.body;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('jobboard');
    const applications = database.collection('applications');

    const updateResult = await applications.updateOne(
      { _id: new ObjectId(applicationId) },
      { $set: { status } }
    );

    if (updateResult.matchedCount === 0) {
      return res.status(404).send('Application not found');
    }

    // Send an email notifying the user about the status update
    sendEmailNotification(
      userEmail,
      `Your Application Status for ${jobTitle}`,
      `Dear User, your application status for the job titled "${jobTitle}" has been updated to: ${status}.`
    );

    res.status(200).send('Application status updated and notification sent');
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).send('Error updating application status');
  } finally {
    await client.close();
  }
});

// Example of a job post and email notification
app.post('/api/job-post', async (req, res) => {
  const { jobTitle, employerEmail } = req.body;

  const client = new MongoClient(uri);
  try {
    await client.connect();
    const database = client.db('jobboard');
    const jobs = database.collection('jobs');

    const newJob = {
      title: jobTitle,
      employerEmail,
      // other job details...
    };

    await jobs.insertOne(newJob);

    // Send an email to the employer confirming the job post
    sendEmailNotification(
      employerEmail,
      'Job Posted Successfully',
      `Your job titled "${jobTitle}" has been successfully posted on the platform.`
    );

    res.status(200).send('Job posted and email notification sent');
  } catch (error) {
    console.error('Error posting job:', error);
    res.status(500).send('Error posting job');
  } finally {
    await client.close();
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

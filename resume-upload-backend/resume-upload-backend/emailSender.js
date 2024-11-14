const nodemailer = require('nodemailer');

// Create a transporter object using your SMTP configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // For Gmail SMTP
  port: 587, // SMTP port (587 is common for Gmail)
  secure: false, // Use false for port 587, true for port 465
  auth: {
    user: 'jruzz10zero@gmail.com', // Your email address
    pass: 'pvag wavs sejp bzoq', // Use App Password for Gmail (not your regular password)
  },
});

// Function to send a job application notification email
const sendJobNotification = (applicantEmail, jobDetails) => {
  const mailOptions = {
    from: 'jruzz10zero@gmail.com', // Sender address
    to: applicantEmail, // Recipient address (applicant email)
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

// Export the sendJobNotification function so it can be used in other files
module.exports = { sendJobNotification };

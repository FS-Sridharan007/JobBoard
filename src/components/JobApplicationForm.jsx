import React, { useState } from 'react';

const JobApplicationForm = () => {
  const [selectedResumeFile, setSelectedResumeFile] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');

  const handleFileChange = (e) => {
    setSelectedResumeFile(e.target.files[0]); // Set the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedResumeFile || !jobTitle || !companyName || !location || !applicantEmail) {
      alert("Please fill in all fields and select a resume.");
      return;
    }

    // Prepare the job application data
    const jobApplicationData = {
      resume: selectedResumeFile, // The file you are uploading
      jobDetails: {
        title: jobTitle,
        company: companyName,
        location: location,
      },
      applicantEmail: applicantEmail, // Applicant's email for notifications
    };

    // Create FormData to handle file uploads
    const formData = new FormData();
    formData.append("resume", selectedResumeFile);
    formData.append("jobDetails", JSON.stringify(jobApplicationData.jobDetails));
    formData.append("applicantEmail", applicantEmail);

    // Send the POST request
    try {
      const response = await fetch('/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        alert('Application submitted successfully!');
      } else {
        alert('Failed to submit application: ' + data.message);
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('An error occurred while submitting the application.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Job Title:</label>
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Enter job title"
        />
      </div>
      <div>
        <label>Company Name:</label>
        <input
          type="text"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          placeholder="Enter company name"
        />
      </div>
      <div>
        <label>Location:</label>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter job location"
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={applicantEmail}
          onChange={(e) => setApplicantEmail(e.target.value)}
          placeholder="Enter your email"
        />
      </div>
      <div>
        <label>Upload Resume:</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button type="submit">Apply for Job</button>
    </form>
  );
};

export default JobApplicationForm;

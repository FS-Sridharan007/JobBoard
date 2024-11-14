import React, { useState } from 'react';
import { motion } from 'framer-motion';

function HeroSection() {
  const [resume, setResume] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setResume(selectedFile);
      handleUpload(selectedFile); // Automatically upload the file after selection
    }
  };

  const handleUpload = async (file) => {
    const formData = new FormData();
    formData.append('resume', file);
    formData.append('applicantEmail', 'applicant@example.com'); // Replace with actual applicant email
    formData.append('jobDetails', JSON.stringify({
      title: 'Software Developer',
      company: 'TechCorp',
      location: 'New York, NY'
    }));

    try {
      const response = await fetch('http://localhost:3001/upload', { // Use updated backend API endpoint
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setMessage('Resume uploaded successfully! An email has been sent to the Job Board.');
        setResume(null); // Reset state or perform additional actions if needed
      } else {
        setMessage('Failed to upload resume. Please try again.');
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage('An error occurred while uploading the resume.');
    }
  };

  const fadeInOutVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 }
  };

  return (
    <motion.section
      className="bg-blue-100 py-20"
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={fadeInOutVariants}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="container mx-auto text-center px-6 md:px-20">
        <h1 className="text-4xl font-bold text-blue-900 mb-4">
          The Easiest Way to Get Your New Job
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Each month, more than 3 million job seekers turn to our site in their search for work,
          making over 140,000 applications every day.
        </p>
        
        <input 
          type="file" 
          accept=".pdf, .doc, .docx" 
          onChange={handleFileChange} 
          className="hidden" 
          id="resume-upload" 
        />
        
        <label htmlFor="resume-upload">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-green-700"
            onClick={() => document.getElementById('resume-upload').click()}
          >
            Upload Your Resume
          </motion.button>
        </label>

        {/* Display success or error message */}
        {message && (
          <p className="mt-4 text-xl text-green-600">{message}</p>
        )}
      </div>
    </motion.section>
  );
}

export default HeroSection;

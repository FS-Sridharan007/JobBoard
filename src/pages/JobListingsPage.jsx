// src/pages/JobListingsPage.jsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

function JobListingsPage() {
  const location = useLocation();
  const [jobs, setJobs] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Check if search parameters were provided (jobTitle, location)
  const { jobTitle, location: searchLocation } = location.state || {};

  // In your job listing page (All Jobs page)
const JobListing = ({ job }) => {
  const { jobId } = useParams();
  const isActiveJob = job._id === jobId; // Check if this job is the active one

  return (
    <div>
      <motion.div 
        className={`job-listing ${isActiveJob ? 'cursor-not-allowed opacity-50' : ''}`} 
        onClick={!isActiveJob ? () => navigate(`/job/${job._id}`) : null}
      >
        <h3>{job.title}</h3>
        {/* other job details */}
      </motion.div>
    </div>
  );
};


  useEffect(() => {
    // Fetch all jobs or only searched jobs based on search parameters
    if (jobTitle || searchLocation) {
      fetchSearchedJobs(jobTitle, searchLocation);
    } else {
      fetchAllJobs();
    }
  }, [jobTitle, searchLocation]);

  const fetchAllJobs = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/jobs');
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching all jobs:', error);
    }
  };

  const fetchSearchedJobs = async (title, location) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/jobs/search?jobTitle=${title}&location=${location}`
      );
      const data = await response.json();
      setJobs(data);
    } catch (error) {
      console.error('Error fetching searched jobs:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="p-8 bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen">
      <h2 className="text-4xl font-semibold text-blue-800 mb-6">
        {jobTitle || searchLocation ? 'Search Results' : 'Job Listings'}
      </h2>

      <ul className="space-y-6">
        {jobs.map((job, index) => (
          <motion.li
            key={job._id || index}
            className="p-6 bg-white rounded-xl shadow-lg"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <h3 className="text-2xl text-blue-800">{job.title}</h3>
            <p className="text-gray-500">{job.location}</p>
          </motion.li>
        ))}
      </ul>

      {jobs.length === 0 && (
        <p className="text-gray-600 mt-6">
          {isSearching ? 'Searching for jobs...' : 'No jobs found.'}
        </p>
      )}
    </div>
  );
}

export default JobListingsPage;

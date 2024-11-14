import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MyApplicationsPage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Simulating fetching job applications from a backend or API
    // Replace with actual data fetching logic
    setApplications([
      { id: 1, jobTitle: 'Software Developer', company: 'TechCorp', status: 'Applied' },
      { id: 2, jobTitle: 'Frontend Developer', company: 'WebSolutions', status: 'Interview' },
      { id: 3, jobTitle: 'UX Designer', company: 'DesignLab', status: 'Rejected' },
    ]);
  }, []);

  // Animation variants for the applications container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-400">
      <motion.div
        className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="p-8">
          <motion.h2 className="text-3xl font-bold text-gray-800 mb-6">My Applications</motion.h2>
          <motion.p className="text-gray-600 mb-4">View the status of your job applications below.</motion.p>

          <div className="space-y-4">
            {applications.length === 0 ? (
              <p className="text-gray-500">You haven't applied to any jobs yet.</p>
            ) : (
              applications.map((application) => (
                <div key={application.id} className="bg-gray-100 p-4 rounded-md shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-800">{application.jobTitle}</h3>
                  <p className="text-gray-600">Company: {application.company}</p>
                  <p className={`text-sm font-medium ${application.status === 'Rejected' ? 'text-red-500' : 'text-green-500'}`}>
                    Status: {application.status}
                  </p>
                  <Link
                    to={`/applications/${application.id}`}
                    className="text-blue-600 hover:text-blue-700 transition mt-2 inline-block"
                  >
                    View Details
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default MyApplicationsPage;

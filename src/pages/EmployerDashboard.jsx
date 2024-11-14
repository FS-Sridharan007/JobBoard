import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const EmployerDashboard = () => {
  const navigate = useNavigate();

  // Animation variants for the dashboard container
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
          <motion.h2 className="text-3xl font-bold text-gray-800 mb-6">Employer Dashboard</motion.h2>
          <motion.p className="text-gray-600 mb-4">
            Manage your job postings, company profile, and account settings below.
          </motion.p>

          <div className="space-y-4">
            <button
              onClick={() => navigate('/post job')}
              className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
            >
              Post a New Job
            </button>

            <button
              onClick={() => navigate('/my-jobs')}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              View My Job Postings
            </button>

            <button
              onClick={() => navigate('/account-settings')}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
            >
              Account Settings
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EmployerDashboard;

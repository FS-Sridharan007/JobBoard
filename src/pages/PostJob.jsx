// src/components/PostJob.jsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PostJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [location, setLocation] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [role, setRole] = useState('');
  const [jobType, setJobType] = useState('Full-time');
  const [salary, setSalary] = useState('');
  const [skills, setSkills] = useState('');
  const [applicationMethod, setApplicationMethod] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      jobTitle,
      companyName,
      location,
      jobDescription,
      role,
      jobType,
      salary,
      skills,
      applicationMethod,
    });

    // Reset form fields
    setJobTitle('');
    setCompanyName('');
    setLocation('');
    setJobDescription('');
    setRole('');
    setJobType('Full-time');
    setSalary('');
    setSkills('');
    setApplicationMethod('');
  };

  return (
    <motion.div
      className="max-w-2xl mx-auto my-10 p-6 bg-white rounded-lg shadow-lg"
      initial={{ opacity: 0, y: 50 }} // Starting state
      animate={{ opacity: 1, y: 0 }}   // Ending state
      transition={{ duration: 0.5 }}    // Animation duration
    >
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Job Title</label>
          <input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-black rounded-md p-2 focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Company Name</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="mt-1 block w-full border border-black rounded-md p-2 focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="mt-1 block w-full border border-black rounded-md p-2 focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Description</label>
          <textarea
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
            className="mt-1 block w-full border border-black rounded-md p-2 focus:ring-blue-300 focus:border-blue-300"
            rows="4"
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Role</label>
          <input
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            required
            className="mt-1 block w-full border border-black rounded-md p-2 focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Job Type</label>
          <select
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            className="mt-1 block w-full border border-black rounded-md p-2 focus:ring-blue-300 focus:border-blue-300"
          >
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Contract</option>
            <option>Freelance</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Salary Range</label>
          <input
            type="text"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            placeholder="e.g., $50,000 - $70,000"
            className="mt-1 block w-full border border-black rounded-md p-2 focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Required Skills</label>
          <input
            type="text"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            placeholder="e.g., JavaScript, React, Node.js"
            className="mt-1 block w-full border border-black rounded-md p-2 focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Application Method</label>
          <input
            type="text"
            value={applicationMethod}
            onChange={(e) => setApplicationMethod(e.target.value)}
            placeholder="e.g., Apply via company website or email to hr@company.com"
            className="mt-1 block w-full border border-black rounded-md p-2 focus:ring-blue-300 focus:border-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition duration-200"
        >
          Post Job
        </button>
      </form>
    </motion.div>
  );
};

export default PostJob;

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function JobDetailPage() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/api/jobdetails/${jobId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!job) return <div className="text-center">No job found.</div>;

  // Animation variants for page content
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full">
        <motion.h1
          className="text-4xl font-bold text-blue-800 mb-4 text-center"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.5 }}
        >
          {job.title}
        </motion.h1>
        <motion.p
          className="text-gray-600 text-center"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {job.location}
        </motion.p>
        <motion.p
          className="mt-4 text-gray-800 text-lg"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Description:
        </motion.p>
        <motion.p
          className="mt-2 text-gray-700"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {job.description}
        </motion.p>
        <motion.p
          className="mt-4 text-gray-700 text-lg"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Company: {job.company}
        </motion.p>
        <motion.p
          className="mt-2 text-gray-700 text-sm"
          initial="hidden"
          animate="visible"
          variants={itemVariants}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          Posted on: {new Date(job.postedDate).toLocaleDateString()}
        </motion.p>
        <div className="flex justify-center mt-6">
          <motion.button
            className="bg-blue-700 text-white px-6 py-3 rounded-full hover:bg-blue-800 transition duration-200"
            initial="hidden"
            animate="visible"
            variants={itemVariants}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Apply Now
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default JobDetailPage;

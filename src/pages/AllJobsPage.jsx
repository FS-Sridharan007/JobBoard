import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function AllJobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/jobs');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setJobs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="text-center">Loading jobs...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error}</div>;
  if (!jobs.length) return <div className="text-center">No jobs found.</div>;

  return (
    <div className="flex flex-col items-center p-8 bg-gradient-to-br from-blue-50 to-blue-200 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-center mb-6">All Job Listings</h1>
        {jobs.map((job) => (
          <motion.div
            key={job._id}
            className="bg-white p-4 mb-4 shadow-lg rounded-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={`/job/${job._id}`} className="text-blue-600 hover:underline">
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.location}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default AllJobsPage;

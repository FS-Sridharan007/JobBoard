import React from 'react';
import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';

function FeaturedJobs() {
  const jobs = [
    { title: 'React Native Web Developer', company: 'Percepta', location: 'New York, NY', salary: '$800' },
    { title: 'Senior System Engineer', company: 'Tesla', location: 'San Francisco, CA', salary: '$850' },
    { title: 'Frontend Developer', company: 'Amazon', location: 'San Diego, CA', salary: '$900' },
  ];

  // Variants for container and each card animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2, // Delay each card animation slightly
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 }, // Start off-screen
    visible: { opacity: 1, y: 0 }, // Fade in and move up into view
  };

  return (
    <section className="py-16 bg-blue-50">
      <h2 className="text-2xl font-bold text-center text-blue-800 mb-8">Jobs of the Day</h2>
      <InView triggerOnce>
        {({ inView, ref }) => (
          <motion.div
            ref={ref}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 md:px-16"
            variants={containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"} // Trigger the animation when in view
          >
            {jobs.map((job, index) => (
              <motion.div
                key={index}
                className="bg-white shadow-lg p-6 rounded-lg border border-blue-200 transition-transform duration-300"
                variants={cardVariants}
                whileHover={{ scale: 1.05 }} // Slightly scale on hover
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <h3 className="text-xl font-semibold text-blue-800">{job.title}</h3>
                <p className="text-gray-700">{job.company}</p>
                <p className="text-gray-500">{job.location}</p>
                <p className="text-blue-600 font-bold">{job.salary}</p>
                <button className="mt-4 bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-full shadow-md">
                  Apply Now
                </button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </InView>
    </section>
  );
}

export default FeaturedJobs;

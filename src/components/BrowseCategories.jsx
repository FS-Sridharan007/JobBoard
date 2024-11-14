import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBusinessTime, FaChartLine, FaHeadset, FaUserTie, FaLaptopCode, FaDollarSign, FaProjectDiagram, FaBullhorn } from 'react-icons/fa';

function BrowseCategories() {
  const navigate = useNavigate();
  
  const categories = [
    { name: 'Retail & Product', icon: <FaBusinessTime /> },
    { name: 'Content Writer', icon: <FaHeadset /> },
    { name: 'Human Resource', icon: <FaUserTie /> },
    { name: 'Market Research', icon: <FaChartLine /> },
    { name: 'Software', icon: <FaLaptopCode /> },
    { name: 'Finance', icon: <FaDollarSign /> },
    { name: 'Management', icon: <FaProjectDiagram /> },
    { name: 'Marketing & Sale', icon: <FaBullhorn /> },
  ];

  const [jobTitle, setJobTitle] = useState('');
  const [location, setLocation] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async () => {
    setIsSearching(true);
    try {
      // Navigate to JobListingsPage with search parameters
      navigate('/joblistings', { state: { jobTitle, location } });
    } catch (error) {
      console.error('Error with search:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleCategoryClick = (categoryName) => {
    // Trigger search with category as jobTitle
    navigate('/joblistings', { state: { jobTitle: categoryName, location } });
  };

  return (
    <section className="py-10 bg-gray-100">
      <motion.h2
        className="text-2xl font-bold text-center text-blue-800 mb-5"
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        transition={{ duration: 0.5 }}
      >
        Browse by Category
      </motion.h2>
      <motion.div
        className="flex justify-center gap-4 mb-8"
        initial="hidden"
        animate="visible"
        variants={itemVariants}
        transition={{ duration: 1.0 }}
      >
        <input
          type="text"
          value={jobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          placeholder="Job Title"
          className="px-4 py-2 rounded-md shadow-inner text-gray-800"
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Location"
          className="px-4 py-2 rounded-md shadow-inner text-gray-800"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-700 text-white px-6 py-2 rounded-md font-semibold shadow-lg"
          disabled={isSearching}
        >
          {isSearching ? 'Searching...' : 'Search'}
        </button>
      </motion.div>
      <motion.div
        className="grid grid-cols-2 md:grid-cols-4 gap-6 px-8 md:px-16"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {categories.map((category, index) => (
          <motion.button
            key={index}
            onClick={() => handleCategoryClick(category.name)} // Trigger search based on category click
            className="flex flex-col items-center bg-white shadow-lg p-6 rounded-lg text-center text-blue-700 hover:text-blue-900 transition-colors duration-200"
            variants={itemVariants}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <span className="text-3xl mb-2">{category.icon}</span>
            <span>{category.name}</span>
          </motion.button>
        ))}
      </motion.div>
    </section>
  );
}

export default BrowseCategories;

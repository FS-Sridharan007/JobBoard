import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  // Define animation variants
  const navItemVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.nav 
      className="bg-white/80 backdrop-blur-md shadow-lg p-4 flex items-center justify-between"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <Link to="/" className="text-3xl font-bold text-blue-800">Job Board</Link>
      <div className="flex space-x-6">
        <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.1 }}>
          <Link to="/" className="text-gray-700 hover:text-blue-800">Home</Link>
        </motion.div>
        <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.2 }}>
          <Link to="/jobs" className="text-gray-700 hover:text-blue-800">Find Jobs</Link>
        </motion.div>
        <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.3 }}>
          <Link to="/contact" className="text-gray-700 hover:text-blue-800">Contact</Link>
        </motion.div>
      </div>
      <div className="flex space-x-4">
        <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.4 }}>
          <Link to="/login" className="text-gray-700 hover:text-blue-800 px-4 py-2">Login</Link>
        </motion.div>
        <motion.div variants={navItemVariants} initial="hidden" animate="visible" transition={{ duration: 0.5, delay: 0.5 }}>
          <Link to="/post job" className="bg-blue-800 text-white px-4 py-2 rounded-full">Post Job</Link>
        </motion.div>
      </div>
    </motion.nav>
  );
}

export default Navbar;

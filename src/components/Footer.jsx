// src/components/Footer.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <motion.footer
      className="bg-gray-800 text-white text-center py-4"
      initial={{ opacity: 0, y: 20 }}  // Starting state
      animate={{ opacity: 1, y: 0 }}   // Ending state
      transition={{ duration: 0.5 }}    // Animation duration
    >
      <div className="container mx-auto">
        <p>© 2024 Job Board. All rights reserved.</p>
        <p>
          <a href="/privacy-policy" className="hover:underline">Privacy Policy</a> | 
          <a href="/terms-of-service" className="hover:underline">Terms of Service</a>
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;

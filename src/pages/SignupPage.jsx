import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaFacebook, FaApple } from 'react-icons/fa';
import google from '../assets/google.png';
import bgImage from '../assets/image3.png';
import { motion } from 'framer-motion';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password } = formData; // Make sure name is in formData
  
    try {
      // Sending signup data to the backend
      const response = await fetch('http://localhost:3002/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }), // Include name in the body
      });
  
      if (response.ok) {
        alert('Signup successful!');
        navigate('/login'); // Redirect to login page
      } else {
        const errorMessage = await response.json();
        setError(errorMessage.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error(err);
    }
  };
  
  
  // Animation variants (no change to styling or animation logic)
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  const imageVariants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-cyan-50 to-blue-300">
      <motion.div
        className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl h-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="hidden lg:flex lg:w-1/2 lg:h-full items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <img src={bgImage} alt="Signup Illustration" className="w-auto h-3/4 object-contain flex-shrink-0" />
        </motion.div>

        <div className="lg:w-1/2 p-12 flex flex-col justify-center">
          <motion.h2 className="text-3xl font-bold text-center mb-6 text-gray-800" variants={formVariants} custom={0}>
            Sign up
          </motion.h2>

          <div className="flex justify-center space-x-4 mb-4">
            <motion.button className="p-2 bg-gray-100 rounded-full" variants={formVariants} custom={1}>
              <FaFacebook className="w-6 h-6 text-blue-600" />
            </motion.button>
            <motion.button className="p-2 bg-gray-100 rounded-full" variants={formVariants} custom={2}>
              <img src={google} alt="Google Icon" className="w-6 h-6" />
            </motion.button>
            <motion.button className="p-2 bg-gray-100 rounded-full" variants={formVariants} custom={3}>
              <FaApple className="w-6 h-6 text-black" />
            </motion.button>
          </div>

          <p className="text-center text-gray-500 mb-6">or do via email</p>

          <motion.form variants={formVariants} custom={4} onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full hover:bg-blue-700 transition"
            >
              Sign up
            </button>
          </motion.form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Have an account?{' '}
            <button onClick={() => navigate('/login')} className="text-blue-500 hover:underline">
              Sign In
            </button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;

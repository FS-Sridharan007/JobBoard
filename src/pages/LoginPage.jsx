import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios'; // Import axios for making API calls
import bgImage from '../assets/image2.png';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Animation variants for the login container
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // Animation variants for form elements
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, delay: i * 0.1 },
    }),
  };

  // Animation variants for the right image
  const imageVariants = {
    hidden: { opacity: 0, x: 100 }, // Start off-screen to the right
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }, // Move to the normal position
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const loginData = { email, password };
  
    try {
      // Send the login request with the appropriate content type
      const response = await axios.post('http://localhost:3002/auth/login', loginData, {
        headers: {
          'Content-Type': 'application/json', // Make sure the backend knows it's JSON data
        },
      });
  
      // Check if the backend returned a token (login success)
      if (response.data.token) {
        alert('Login successful');
        // Store the token in localStorage or in state (if using Redux or context)
        localStorage.setItem('token', response.data.token);
        navigate('/'); // Redirect to home page
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (error) {
      console.error('Login failed:', error);
  
      // If there's an error response from the server
      if (error.response) {
        console.error('Error response:', error.response.data);
        setErrorMessage(error.response.data.message || 'An error occurred during login');
      } else {
        // If there's no response, maybe a network error
        setErrorMessage('An error occurred during login. Please check the console for more details.');
      }
    }
  };
   
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 to-gray-400">
      <motion.div
        className="flex flex-col lg:flex-row bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Left Section */}
        <div className="lg:w-1/2 p-8">
          <motion.h2 className="text-3xl font-bold text-gray-800 mb-6" variants={formVariants} custom={0}>Login</motion.h2>
          <motion.p className="text-gray-600 mb-6" variants={formVariants} custom={1}>Please enter your details</motion.p>
          <motion.form onSubmit={handleLogin} variants={formVariants} custom={2}>
            <motion.div className="mb-4" variants={formVariants} custom={3}>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="you@example.com"
              />
            </motion.div>
            <motion.div className="mb-4" variants={formVariants} custom={4}>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-1 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="********"
              />
            </motion.div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <input type="checkbox" id="remember" className="mr-2" />
                <label htmlFor="remember" className="text-sm text-gray-600">Remember for 30 days</label>
              </div>
              <button className="text-sm text-purple-600 hover:underline">Forgot password</button>
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-2 rounded-md hover:bg-purple-700 transition"
            >
              Sign in
            </button>
          </motion.form>

          {/* Display error message */}
          {errorMessage && (
            <motion.div
              className="mt-4 text-red-600 text-center"
              variants={formVariants}
              custom={5}
            >
              <p>{errorMessage}</p>
            </motion.div>
          )}

          <div className="mt-4 flex items-center justify-center text-sm text-gray-600">
            <span>Or</span>
          </div>
          <button
            className="mt-4 w-full border border-gray-300 rounded-md py-2 flex items-center justify-center hover:bg-gray-50"
          >
            <img src="https://img.icons8.com/color/24/000000/google-logo.png" alt="Google icon" className="mr-2" />
            Sign in with Google
          </button>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <button onClick={() => navigate('/signup')} className="text-purple-600 hover:underline">
              Sign up
            </button>
          </p>

          {/* Separate Buttons for Employer and Candidate */}
          <div className="mt-6 space-y-4">
            <button
              onClick={() => navigate('/employer-dashboard')}
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Employer Dashboard
            </button>

            <button
              onClick={() => navigate('/candidate-dashboard')}
              className="w-full bg-green-600 text-white font-semibold py-2 rounded-md hover:bg-green-700 transition"
            >
              Candidate Dashboard
            </button>
          </div>
        </div>

        {/* Right Section with Image Animation */}
        <motion.div
          className="hidden lg:flex lg:w-1/2 bg-white items-center justify-center"
          initial="hidden"
          animate="visible"
          variants={imageVariants}
        >
          <div className="p-8">
            <img src={bgImage} alt="Illustration" className="w-full h-auto" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default LoginPage;

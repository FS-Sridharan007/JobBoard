import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch profile data from localStorage if it exists
    const savedProfile = JSON.parse(localStorage.getItem('profile'));
    if (savedProfile) {
      setProfile(savedProfile);
    } else {
      // Set initial profile data if none exists in localStorage
      setProfile({
        name: 'Sridharan S',
        email: 'sridharans592@gmail.com',
        phone: '8778409636',
        address: 'Coimbatore, TamilNadu, India',
      });
    }
  }, []);

  // Handle form submission (e.g., updating profile)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Save updated profile data to localStorage
    localStorage.setItem('profile', JSON.stringify(profile));
    console.log('Updated profile:', profile);
  };

  // Animation variants for the profile container
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
          <motion.h2 className="text-3xl font-bold text-gray-800 mb-6">Profile Page</motion.h2>
          <motion.p className="text-gray-600 mb-4">Update your personal information below.</motion.p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                required
                disabled
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                id="phone"
                type="text"
                value={profile.phone}
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                type="text"
                value={profile.address}
                onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
            >
              Update Profile
            </button>
          </form>

          <div className="mt-4">
            <button
              onClick={() => navigate('/')}
              className="w-full bg-gray-600 text-white font-semibold py-2 rounded-md hover:bg-gray-700 transition"
            >
              Back to Dashboard
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProfilePage;

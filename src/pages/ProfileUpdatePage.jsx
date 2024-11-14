import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';

const ProfileUpdatePage = () => {
    const [profile, setProfile] = useState({ name: '', email: '', phone: '', address: '' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchProfileData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/profile', {
            headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
          });
          setProfile(response.data.user);
        } catch (error) {
          console.error('Error fetching profile data:', error);
          alert('Failed to fetch profile data');
        }
      };
      fetchProfileData();
    }, []);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      try {
        await axios.put('http://localhost:8080/api/profile', profile, {
          headers: { Authorization: `Bearer ${localStorage.getItem('jwtToken')}` },
        });
        alert('Profile updated successfully');
        navigate('/dashboard');
      } catch (error) {
        console.error('Error updating profile:', error);
        alert('Failed to update profile');
      } finally {
        setLoading(false);
      }
    };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile({ ...profile, [name]: value });
    };
  
  // Animation variants for the profile update container
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
          <motion.h2 className="text-3xl font-bold text-gray-800 mb-6">Update Profile</motion.h2>
          <motion.p className="text-gray-600 mb-4">Update your personal information below.</motion.p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
              <input
                id="name"
                name="name"
                type="text"
                value={profile.name}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={profile.email}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                id="phone"
                name="phone"
                type="text"
                value={profile.phone}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                required
              />
            </div>

            <div>
              <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
              <input
                id="address"
                name="address"
                type="text"
                value={profile.address}
                onChange={handleChange}
                className="w-full border-gray-300 rounded-md p-2 mt-1"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
              disabled={loading}
            >
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </form>

          <div className="mt-4">
            <button
              onClick={() => navigate('/dashboard')}
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

export default ProfileUpdatePage;

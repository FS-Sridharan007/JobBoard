import React, { useState } from 'react';
import { motion } from 'framer-motion';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: null
  });

  const [showEmailPopup, setShowEmailPopup] = useState(false); // State for controlling email popup

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic client-side validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setFormStatus({ submitted: false, error: "All fields are required." });
      return;
    }

    // Simulate form submission
    setTimeout(() => {
      setFormStatus({ submitted: true, error: null });
      setShowEmailPopup(true); // Show email popup on successful submission
    }, 1000);
  };

  const handleClosePopup = () => {
    setShowEmailPopup(false);
  };

  // Animation variants
  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const popupVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 }
  };

  return (
    <section className="min-h-screen bg-blue-50 flex items-center justify-center py-12 px-4">
      <div className="bg-white shadow-lg rounded-lg p-8 md:p-16 max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center text-blue-800 mb-8">Contact Us</h2>
        {formStatus.submitted ? (
          <motion.p 
            className="text-center text-green-600 font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Thank you for reaching out! We will get back to you soon.
          </motion.p>
        ) : (
          <motion.form onSubmit={handleSubmit} initial="hidden" animate="visible" variants={formVariants} transition={{ staggerChildren: 0.1 }}>
            <motion.div className="mb-4" variants={formVariants}>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Your name"
                required
              />
            </motion.div>
            <motion.div className="mb-4" variants={formVariants}>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Your email"
                required
              />
            </motion.div>
            <motion.div className="mb-4" variants={formVariants}>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="subject">Subject</label>
              <input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Subject"
                required
              />
            </motion.div>
            <motion.div className="mb-6" variants={formVariants}>
              <label className="block text-gray-700 font-semibold mb-2" htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                placeholder="Your message"
                rows="4"
                required
              />
            </motion.div>
            {formStatus.error && <motion.p className="text-red-600 mb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>{formStatus.error}</motion.p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
            >
              Submit
            </button>
          </motion.form>
        )}
        {/* Display contact email */}
        <div className="mt-6 text-center">
          <p className="text-gray-700">For any inquiries, you can reach us at:</p>
          <button 
            onClick={() => setShowEmailPopup(true)}
            className="text-blue-600 underline"
          >
            contact@yourwebsite.com
          </button>
        </div>
      </div>

      {/* Email Popup */}
      {showEmailPopup && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center" 
          initial="hidden" 
          animate="visible" 
          variants={popupVariants} 
          transition={{ duration: 0.5 }}
        >
          <div className="bg-white rounded-lg p-6 w-80 text-center">
            <h3 className="text-lg font-bold mb-4">Email Sent Successfully!</h3>
            <p>Your message has been sent. We will contact you shortly.</p>
            <button
              onClick={handleClosePopup}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}

export default ContactPage;

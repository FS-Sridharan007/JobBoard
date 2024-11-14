const mongoose = require('mongoose');

// Create a custom email validator
const emailValidator = {
  validator: function (v) {
    return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
  },
  message: 'Please provide a valid email address.',
};

const userSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, // To automatically convert emails to lowercase
    validate: emailValidator, // Custom email validation
  },
  password: { 
    type: String, 
    required: true 
  },
  applicantRecipient: { 
    type: String, 
    default: null // Optional field, default null
  },
});

module.exports = mongoose.model('User', userSchema);

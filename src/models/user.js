const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;

const mongoose = require('mongoose'); // Import Mongoose

// Define the schema for the User collection
const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, // This field is mandatory
  },

  age: { 
    type: Number,
    required: true, // This field is mandatory
  },

  email: { 
    type: String, 
    required: true, // This field is mandatory
  },

  username: { 
    type: String, 
    required: true, // This field is mandatory
    unique: true, // Ensures no two users have the same username
  },

  password: { 
    type: String, 
    required: true, // This field is mandatory
  },
});

// This is the "users" collection in MongoDB
const User = mongoose.model('User', userSchema);


module.exports = User;
// Export the User model so it can be used elsewhere
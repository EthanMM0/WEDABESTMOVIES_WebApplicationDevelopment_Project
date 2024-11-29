const express = require('express'); 
const User = require('./User'); 
const router = express.Router(); 

// Signup route
router.post('/signup', async (req, res) => {
  // Extract user data from the request body
  const { name, age, email, username, password } = req.body;

  if (!name || !age || !email || !username || !password) {
    return res.status(400).json({ message: 'Please fill out all fields!' });
  }

  try {
    // Check if a user already exists with the same username 
    const query = { username: username.toLowerCase() }; // Convert username to lowercase 
    const existingUser = await User.findOne(query).collation({ locale: 'en', strength: 2 });

    // If the username is already taken, return an error
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Create a new user document 
    const newUser = new User({
      name,
      age,
      email,
      username: username.toLowerCase(), // Store username in lowercase
      password, // Store password
    });

    // Save the new user to the DB
    await newUser.save();

    // Respond with success msg
    res.status(201).json({ message: 'Account created successfully!' });
  } catch (err) {
    // Log and handle server errors
    console.error('Error creating account:', err);
    res.status(500).json({ message: 'Error creating account' });
  }
});

// Signin route
router.post('/signin', async (req, res) => {
  // Extract login credentials from the request body
  const { username, password } = req.body;

  try {
    // Find a user by username
    const user = await User.findOne({ username: username.toLowerCase() }); // Ensure case-insensitive search

    // If no user is found, return an error 
    if (!user) {
      return res.status(400).json({ message: 'Username not found' });
    }

    // Compare the provided password with the stored password
    if (user.password !== password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }

    // Respond with success msg and user data 
    res.status(200).json({ message: 'Signin successful', user });
  } catch (err) {
    // Log and handle server errors
    console.error('Error signing in:', err);
    res.status(500).json({ message: 'Error signing in' });
  }
});

module.exports = router; 

// Export the router for use elsewhere

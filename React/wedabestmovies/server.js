// Load environment variables from the custom 'database.env' file
require('dotenv').config({ path: './database.env' });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow React frontend on localhost:3000
  methods: 'GET,POST', // Specify allowed methods
  allowedHeaders: 'Content-Type', // Specify allowed headers
};

// Middleware
app.use(cors(corsOptions)); // Apply CORS middleware
app.use(bodyParser.json()); // Parse JSON requests

// Log to ensure MONGO_URI is loaded correctly
console.log('MongoDB URI:', process.env.MONGO_URI);

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err.message)); // Log the error message

// Import Routes (only for backend API)
const authRoutes = require('./src/components/authRoutes');
app.use('/api', authRoutes);

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

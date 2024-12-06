// server.js
require('dotenv').config({ path: './database.env' });

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const CheckoutOrder = require('./src/components/Checkout.js');

const app = express();
const port = 5000;

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:3000', // Allow React frontend on localhost:3000
  methods: 'GET,POST,DELETE', // Specify allowed methods (added DELETE)
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

// Define routes for checkout
const checkoutRoutes = require('./src/components/checkoutRoutes'); 
app.use('/api', checkoutRoutes); // Mount the checkout routes

// Define routes for authentication
const authRoutes = require('./src/components/authRoutes');
app.use('/api', authRoutes); // Mount authentication routes

// Start Server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

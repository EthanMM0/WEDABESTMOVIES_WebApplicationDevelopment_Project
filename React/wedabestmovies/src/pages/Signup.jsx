import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/Signup.css';

// Signup component
const Signup = () => {
  // State to hold form data
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    username: '',
    password: '',
  });

  // navigate to different routes
  const navigate = useNavigate();

  // Handles input changes and updates the form data in state
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value }); // Update the specific field in formData
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior (page reload)
    const { name, age, email, username, password } = formData;

    // Validate required fields
    if (!name || !age || !email || !username || !password) {
      alert('Please fill out all fields!'); 
      return; 
    }

    // Validate age (must be a positive number)
    if (isNaN(age) || age <= 0) {
      alert('Please enter a valid age!'); 
      return; 
    }

    try {
      // Send a POST request to the backend API for signup
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', //content type as JSON
        },
        body: JSON.stringify({ name, age, email, username, password }), // Convert form data to JSON and include in requests body
      });

      // Handle the response
      if (response.ok) {
        alert(`Account created for ${name}! You can sign in.`); // success msg
        navigate('/signin'); // Redirect to signin page
      } else {
        const errorData = await response.json(); // Parse error response
        alert(errorData.message || 'Something went wrong!'); // Display error msg
      }
    } catch (error) {
      // Catch and display any errors that occur during the request
      alert('Error creating account. Please try again later.');
    }
  };

  // Render the signup form
  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        {/* Input field for name */}
        <input
          type="text"
          name="name" 
          placeholder="Enter your name" 
          value={formData.name} 
          onChange={handleChange} // Update state on change
          className="name-input-up"
        />

        {/* Input field for age */}
        <input
          type="text"
          name="age" 
          placeholder="Enter your age" 
          value={formData.age} 
          onChange={handleChange} // Update state on change
          className="age-input-up"
        />

        {/* Input field for email */}
        <input
          type="email"
          name="email" 
          placeholder="Enter your email" 
          value={formData.email} 
          onChange={handleChange} // Update state on change
          className="mail-input-up"
        />

        {/* Input field for username */}
        <input
          type="text"
          name="username" 
          placeholder="Enter a username" 
          value={formData.username} 
          onChange={handleChange} // Update state on change
          className="username-input-up"
        />

        {/* Input field for password */}
        <input
          type="password"
          name="password" 
          placeholder="Enter a password" 
          value={formData.password} 
          onChange={handleChange} // Update state on change
          className="password-input-up"
        />

        {/* Submit button */}
        <button type="submit" className="signup-button" >Sign Up</button>
      </form>
    </div>
  );
};

export default Signup; // Export the Signup component so it can be used elsewhere

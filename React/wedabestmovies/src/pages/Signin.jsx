import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Signin component
const Signin = () => {
  // State to manage form data
  const [formData, setFormData] = useState({
    username: '', 
    password: '', 
  });

  // useNavigate hook for programmatic navigation
  const navigate = useNavigate();

  // Function to handle input changes and update state
  const handleChange = (e) => {
    const { name, value } = e.target; 
    setFormData({ ...formData, [name]: value }); // Update the specific field in formData
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the default form submission (page reload)
    const { username, password } = formData; 

    try {
      // Make a POST request to the signin API endpoint
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json', // Specify that the request body is in JSON format
        },
        body: JSON.stringify({ username, password }), // Convert form data to JSON and send it
      });

      // If the response is successful 
      if (response.ok) {
        const data = await response.json(); // Parse the response JSON
        alert(data.message); // Display a success msg
        navigate('/'); // Redirect the user to the landing page
      } else {
        // If the response is not successful 
        const errorData = await response.json(); // Parse the error response
        alert(errorData.message || 'Something went wrong!'); // Display the error msg
      }
    } catch (error) {
      // Handle any network / server errors
      alert('Error signing in. Please try again later.');
    }
  };

  // Render the signin form
  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        {/* Input field for username */}
        <input
          type="text"
          name="username" 
          placeholder="Enter your username" 
          value={formData.username} 
          onChange={handleChange} // Update state when input changes
        />

        {/* Input field for password */}
        <input
          type="password"
          name="password" 
          placeholder="Enter your password" 
          value={formData.password} 
          onChange={handleChange} // Update state when input changes
        />

        {/* Submit button */}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signin; // Export the component for use elsewhere

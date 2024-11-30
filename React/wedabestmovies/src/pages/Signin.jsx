import '../components/Signin.css';

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';


const Signin = () => {
  const { signIn } = useContext(AuthContext); // Access signIn function
  const [formData, setFormData] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, password } = formData;

    try {
      const response = await fetch('http://localhost:5000/api/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        signIn(data.user); // Store user in context
        navigate('/'); // Redirect to landing page
      } else {
        const errorData = await response.json();
        alert(errorData.message || 'Something went wrong!');
      }
    } catch (error) {
      alert('Error signing in. Please try again later.');
    }
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={formData.username}
          onChange={handleChange}
          className="username-input-in"
        />
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData.password}
          onChange={handleChange}
          className="password-input-in"
        />
        <button type="submit" className="signin-button">Sign In</button>
      </form>
    </div>
  );
};

export default Signin;

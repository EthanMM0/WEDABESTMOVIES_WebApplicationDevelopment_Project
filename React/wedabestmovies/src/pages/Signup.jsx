import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    username: '',
    password: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { name, age, email, username, password } = formData;

    if (!name || !age || !email || !username || !password) {
      alert('Please fill out all fields!'); //makes sure users type all fields
      return;
    }

    if (isNaN(age) || age <= 0) {
      alert('Please enter a valid age!');
      return;
    }

    // Save user data to localStorage to use in signin
    const userData = { name, age, email, username, password };
    localStorage.setItem('user', JSON.stringify(userData));

    alert(`Account created for ${name}! You can sign in.`);
    console.log('Signup Data:', userData);

    // Navigates to Signin page
    navigate('/signin');
  };

  return (
    <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          type="text"
          name="age"
          placeholder="Enter your age"
          value={formData.age}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="username"
          placeholder="Enter a username"
          value={formData.username}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Enter a password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;

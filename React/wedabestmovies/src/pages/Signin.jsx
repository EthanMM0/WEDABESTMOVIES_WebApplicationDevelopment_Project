import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App';

const Signin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { signIn } = useContext(AuthContext); // Access signIn 
  const navigate = useNavigate();

  // Retrieve user data from localStorage
  const storedUserData = JSON.parse(localStorage.getItem('user'));

  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if username exists
    if (!storedUserData || storedUserData.username !== username) {
      setError('Username not found.');
      return;
    }

    // Check if password matches the username
    if (storedUserData.password !== password) {
      setError('Incorrect password.');
      return;
    }

    // Clear error if login is successful
    setError('');
    signIn(username); // Updates user context
    navigate('/profile'); // Redirects to Profile
  };

  return (
    <div>
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error if any */}
        <button type="submit">Sign In</button>
      </form>
      <button onClick={() => navigate('/signup')}>Don't have an account? Sign Up</button>
    </div>
  );
};

export default Signin;

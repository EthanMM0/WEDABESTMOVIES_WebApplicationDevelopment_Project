<<<<<<< HEAD
import React, { useState, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Landing from './pages/Landing';
import Signin from './pages/Signin'; 
import Signup from './pages/Signup'; 
import Profile from './pages/Profile'; 
import { CartProvider } from './components/CartState';

// Create an Auth Context for managing user authentication state
export const AuthContext = createContext();

const App = () => {
  const [user, setUser] = useState(null); // Track authenticated user

  // Function to handle signing in (updates the user state)
  const signIn = (username) => setUser(username);

  // Function to handle signing out (basically clears the user state)
  const signOut = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={user ? <Profile /> : <Navigate to="/signin" />} //redirects if not authenticated
            />
          </Routes>
        </Router>
      </CartProvider>
    </AuthContext.Provider>
  );
};
export default App;

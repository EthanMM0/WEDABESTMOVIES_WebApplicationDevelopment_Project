import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import './Navbar.css';
import Logo from '../images/WDBM.png';

const Navbar = () => {
  const { user, signOut } = useContext(AuthContext);

  return (
    <nav className="navbar">
      {/* Navigation Links on the Left */}
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={signOut}>Signout</button>
          </>
        ) : (
          <>
            <Link to="/signin">Signin</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>

      {/* Centered Title */}
      <div className="title">WeDaBestMovies</div>

      <img src={Logo} className='nav-logo' alt="Logo" />
    </nav>
  );
};

export default Navbar;

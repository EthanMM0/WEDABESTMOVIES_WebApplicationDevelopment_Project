import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../App';
import './Navbar.css';
import Logo from '../images/WDBM.png';  // Logo Image
import CartImage from '../images/cart.png';  // Cart Image

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
            <Link onClick={signOut}>Signout</Link>
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

      {/* Checkout Cart Icon */}
      <div className="cart-icon">
        <Link to="/checkout">
          <img src={CartImage} alt="Cart" className="cart-image" />
        </Link>
      </div>

      {/* Logo */}
      <img src={Logo} className='nav-logo' alt="Logo" />
    </nav>
  );
};

export default Navbar;

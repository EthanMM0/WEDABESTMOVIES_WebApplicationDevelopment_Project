import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../App'; // Import AuthContext
import '../components/CheckoutPage.css';

const CheckoutPage = () => {
  const { user } = useContext(AuthContext); // Get user from AuthContext
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/signin'); // Redirect to sign-in page if no user is logged in
    }
  }, [user, navigate]);

  useEffect(() => {
    if (user) {
      const fetchCartItems = async () => {
        try {
          // Fetch cart items from the "checkouts" collection using the correct endpoint
          const response = await fetch(`http://localhost:5000/api/checkout/${user.username}`);
          const data = await response.json();

          console.log('API Response:', data); // Log the response to see its structure

          // Check that data is an array and ensure we can extract items
          if (Array.isArray(data) && data.length > 0) {
            setCartItems(data); // Assuming all cart items are in the response array
          } else {
            console.log('No items in cart or invalid data format');
            setCartItems([]); // Default to empty array if no items found or invalid data
          }
        } catch (error) {
          console.error('Error fetching cart items:', error);
          setCartItems([]); // Set to empty array in case of error
        }
      };

      fetchCartItems();
    }
  }, [user]);

  const handleDeleteItem = async (movieId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkout/${user.username}/${movieId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Update the cart items list after deletion
        setCartItems(cartItems.filter((item) => item.movieId !== movieId));
      } else {
        console.error('Failed to delete item');
      }
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleBuyItem = async (movieId, movieName) => {
    try {
      const response = await fetch(`http://localhost:5000/api/checkout/${user.username}/${movieId}`, {
        method: 'DELETE', // Delete the item from the cart after purchase
      });
      if (response.ok) {
        // Update the cart items list after successful purchase
        setCartItems(cartItems.filter((item) => item.movieId !== movieId));

        // Show the alert with the movie name
        alert(`Purchase Complete, Enjoy Watching ${movieName}`);
      } else {
        console.error('Failed to complete purchase');
      }
    } catch (error) {
      console.error('Error completing purchase:', error);
    }
  };

  return (
    <div className="checkout-container">
      <h2>Items in your cart:</h2>
      <div className="movie-list">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.movieId} className="cart-item">
              <img src={item.movieImage} alt={item.movieName} />
              <span>{item.movieName}</span>
              <span>Quantity: {item.quantity}</span>
              <div className="cart-item-actions">
                <button className="delete-btn" onClick={() => handleDeleteItem(item.movieId)}>
                  Delete
                </button>
                <button className="buy-btn" onClick={() => handleBuyItem(item.movieId, item.movieName)}>
                  Buy
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="empty-cart-message">Your cart is empty.</p>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;

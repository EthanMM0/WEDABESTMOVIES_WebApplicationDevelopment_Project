// components/checkoutRoutes.js
const express = require('express');
const router = express.Router();
const Checkout = require('../components/Checkout');

// POST route to add a movie to the cart
router.post('/checkout', async (req, res) => {
  try {
    const { username, movieName, movieImage, quantity } = req.body;

    // Get the last movie ID and increment it
    const lastMovie = await Checkout.findOne().sort({ movieId: -1 }).limit(1);
    const newMovieId = lastMovie ? lastMovie.movieId + 1 : 1;

    const newCheckoutItem = new Checkout({
      movieId: newMovieId,
      movieName,
      movieImage,
      username,
      quantity,
    });

    await newCheckoutItem.save();
    res.status(201).json({ message: 'Movie added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add movie to cart' });
  }
});

// Route to get all cart items for a user (based on username)
router.get('/checkout/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await Checkout.find({ username: userId });
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch cart items' });
  }
});

// DELETE route to remove an item from the cart (based on movieId and username)
router.delete('/checkout/:userId/:movieId', async (req, res) => {
  try {
    const { userId, movieId } = req.params;
    const result = await Checkout.deleteOne({ username: userId, movieId: movieId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

module.exports = router;

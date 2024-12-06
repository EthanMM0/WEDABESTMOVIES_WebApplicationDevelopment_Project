// components/Checkout.js
const mongoose = require('mongoose');

const checkoutSchema = new mongoose.Schema({
  movieId: { type: Number, required: true, unique: true },
  movieName: { type: String, required: true },
  movieImage: { type: String, required: true },
  username: { type: String, required: true },
  quantity: { type: Number, default: 1 },
});

const Checkout = mongoose.model('Checkout', checkoutSchema);
module.exports = Checkout;

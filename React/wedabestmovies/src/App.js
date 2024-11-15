import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing'; 
import Checkout from './pages/Checkout'; 
import { CartProvider } from './components/CartState';

const App = () => (
  <CartProvider> 
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
    </Router>
  </CartProvider>
);

export default App;

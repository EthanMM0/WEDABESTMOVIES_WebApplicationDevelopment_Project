import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
<<<<<<< HEAD
import Landing from './pages/Landing'; 
import Checkout from './pages/Checkout'; 
=======
import Landing from './pages/Landing';
>>>>>>> 5ba026714407cf1ff662944b671eb785cf9d1665
import { CartProvider } from './components/CartState';

const App = () => (
  <CartProvider> 
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
<<<<<<< HEAD
        <Route path="/checkout" element={<Checkout />} />
=======
>>>>>>> 5ba026714407cf1ff662944b671eb785cf9d1665
      </Routes>
    </Router>
  </CartProvider>
);

export default App;

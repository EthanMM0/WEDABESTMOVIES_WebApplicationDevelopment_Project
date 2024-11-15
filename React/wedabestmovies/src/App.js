import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Landing from './pages/Landing';
import { CartProvider } from './components/CartState';

const App = () => (
  <CartProvider> 
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </Router>
  </CartProvider>
);

export default App;

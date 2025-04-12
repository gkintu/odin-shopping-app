// src/App.jsx
import React, { useState, useEffect } from 'react'; // Import useState and useEffect
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
import Navbar from './components/Navbar'; // Import Navbar
import './App.css'; // Import global styles (optional)

function App() {
  // State for cart items: Array of { product: {...}, quantity: number }
  const [cartItems, setCartItems] = useState([]);

  // Calculate total number of items in the cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // Function to add items to the cart (will be passed down)
  const handleAddToCart = (productToAdd, quantity) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.product.id === productToAdd.id);
      if (existingItem) {
        // If item exists, update its quantity
        return prevItems.map(item =>
          item.product.id === productToAdd.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        // If item doesn't exist, add it to the cart
        return [...prevItems, { product: productToAdd, quantity: quantity }];
      }
    });
    console.log("Added to cart:", productToAdd, "Quantity:", quantity); // For debugging
  };


  return (
    <Router>
      {/* Pass cartItemCount to Navbar */}
      <Navbar cartItemCount={cartItemCount} />
      <div className="page-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          {/* Pass handleAddToCart to ShopPage */}
          <Route
             path="/shop"
             element={<ShopPage onAddToCart={handleAddToCart} />}
           />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
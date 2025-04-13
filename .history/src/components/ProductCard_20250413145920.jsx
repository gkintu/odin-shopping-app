// src/components/ProductCard.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css'; 

function ProductCard({ product, onAddToCart }) {
  const [quantity, setQuantity] = useState(1); // Local state for quantity input

  const handleQuantityChange = (event) => {
    const newValue = event.target.value;
    if (newValue === '') {
      setQuantity(1);
      return;
    }
    // Convert to number and validate
    const value = Number(newValue);
    if (!isNaN(value) && value >= 1) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(prevQuantity => Math.max(1, prevQuantity - 1)); // Ensure quantity doesn't go below 1
  };

  const handleAddToCartClick = () => {
    if (quantity > 0) {
      onAddToCart(product, quantity); // Call the function passed from App (via ShopPage)
    }
  };

  return (
    <div className="product-card">
      <img src={product.image} alt={product.title} className="product-image" />
      <h3 className="product-title">{product.title}</h3>
      <p className="product-price">${product.price.toFixed(2)}</p>
      <div className="product-quantity">
        <button onClick={handleDecrement}>-</button>
        <input
          type="number"
          value={quantity}
          onChange={handleQuantityChange}
          min="1" // HTML5 validation, but React state controls it
        />
        <button onClick={handleIncrement}>+</button>
      </div>
      <button className="add-to-cart-btn" onClick={handleAddToCartClick}>
        Add To Cart
      </button>
    </div>
  );
}

// Prop validation for ProductCard
ProductCard.propTypes = {
  product: PropTypes.shape({ // Expect 'product' to be an object
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    // Add other properties from the API if you use them
  }).isRequired,
  onAddToCart: PropTypes.func.isRequired, // Expect 'onAddToCart' to be a required function
};

export default ProductCard;
// src/pages/ShopPage.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../components/ProductCard'; // Import ProductCard
import './ShopPage.css'; // We'll create this CSS file

function ShopPage({ onAddToCart }) { // Receive onAddToCart prop
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from FakeStoreAPI
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        setError(null); // Reset error state
        const response = await fetch('https://fakestoreapi.com/products');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (e) {
        console.error("Failed to fetch products:", e);
        setError("Failed to load products. Please try again later.");
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
      }
    };

    fetchProducts();
  }, []); // Empty dependency array means this runs once on mount

  return (
    <div className="shop-page">
      <h1>Shop</h1>
      {loading && <p>Loading products...</p>}
      {error && <p className="error-message">{error}</p>}
      {!loading && !error && (
        <div className="product-list">
          {products.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart} // Pass the handler down
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Prop validation for ShopPage
ShopPage.propTypes = {
  onAddToCart: PropTypes.func.isRequired,
};

export default ShopPage;
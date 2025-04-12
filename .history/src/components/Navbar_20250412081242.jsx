import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes
import './Navbar.css'; // We'll create this CSS file next

function Navbar({ cartItemCount }) { // Receive cartItemCount as a prop
  return (
    <nav className="navbar">
      <Link to="/" className="nav-logo">MyStore</Link>
      <ul className="nav-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/shop">Shop</Link>
        </li>
      </ul>
      <div className="nav-cart">
        <span>Cart ({cartItemCount})</span>
        {/* We can add a checkout button/link here later if needed */}
        {/* <button>Checkout</button> */}
      </div>
    </nav>
  );
}

// Define prop types for Navbar
Navbar.propTypes = {
  cartItemCount: PropTypes.number.isRequired, // Expect cartItemCount to be a required number
};

// Default props (optional but good practice)
Navbar.propTypes = {
  cartItemCount: 0,
};


export default Navbar;
// src/App.jsx
import React from 'react'; // We'll add state later
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShopPage from './pages/ShopPage';
// We will import Navbar here later

function App() {
  // Cart state will be managed here later

  return (
    <Router>
      {/* Navbar will go here, above the Routes */}
      <div className="page-content"> {/* Optional wrapper for styling */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          {/* Add more routes here if needed */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
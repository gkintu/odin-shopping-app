// src/__tests__/App.test.jsx
import React from 'react';
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App'; // Import the main App component

// Mock the fetch function globally using jest
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve([ // Mock response data
        { id: 1, title: 'Product 1', price: 10, image: 'img1.jpg' },
        { id: 2, title: 'Product 2', price: 20, image: 'img2.jpg' },
    ]),
  })
);

// Clear mocks after each test
beforeEach(() => {
  fetch.mockClear();
});

describe('App Component Integration', () => {
  it('renders homepage by default and navigates to shop page', async () => {
    const user = userEvent.setup();
    render(<App />);

    // Check if HomePage content is rendered initially
    expect(screen.getByRole('heading', { name: /welcome to our store/i })).toBeInTheDocument();
    expect(screen.getByText(/cart \(0\)/i)).toBeInTheDocument(); // Initial cart count

    // Find the "Shop" link in the Navbar
    const shopLink = screen.getByRole('link', { name: /shop/i });
    await user.click(shopLink);

    // After navigation, check if ShopPage content is rendered (wait for fetch)
    // Use findByRole which waits for element to appear
    expect(await screen.findByRole('heading', { name: /shop/i })).toBeInTheDocument();

    // Check if fetch was called for products
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products');

    // Wait for products to be rendered (check for a specific product title)
    expect(await screen.findByRole('heading', { name: /product 1/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /product 2/i })).toBeInTheDocument();
  });

  it('adds item to cart and updates cart count in navbar', async () => {
     const user = userEvent.setup();
     render(<App />);

     // Navigate to shop page
     const shopLink = screen.getByRole('link', { name: /shop/i });
     await user.click(shopLink);

     // Wait for products to load and find the "Add To Cart" button for the first product
     const addToCartButton1 = await screen.findByRole('button', { name: /add to cart/i, });
     // We might need a more specific selector if multiple buttons exist
     // Let's assume the first 'Add to Cart' corresponds to 'Product 1'
     // We can refine this by finding the button within the specific product card if needed

     // Find the quantity controls for the first product card more reliably
     const product1Card = await screen.findByText(/Product 1/i); // Find an element within the card
     const cardContainer = product1Card.closest('.product-card'); // Find the parent card container
     const incrementButton1 = within(cardContainer).getByRole('button', { name: '+' });
     const addToCartButtonSpecific = within(cardContainer).getByRole('button', { name: /add to cart/i });

     // Increment quantity to 2 for Product 1
     await user.click(incrementButton1); // Quantity now 2

     // Click the specific "Add To Cart" button for Product 1
     await user.click(addToCartButtonSpecific);

     // Check if cart count in Navbar updated (should be 2)
     // Use findByText to wait for the update if needed
     expect(await screen.findByText(/cart \(2\)/i)).toBeInTheDocument();

     // (Optional) Navigate back home and check cart count persists
     const homeLink = screen.getByRole('link', { name: /home/i });
     await user.click(homeLink);
     expect(screen.getByRole('heading', { name: /welcome/i })).toBeInTheDocument();
     expect(screen.getByText(/cart \(2\)/i)).toBeInTheDocument(); // Count should persist
   });
});
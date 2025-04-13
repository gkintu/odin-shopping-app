// src/components/__tests__/ProductCard.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'; // For simulating user interactions
import ProductCard from '../ProductCard';

// Mock product data for testing
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 9.99,
  image: 'test-image.jpg',
  description: 'A test product description', // Add if needed by component
  category: 'test' // Add if needed
};

describe('ProductCard', () => {
  it('renders product details correctly', () => {
    const mockAddToCart = jest.fn(); // Mock function
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    expect(screen.getByRole('heading', { name: mockProduct.title })).toBeInTheDocument();
    expect(screen.getByText(`$${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: mockProduct.title })).toHaveAttribute('src', mockProduct.image);
    expect(screen.getByRole('spinbutton')).toHaveValue(1); // Default quantity
    expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
  });

  it('increments and decrements quantity', async () => {
    const user = userEvent.setup();
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    const incrementButton = screen.getByRole('button', { name: '+' });
    const decrementButton = screen.getByRole('button', { name: '-' });
    const quantityInput = screen.getByRole('spinbutton');

    await user.click(incrementButton);
    expect(quantityInput).toHaveValue(2);
    await user.click(incrementButton);
    expect(quantityInput).toHaveValue(3);
    await user.click(decrementButton);
    expect(quantityInput).toHaveValue(2);
  });

   it('does not decrement below 1', async () => {
    const user = userEvent.setup();
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    const decrementButton = screen.getByRole('button', { name: '-' });
    const quantityInput = screen.getByRole('spinbutton');

    expect(quantityInput).toHaveValue(1); // Starts at 1
    await user.click(decrementButton);
    expect(quantityInput).toHaveValue(1); // Stays at 1
  });

  it('calls onAddToCart with correct product and quantity when button is clicked', async () => {
    const user = userEvent.setup();
    const mockAddToCart = jest.fn(); // Create a Jest mock function
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    const incrementButton = screen.getByRole('button', { name: '+' });
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });

    // Increment quantity to 3
    await user.click(incrementButton);
    await user.click(incrementButton); // Quantity is now 3

    await user.click(addToCartButton);

    // Expect mockAddToCart to have been called once
    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    // Expect it to have been called with the mock product and quantity 3
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });

  it('updates quantity via input field', async () => {
    const user = userEvent.setup();
    const mockAddToCart = jest.fn();
    render(<ProductCard product={mockProduct} onAddToCart={mockAddToCart} />);

    const quantityInput = screen.getByRole('spinbutton');

    await user.clear(quantityInput);
    await user.type(quantityInput, '5');
    // Wait for React to process the state update
    await screen.findByDisplayValue('5');
    expect(quantityInput).toHaveValue(5);

    // Test invalid input resets to 1 (or minimum allowed)
    await user.clear(quantityInput);
    await user.type(quantityInput, 'abc');
    await screen.findByDisplayValue('1');
    expect(quantityInput).toHaveValue(1);

    await user.clear(quantityInput);
    await user.type(quantityInput, '-2');
    await screen.findByDisplayValue('1');
    expect(quantityInput).toHaveValue(1);
  });
});
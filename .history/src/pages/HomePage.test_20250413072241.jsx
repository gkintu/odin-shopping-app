// src/pages/__tests__/HomePage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

describe('HomePage', () => {
  it('renders welcome message', () => {
    render(<HomePage />);
    // Use screen queries to find elements a user would see
    expect(screen.getByRole('heading', { name: /welcome to our store/i })).toBeInTheDocument();
    expect(screen.getByText(/browse our amazing collection/i)).toBeInTheDocument();
  });
});
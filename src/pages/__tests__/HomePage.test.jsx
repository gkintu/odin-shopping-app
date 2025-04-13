// src/pages/__tests__/HomePage.test.jsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from '../HomePage';

describe('HomePage', () => {
  test('renders welcome message', () => {
    render(<HomePage />);
    expect(screen.getByText(/welcome to our store!/i)).toBeInTheDocument();
    expect(screen.getByText(/browse our amazing collection/i)).toBeInTheDocument();
  });
});
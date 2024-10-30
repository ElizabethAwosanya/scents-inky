import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import Home from './Home';
import axios from 'axios';
import { act } from 'react-dom/test-utils';

// Mock Axios
jest.mock('axios');

describe('Home Component', () => {
  const mockProducts = [
    { id: 1, name: 'Product 1', description: 'Test product', price: 10, quantity: 5, image: null },
    { id: 2, name: 'Product 2', description: 'Another product', price: 20, quantity: 2, image: 'product2.jpg' }
  ];

  beforeEach(() => {
    // Mock axios to resolve immediately with test data
    axios.get.mockResolvedValue({ data: mockProducts });
  });

  it('renders featured products', async () => {
    await act(async () => {
      render(<Home />);
    });

    // Wait for products to be displayed
    await waitFor(() => {
      expect(screen.getByText('Product 1')).toBeInTheDocument();
      expect(screen.getByText('Product 2')).toBeInTheDocument();
    });
  });

  it('shows a placeholder image if product image is missing', async () => {
    await act(async () => {
      render(<Home />);
    });

    // Check for images
    const images = screen.getAllByRole('img');
    expect(images[0]).toHaveAttribute('src', '/placeholder.svg'); // First product has no image
    expect(images[1]).toHaveAttribute('src', `${process.env.REACT_APP_UPLOADS_URL}/product2.jpg`); // Second product has an image
  });
});

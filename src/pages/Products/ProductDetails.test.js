import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ProductDetails from './ProductDetails';

jest.mock('axios');

describe('ProductDetails Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product',
    price: 50.0,
    quantity: 5,
    image_url: '/path/to/image.jpg'
  };

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockProduct });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays product details', async () => {
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
      expect(screen.getByText(mockProduct.description)).toBeInTheDocument();
      expect(screen.getByText(`Price: £${mockProduct.price.toFixed(2)}`)).toBeInTheDocument();
      expect(screen.getByText(`Quantity: ${mockProduct.quantity}`)).toBeInTheDocument();
    });

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', mockProduct.image_url);
    expect(image).toHaveAttribute('alt', mockProduct.name);
  });

  it('navigates to edit page when Edit button is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products/:id/edit" element={<div>Edit Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(mockProduct.name)).toBeInTheDocument());

    fireEvent.click(screen.getByText(/edit product/i));
    expect(screen.getByText(/edit page/i)).toBeInTheDocument();
  });

  it('deletes product and navigates to products list when Delete button is clicked', async () => {
    axios.delete.mockResolvedValueOnce({});

    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/products" element={<div>Products List</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(mockProduct.name)).toBeInTheDocument());

    fireEvent.click(screen.getByText(/delete product/i));
    await waitFor(() => expect(screen.getByText(/products list/i)).toBeInTheDocument());
  });

  it('displays an error message if product fetch fails', async () => {
    axios.get.mockRejectedValueOnce(new Error('Fetch error'));

    render(
      <MemoryRouter initialEntries={['/products/1']}>
        <Routes>
          <Route path="/products/:id" element={<ProductDetails />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText(/failed to load product details/i)).toBeInTheDocument());
  });
});

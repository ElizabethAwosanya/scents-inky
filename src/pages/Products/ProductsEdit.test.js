import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ProductEdit from './ProductEdit';

// Mock axios
jest.mock('axios');

describe('ProductEdit Component', () => {
  const mockProduct = {
    id: 1,
    name: 'Test Product',
    description: 'This is a test product',
    price: 50.0,
    quantity: 5,
    image_url: '/path/to/image.jpg',
  };

  beforeEach(() => {
    axios.get.mockResolvedValueOnce({ data: mockProduct });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays product data', async () => {
    render(
      <MemoryRouter initialEntries={['/products/1/edit']}>
        <Routes>
          <Route path="/products/:id/edit" element={<ProductEdit />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue(mockProduct.name)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockProduct.description)).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockProduct.price.toString())).toBeInTheDocument();
      expect(screen.getByDisplayValue(mockProduct.quantity.toString())).toBeInTheDocument();
    });
  });

  it('updates form fields correctly', async () => {
    render(
      <MemoryRouter initialEntries={['/products/1/edit']}>
        <Routes>
          <Route path="/products/:id/edit" element={<ProductEdit />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByDisplayValue(mockProduct.name)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Updated Product' } });
    fireEvent.change(screen.getByLabelText(/description/i), { target: { value: 'Updated description' } });
    fireEvent.change(screen.getByLabelText(/price/i), { target: { value: '75' } });
    fireEvent.change(screen.getByLabelText(/quantity/i), { target: { value: '10' } });

    expect(screen.getByDisplayValue('Updated Product')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Updated description')).toBeInTheDocument();
    expect(screen.getByDisplayValue('75')).toBeInTheDocument();
    expect(screen.getByDisplayValue('10')).toBeInTheDocument();
  });

  it('uploads a new image file', async () => {
    render(
      <MemoryRouter initialEntries={['/products/1/edit']}>
        <Routes>
          <Route path="/products/:id/edit" element={<ProductEdit />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByDisplayValue(mockProduct.name)).toBeInTheDocument());

    const file = new File(['image content'], 'image.png', { type: 'image/png' });
    const fileInput = screen.getByLabelText(/replace image/i);

    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files[0]).toBe(file);
    expect(fileInput.files).toHaveLength(1);
  });

  it('submits updated product data', async () => {
    axios.post.mockResolvedValueOnce({});
    render(
      <MemoryRouter initialEntries={['/products/1/edit']}>
        <Routes>
          <Route path="/products/:id/edit" element={<ProductEdit />} />
          <Route path="/products/:id" element={<div>Product Details Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByDisplayValue(mockProduct.name)).toBeInTheDocument());

    fireEvent.change(screen.getByLabelText(/name/i), { target: { value: 'Updated Product' } });
    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(screen.getByText(/product details page/i)).toBeInTheDocument();
    });
  });

  it('displays error message if form submission fails', async () => {
    const error = new Error('Update failed');
    jest.spyOn(console, 'error').mockImplementation(() => {}); // Mock console.error
    axios.post.mockRejectedValueOnce(error);

    render(
      <MemoryRouter initialEntries={['/products/1/edit']}>
        <Routes>
          <Route path="/products/:id/edit" element={<ProductEdit />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByDisplayValue(mockProduct.name)).toBeInTheDocument());

    fireEvent.click(screen.getByText(/save/i));

    await waitFor(() => {
      expect(console.error).toHaveBeenCalledWith("Error updating product:", error);
    });

    console.error.mockRestore(); // Restore console.error after test
  });
});

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import ProductsList from './ProductsList';

// Mock axios
jest.mock('axios');

describe('ProductsList Component', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Product A',
      description: 'Description for Product A',
      price: 10.0,
      quantity: 5,
      image_url: '/path/to/imageA.jpg',
    },
    {
      id: 2,
      name: 'Product B',
      description: 'Description for Product B',
      price: 20.0,
      quantity: 10,
      image_url: '/path/to/imageB.jpg',
    },
  ];

  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockProducts });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and displays a list of products', async () => {
    render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>
    );

    // Wait for products to load and check they are displayed
    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.getByText('Product B')).toBeInTheDocument();
    });

    expect(screen.getByText(/Description for Product A/i)).toBeInTheDocument();
    expect(screen.getByText(/Description for Product B/i)).toBeInTheDocument();
  });

  it('filters the product list based on search input', async () => {
    render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Product A')).toBeInTheDocument());

    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: 'Product A' } });

    await waitFor(() => {
      expect(screen.getByText('Product A')).toBeInTheDocument();
      expect(screen.queryByText('Product B')).not.toBeInTheDocument();
    });
  });

  it('adds a new product when the "Add Product" button is clicked', async () => {
    const newProduct = {
      id: 3,
      name: 'Product C',
      description: 'Description for Product C',
      price: 15.0,
      quantity: 7,
      image: null,
    };

    axios.post.mockResolvedValueOnce({ data: newProduct });

    render(
      <MemoryRouter>
        <ProductsList />
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Product A')).toBeInTheDocument());

    fireEvent.change(screen.getByPlaceholderText('Product Name'), { target: { value: newProduct.name } });
    fireEvent.change(screen.getByPlaceholderText('Product Description'), { target: { value: newProduct.description } });
    fireEvent.change(screen.getByPlaceholderText('Price'), { target: { value: newProduct.price } });
    fireEvent.change(screen.getByPlaceholderText('Quantity'), { target: { value: newProduct.quantity } });

    fireEvent.click(screen.getByText(/add product/i));

    // Wait for the new product to be added to the list
    await waitFor(() => {
      expect(screen.getByText(newProduct.name)).toBeInTheDocument();
    });
  });

  it('navigates to product detail page when "View Details" is clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/products']}>
        <Routes>
          <Route path="/products" element={<ProductsList />} />
          <Route path="/products/:id" element={<div>Product Details Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => expect(screen.getByText('Product A')).toBeInTheDocument());

    // Click the "View Details" button for the first product
    fireEvent.click(screen.getAllByText(/view details/i)[0]);

    // Check if navigated to Product Details Page
    expect(screen.getByText(/product details page/i)).toBeInTheDocument();
  });
});
